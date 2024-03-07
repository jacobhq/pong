# https://neat-python.readthedocs.io/en/latest/xor_example.html
from pong import Game
import pygame
import neat
import os
import time
import pickle

WIDTH, HEIGHT = 700, 500
window = pygame.display.set_mode((WIDTH, HEIGHT))

game = Game(window, WIDTH, HEIGHT)

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
        game.move_paddle(left=True, up=True)
    if keys[pygame.K_s]:
        game.move_paddle(left=True, up=False)
    
    game_info = game.loop()
    print(game_info.left_score, game_info.right_score)
    game.draw(False, True)
    pygame.display.update()
    
pygame.quit()