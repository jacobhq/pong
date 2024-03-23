import os

import neat

from main import test_ai

local_dir = os.path.dirname(__file__)
config_path = os.path.join(local_dir, "config.txt")

config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction, neat.DefaultSpeciesSet, neat.DefaultStagnation,
                     config_path)
test_ai(config)
