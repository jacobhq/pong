import json
import os

import neat
import requests

from main import test_ai
from pong.types import JoinRes

API_URL = "https://pong.jhqcat.com/ingest"
GAME_ID = "mdkuvz"
INGEST_URL = f"{API_URL}/{GAME_ID}"
DISPLAY_NAME = "Showcase April 19th 2024"

local_dir = os.path.dirname(__file__)
config_path = os.path.join(local_dir, "config.txt")

payload = json.dumps({
    "displayName": DISPLAY_NAME
})
headers = {
    'Content-Type': 'application/json'
}
response = requests.request("POST", f"{INGEST_URL}/join", headers=headers, data=payload)
print(response.text)
player: JoinRes = json.loads(response.text)
model_url = player['modelUrl']
model_res = requests.get(model_url, allow_redirects=True)
if response.status_code == 200:
    # Specify the local file path where you want to save the downloaded file
    local_file_path = f"{player['gameId']}.pickle"  # Example: 'downloaded_model.zip'

    # Save the content of the response to a file
    with open(local_file_path, 'wb') as f:
        f.write(model_res.content)

    print(f"Model downloaded successfully: {local_file_path}")
else:
    print(f"Failed to download model. Status code: {model_res.status_code}")

config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction, neat.DefaultSpeciesSet, neat.DefaultStagnation,
                     config_path)
test_ai(config, INGEST_URL, GAME_ID)
