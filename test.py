import os
import gymnasium as gym
from comet_ml import Experiment
from comet_ml.integration.gymnasium import CometLogger

experiment = Experiment(
    api_key=os.environ["COMET_API_KEY"],
    project_name=os.environ["COMET_PROJECT"],
    workspace=os.environ["COMET_WORKSPACE"],
)

env = gym.make('Acrobot-v1', render_mode="rgb_array")
env = gym.wrappers.RecordVideo(env, 'test')
env = CometLogger(env, experiment)

for x in range(20):
    observation, info = env.reset()
    truncated = False
    terminated = False
    while not (truncated or terminated):
        observation, reward, terminated, truncated, info = env.step(env.action_space.sample())
        env.render()

env.close() #Uploads video folder 'test' to Comet
