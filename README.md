# pong

Setup build deps[^1] (not necessary in current repo config):
```
sudo apt-get install swig3.0
sudo ln -s /usr/bin/swig3.0 /usr/bin/swig
```

```
pip install comet_ml moviepy
pip install tensorflow
pip install gymnasium[atari,accept-rom-license]
```

If using test, install this:
```
pip install gymnasium[classic-control]
```

[^1]: https://github.com/openai/gym/issues/3143#issuecomment-1560325924