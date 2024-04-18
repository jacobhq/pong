import json
import random
import threading

import pygame
import requests

from .ball import Ball
from .paddle import Paddle
from .types import JoinRes

pygame.init()

DEBUG = False


def make_post_request(url, payload):
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for non-2xx status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"HTTP request failed: {e}")
        return None

# Function to handle the HTTP POST request in a separate thread
def handle_post_request(url, payload):
    result = make_post_request(url, payload)
    if result is not None:
        print("Received data:", result)
        # Process the received data as needed
    else:
        print("Failed to fetch data.")


class GameInformation:
    def __init__(self, left_hits, right_hits, left_score, right_score):
        self.left_hits = left_hits
        self.right_hits = right_hits
        self.left_score = left_score
        self.right_score = right_score


class Game:
    """
    To use this class simply initialize and instance and call the .loop() method
    inside of a pygame event loop (i.e while loop). Inside of your event loop
    you can call the .draw() and .move_paddle() methods according to your use case.
    Use the information returned from .loop() to determine when to end the game by calling
    .reset().
    """
    SCORE_FONT = pygame.font.SysFont("comicsans", 50)
    WHITE = (255, 255, 255)
    BLACK = (0, 0, 0)
    RED = (255, 0, 0)

    def __init__(self, window, window_width, window_height, ingest_url, server_data: JoinRes):
        self.window_width = window_width
        self.window_height = window_height

        self.left_paddle = Paddle(
            10, self.window_height // 2 - Paddle.HEIGHT // 2)
        self.right_paddle = Paddle(
            self.window_width - 10 - Paddle.WIDTH, self.window_height // 2 - Paddle.HEIGHT // 2)
        self.ball = Ball(self.window_width // 2, self.window_height // 2)

        self.left_score = 0
        self.right_score = 0
        self.left_hits = 0
        self.right_hits = 0
        self.window = window

        self.ingest_url = ingest_url
        self.server_data: JoinRes = server_data

    def _draw_score(self):
        left_score_text = self.SCORE_FONT.render(
            f"{self.left_score}", 1, self.WHITE)
        right_score_text = self.SCORE_FONT.render(
            f"{self.right_score}", 1, self.WHITE)
        self.window.blit(left_score_text, (self.window_width //
                                           4 - left_score_text.get_width() // 2, 20))
        self.window.blit(right_score_text, (self.window_width * (3 / 4) -
                                            right_score_text.get_width() // 2, 20))

    def _draw_hits(self):
        hits_text = self.SCORE_FONT.render(
            f"{self.left_hits + self.right_hits}", 1, self.RED)
        self.window.blit(hits_text, (self.window_width //
                                     2 - hits_text.get_width() // 2, 10))

    def _draw_divider(self):
        for i in range(10, self.window_height, self.window_height // 20):
            if i % 2 == 1:
                continue
            pygame.draw.rect(
                self.window, self.WHITE, (self.window_width // 2 - 5, i, 10, self.window_height // 20))

    def _handle_collision(self):
        ball = self.ball
        left_paddle = self.left_paddle
        right_paddle = self.right_paddle

        if ball.y + ball.RADIUS >= self.window_height:
            if DEBUG: print(f"[top] vel: {ball.y_vel},  pos: ({ball.x, ball.y})")
            ball.y = self.window_height - ball.RADIUS
            ball.y_vel = -abs(ball.y_vel)
            if DEBUG: print(f"[top]: INVERT: {ball.y_vel}, pos: ({ball.x, ball.y})")
        elif ball.y - ball.RADIUS <= 0:
            if DEBUG: print(f"[btm]: vel: {ball.y_vel}, pos: ({ball.x, ball.y})")
            ball.y = ball.RADIUS
            ball.y_vel = abs(ball.y_vel)
            if DEBUG: print(f"[btm]: INVERT: {ball.y_vel}, pos: ({ball.x, ball.y})")

        if ball.x_vel < 0:
            if ball.y >= left_paddle.y and ball.y <= left_paddle.y + Paddle.HEIGHT:
                if ball.x - ball.RADIUS <= left_paddle.x + Paddle.WIDTH:
                    ball.x_vel *= -1

                    middle_y = left_paddle.y + Paddle.HEIGHT / 2
                    difference_in_y = middle_y - ball.y
                    reduction_factor = (Paddle.HEIGHT / 2) / ball.MAX_VEL
                    y_vel = difference_in_y / reduction_factor
                    ball.y_vel = -1 * y_vel + random.uniform(-1, 1)
                    self.left_hits += 1


        else:
            if ball.y >= right_paddle.y and ball.y <= right_paddle.y + Paddle.HEIGHT:
                if ball.x + ball.RADIUS >= right_paddle.x:
                    ball.x_vel *= -1

                    middle_y = right_paddle.y + Paddle.HEIGHT / 2
                    difference_in_y = middle_y - ball.y
                    reduction_factor = (Paddle.HEIGHT / 2) / ball.MAX_VEL
                    y_vel = difference_in_y / reduction_factor
                    ball.y_vel = -1 * y_vel + random.uniform(-1, 1)
                    self.right_hits += 1

    def draw(self, draw_score=True, draw_hits=False):
        self.window.fill(self.BLACK)

        self._draw_divider()

        if draw_score:
            self._draw_score()

        if draw_hits:
            self._draw_hits()

        for paddle in [self.left_paddle, self.right_paddle]:
            paddle.draw(self.window)

        self.ball.draw(self.window)

    def move_paddle(self, left=True, up=True):
        """
        Move the left or right paddle.

        :returns: boolean indicating if paddle movement is valid. 
                  Movement is invalid if it causes paddle to go 
                  off the screen
        """
        if left:
            if up and self.left_paddle.y - Paddle.VEL < 0:
                return False
            if not up and self.left_paddle.y + Paddle.HEIGHT > self.window_height:
                return False
            self.left_paddle.move(up)
        else:
            if up and self.right_paddle.y - Paddle.VEL < 0:
                return False
            if not up and self.right_paddle.y + Paddle.HEIGHT > self.window_height:
                return False
            self.right_paddle.move(up)

        return True

    def loop(self):
        """
        Executes a single game loop.

        :returns: GameInformation instance stating score 
                  and hits of each paddle.
        """
        self.ball.move()
        self._handle_collision()

        if self.ball.x < 0:
            self.ball.reset()
            self.right_score += 1
            post_thread = threading.Thread(target=handle_post_request, args=(self.ingest_url, {
                "playerId": self.server_data["playerId"],
                "scorer": "model"
            }))
            post_thread.start()
        elif self.ball.x > self.window_width:
            self.ball.reset()
            self.left_score += 1
            post_thread = threading.Thread(target=handle_post_request, args=(self.ingest_url, {
                "playerId": self.server_data["playerId"],
                "scorer": "player"
            }))
            post_thread.start()

        game_info = GameInformation(
            self.left_hits, self.right_hits, self.left_score, self.right_score)

        return game_info

    def reset(self):
        """Resets the entire game."""
        self.ball.reset()
        self.left_paddle.reset()
        self.right_paddle.reset()
        self.left_score = 0
        self.right_score = 0
        self.left_hits = 0
        self.right_hits = 0
