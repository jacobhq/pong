# pong

## Setup

Setup build deps[^1] (not necessary in current repo config):
```
sudo apt-get install swig3.0
sudo ln -s /usr/bin/swig3.0 /usr/bin/swig
```

```
pip install comet_ml moviepy tensorflow keras-rl gymnasium[atari,accept-rom-license]
```
(I had to use sudo)


If using test, install this:
```
pip install gymnasium[classic-control]
```

## Planning
![Whiteboard image of plan](https://raw.githubusercontent.com/jacobhq/pong/main/media/pong_wb_1.jpg)


[^1]: https://github.com/openai/gym/issues/3143#issuecomment-1560325924