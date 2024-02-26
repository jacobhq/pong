import os
import gymnasium as gym
from comet_ml import Experiment
from comet_ml.integration.gymnasium import CometLogger

experiment = Experiment(
    api_key=os.environ["COMET_API_KEY"],
    project_name=os.environ["COMET_PROJECT"],
    workspace=os.environ["COMET_WORKSPACE"],
)

env = gym.make("ALE/Pong-v5", render_mode="rgb_array")
env = gym.wrappers.RecordVideo(env, "pong")
env = CometLogger(env, experiment)
