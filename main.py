# https://neat-python.readthedocs.io/en/latest/xor_example.html
import os
import pickle

import neat
import pygame

from pong import Game
from pong.types import JoinRes

DEBUG = False
WIDTH, HEIGHT = 700, 500
MAX_TRAINING_GENS = 50

class PongGame:
    def __init__(self, window, width, height, ingest_url, game_id, server_data: JoinRes):
        self.game = Game(window, width, height, ingest_url, server_data)
        self.left_paddle = self.game.left_paddle
        self.right_paddle = self.game.right_paddle
        self.ball = self.game.ball
        self.ingest_url = ingest_url
        self.game_id = game_id

    def test_ai(self, genome, config):
        net = neat.nn.FeedForwardNetwork.create(genome, config)

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
            if keys[pygame.K_w] or keys[pygame.K_UP]:
                self.game.move_paddle(left=True, up=True)
            if keys[pygame.K_s] or keys[pygame.K_DOWN]:
                self.game.move_paddle(left=True, up=False)

            output = net.activate((self.right_paddle.y, self.ball.y, abs(self.right_paddle.x - self.ball.x)))
            decision = output.index(max(output))
            if decision == 0:
                pass
            elif decision == 1:
                self.game.move_paddle(left=False, up=True)
            else:
                self.game.move_paddle(left=False, up=False)

            game_info = self.game.loop()
            if DEBUG: print(game_info.left_score, game_info.right_score)
            self.game.draw(True, False)
            pygame.display.update()

    def train_ai(self, genome1, genome2, config):
        net1 = neat.nn.FeedForwardNetwork.create(genome1, config)
        net2 = neat.nn.FeedForwardNetwork.create(genome2, config)

        # Define training variables
        inaction_penalty = 0.5
        game_timeout = 45000

        start_time = pygame.time.get_ticks()

        run = True
        # TODO: Increase speed of training
        # clock = pygame.time.Clock()
        while run:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    quit()

            output1 = net1.activate((self.left_paddle.y, self.ball.y, abs(self.left_paddle.x - self.ball.x)))
            decision1 = output1.index(max(output1))
            if decision1 == 0:
                genome1.fitness -= inaction_penalty
            elif decision1 == 1:
                self.game.move_paddle(left=True, up=True)
            else:
                self.game.move_paddle(left=True, up=False)

            output2 = net2.activate((self.right_paddle.y, self.ball.y, abs(self.right_paddle.x - self.ball.x)))
            decision2 = output2.index(max(output2))
            if decision2 == 0:
                genome2.fitness -= inaction_penalty
            elif decision2 == 1:
                self.game.move_paddle(left=False, up=True)
            else:
                self.game.move_paddle(left=False, up=False)

            game_info = self.game.loop()
            self.game.draw(True, True)
            pygame.display.update()

            if pygame.time.get_ticks() - start_time > game_timeout:
                self.calculate_fitness(genome1, genome2, game_info, True)
                break

            if game_info.left_score >= 5 or game_info.right_score >= 5:
                self.calculate_fitness(genome1, genome2, game_info)
                break

    def calculate_fitness(self, genome1, genome2, game_info, timeout=False):
        if DEBUG: print(
            f"timeout: {timeout}, genome1_left: {(game_info.left_hits + (game_info.left_score * 3) - (game_info.right_score * 3))}, genome2_right: {(game_info.right_hits + (game_info.right_score * 3) - (game_info.left_score * 3))}")
        genome1.fitness += (game_info.left_hits + (game_info.left_score * 3) - (game_info.right_score * 3))
        genome2.fitness += (game_info.right_hits + (game_info.right_score * 3) - (game_info.left_score * 3))


def eval_genomes(genomes, config):
    window = pygame.display.set_mode((WIDTH, HEIGHT))

    for i, (genome_id1, genome1) in enumerate(genomes):
        if i == len(genomes) - 1:
            break
        genome1.fitness = 0
        for genome_id2, genome2 in genomes[i + 1:]:
            genome2.fitness = 0 if genome2.fitness == None else genome2.fitness
            game = PongGame(window, WIDTH, HEIGHT)
            game.train_ai(genome1, genome2, config)


def run_neat(config):
    # restore from checkpoint
    p = neat.Checkpointer.restore_checkpoint("pop250_geforce_06042024_15")
    # p = neat.Population(config)
    p.add_reporter(neat.StdOutReporter(True))
    stats = neat.StatisticsReporter()
    p.add_reporter(stats)
    p.add_reporter(neat.Checkpointer(generation_interval=1, filename_prefix="big_pop_06042024_"))

    # pe = neat.ParallelEvaluator(multiprocessing.cpu_count(), eval_genomes)
    # winner = p.run(pe.evaluate, 500)
    winner = p.run(eval_genomes, 500)

    with open("best.pickle", "wb") as f:
        print("Writing new model to best.pickle")
        pickle.dump(winner, f)


def test_ai(config, ingest_url, game_id, server_data: JoinRes):
    with open(f"{game_id}.pickle", "rb") as f:
        winner = pickle.load(f)

    window = pygame.display.set_mode((WIDTH, HEIGHT))

    game = PongGame(window, WIDTH, HEIGHT, ingest_url, game_id, server_data)
    game.test_ai(winner, config)


if __name__ == "__main__":
    local_dir = os.path.dirname(__file__)
    config_path = os.path.join(local_dir, "config.txt")

    config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction, neat.DefaultSpeciesSet, neat.DefaultStagnation,
                         config_path)
    run_neat(config)
