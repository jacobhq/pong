# https://neat-python.readthedocs.io/en/latest/xor_example.html
from pong import Game
import pygame
import neat
import os
import time
import pickle

class PongGame:
    def __init__(self, window, width, height):
        self.game = Game(window, width, height)
        self.left_paddle = self.game.left_paddle
        self.right_paddle = self.game.right_paddle
        self.ball = self.game.ball
        
    def test_ai(self):
        run = True
        clock = pygame.time.Clock()
        while run:
            clock.tick(60)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    run = False
                    break
            
            # movement for human (left side only)
            keys = pygame.key.get_pressed()
            if keys[pygame.K_w]:
                self.game.move_paddle(left=True, up=True)
            if keys[pygame.K_s]:
                self.game.move_paddle(left=True, up=False)
            
            game_info = self.game.loop()
            print(game_info.left_score, game_info.right_score)
            self.game.draw(False, True)
            pygame.display.update()
    
pygame.quit()