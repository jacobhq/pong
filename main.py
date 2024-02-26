import os
import gymnasium as gym
import numpy as np
from rl.core import Processor
from PIL import Image
import tensorflow as tf
from comet_ml import Experiment
from comet_ml.integration.gymnasium import CometLogger

# experiment = Experiment(
#     api_key=os.environ["COMET_API_KEY"],
#     project_name=os.environ["COMET_PROJECT"],
#     workspace=os.environ["COMET_WORKSPACE"],
# )

env = gym.make("ALE/Pong-v5")
# env = gym.wrappers.RecordVideo(env, "pong")
# env = CometLogger(env, experiment)

# number of possible actions (discrete)
actions = env.action_space.n

# abstraction - we want only the data we need - so no colors hence greyscale
# came to 84 empirically
IMG_SHAPE = (84, 84)
# number of steps ai looks at to predict on (so last 12 images of pong)
# pong is simple so 12 is fine
WINDOW_LENGTH = 12

# NN input shape (prereq understand perceptron, NNs)
input_shape = (WINDOW_LENGTH, IMG_SHAPE[0], IMG_SHAPE[1])

# convert number output from gym(nasium) to image for further processing (and back to array)
class ImageProcessor(Processor):
    def process_observation(self, observation):
        IMG_SHAPE = (84, 84)
        img = Image.fromarray(observation)
        img = img.resize(IMG_SHAPE)
        img = img.convert("L")
        img = np.array(img)
        return img.astype("uint8")
    
    def process_state_batch(self, batch):
        processed_batch = batch / 255.0
        return processed_batch
    
    def process_reward(self, reward):
        return np.clip(reward, -1.0, 1.0)

def build_model(input_shape, actions=6):
    model = tf.python.keras.models.Sequential()
    model.add(tf.keras.layers.Permute(2, 3, 1), input_shape)
    # strides are how the image is broken up as scanned
    # bigger strides = less reolution, but faster
    # Convolution = image proc, understnading - convolution is tricky
    model.add(tf.keras.layers.Convolution2D(32, (8, 8), strides=(4, 4), kernal_initializer="he_normal"))
    model.add(tf.keras.layers.Activation("relu"))
    # repeat
    model.add(tf.keras.layers.Convolution2D(64, (8, 8), strides=(2, 2), kernal_initializer="he_normal"))
    model.add(tf.keras.layers.Activation("relu"))
    # repeat
    model.add(tf.keras.layers.Convolution2D(64, (8, 8), strides=(1, 1), kernal_initializer="he_normal"))
    model.add(tf.keras.layers.Activation("relu"))
    # reduce dimensionality
    # Dense layers make decisions
    model.add(tf.keras.layers.Flatten())
    # 512 neurons
    model.add(tf.keras.layers.Dense(512))
    model.add(tf.keras.layers.Activation("relu"))
    # multiple layers = more complex relationships, better to have a big model and scale down ig
    model.add(tf.keras.layers.Dense(1024))
    model.add(tf.keras.layers.Activation("relu"))
    # output layer
    model.add(tf.keras.layers.Dense(actions))
    # Our action space is discrete - we can only do *one* thing
    # Ex we can't move up and down at same time!
    model.add(tf.keras.layers.Activatiob("linear"))

    return model

