import pygame

pygame.init()

# Font that is used to render the text
font20 = pygame.font.Font('freesansbold.ttf', 20)

# RGB values of standard colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)

# Basic parameters of the screen
WIDTH, HEIGHT = 900, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("[PROTOTYPE] Pong w/ deep learning - git:ml-agent")

clock = pygame.time.Clock() 
FPS = 30

# reset
# reward
# play(action) -> direction
# game_iteration
# is_collision


# Paddle class
class Paddle:
        # Take the initial position, dimensions, speed and color of the object
    def __init__(self, posx, posy, width, height, speed, color):
        self.posx = posx
        self.posy = posy
        self.width = width
        self.height = height
        self.speed = speed
        self.color = color
        # Rect that is used to control the position and collision of the object
        self.paddleRect = pygame.Rect(posx, posy, width, height)
        # Object that is blit on the screen
        self.paddle = pygame.draw.rect(screen, self.color, self.paddleRect)

    # Used to display the object on the screen
    def display(self):
        self.paddle = pygame.draw.rect(screen, self.color, self.paddleRect)

    def update(self, yFac):
        self.posy = self.posy + self.speed*yFac

        # Restricting the striker to be below the top surface of the screen
        if self.posy <= 0:
            self.posy = 0
        # Restricting the striker to be above the bottom surface of the screen
        elif self.posy + self.height >= HEIGHT:
            self.posy = HEIGHT-self.height

        # Updating the rect with the new values
        self.paddleRect = (self.posx, self.posy, self.width, self.height)

    def displayScore(self, text, score, x, y, color):
        text = font20.render(text+str(score), True, color)
        textRect = text.get_rect()
        textRect.center = (x, y)

        screen.blit(text, textRect)

    def getRect(self):
        return self.paddleRect


# Ball class
class Ball:
    def __init__(self, posx, posy, radius, speed, color):
        self.posx = posx
        self.posy = posy
        self.radius = radius
        self.speed = speed
        self.color = color
        self.xFac = 1
        self.yFac = -1
        self.ball = pygame.draw.circle(
            screen, self.color, (self.posx, self.posy), self.radius)
        self.firstTime = 1

    def display(self):
        self.ball = pygame.draw.circle(
            screen, self.color, (self.posx, self.posy), self.radius)

    def update(self):
        self.posx += self.speed*self.xFac
        self.posy += self.speed*self.yFac

        # If the ball hits the top or bottom surfaces, 
        # then the sign of yFac is changed and 
        # it results in a reflection
        if self.posy <= 0 or self.posy >= HEIGHT:
            self.yFac *= -1

        if self.posx <= 0 and self.firstTime:
            self.firstTime = 0
            return 1
        elif self.posx >= WIDTH and self.firstTime:
            self.firstTime = 0
            return -1
        else:
            return 0

    def reset(self):
        self.posx = WIDTH//2
        self.posy = HEIGHT//2
        self.xFac *= -1
        self.firstTime = 1

    # Used to reflect the ball along the X-axis
    def hit(self):
        self.xFac *= -1

    def getRect(self):
        return self.ball

class Game:
    def __init__(self):
        self.running = True
        self.player_left = Paddle(20, 0, 10, 100, 10, GREEN)
        self.player_right = Paddle(WIDTH-30, 0, 10, 100, 10, GREEN)
        self.ball = Ball(WIDTH//2, HEIGHT//2, 7, 7, WHITE)
        self.players = [self.player_left, self.player_right]
        self.player_left_score, self.player_right_score = 0, 0
        self.player_left_yfac, self.player_right_yfac = 0, 0

    def run(self):
        while self.running:
            screen.fill(BLACK)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_UP:
                        self.player_right_yfac = -1
                    if event.key == pygame.K_DOWN:
                        self.player_right_yfac = 1
                    if event.key == pygame.K_w:
                        self.player_left_yfac = -1
                    if event.key == pygame.K_s:
                        self.player_left_yfac = 1
                if event.type == pygame.KEYUP:
                    if event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                        self.player_right_yfac = 0
                    if event.key == pygame.K_w or event.key == pygame.K_s:
                        self.player_left_yfac = 0

            for p in self.players:
                if pygame.Rect.colliderect(self.ball.getRect(), p.getRect()):
                    self.ball.hit()

            self.player_left.update(self.player_left_yfac)
            self.player_right.update(self.player_right_yfac)
            point = self.ball.update()

            if point == -1:
                self.player_left_score += 1
            elif point == 1:
                self.player_right_score += 1

            if point: 
                self.ball.reset()

            self.player_left.display()
            self.player_right.display()
            self.ball.display()

            self.player_left.displayScore("human : ", 
                            self.player_left_score, 100, 20, WHITE)
            self.player_right.displayScore("DQN : ", 
                            self.player_right_score, WIDTH-100, 20, WHITE)

            pygame.display.update()
            clock.tick(FPS)

if __name__ == "__main__":
    game = Game()
    game.run()
    pygame.quit()