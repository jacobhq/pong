import pygame

pygame.init()

WIDTH, HEIGHT = 1000, 600
wn = pygame.display.set_mode((WIDTH, HEIGHT))
run = True

while run:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            run = False