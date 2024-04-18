# pong
Play pong against an AI trained with the NEAT algorithm.

## Setup and Play
1. Optionally set up a Conda env
```
conda create -n pong python=3.10
```
```
conda activate pong
```
2. Install dependencies
```
pip install pygame neat-python requests
```
3. To play against the AI, download the model from releases, and rename to `best.pickle`
4. Then run `play_ai.py`

## Training and Development
1. Run the `main.py` file

## Planning
![Whiteboard image of plan](https://raw.githubusercontent.com/jacobhq/pong/main/media/pong_wb_1.jpg)