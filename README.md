# pong

Setup build deps[^1]:
```
sudo apt-get install swig3.0
sudo ln -s /usr/bin/swig3.0 /usr/bin/swig
```

```
pip install comet_ml moviepy
pip install gymnasium[classic-control]
pip install gymnasium[atari,accept-rom-license]
```

[^1]: https://github.com/openai/gym/issues/3143#issuecomment-1560325924