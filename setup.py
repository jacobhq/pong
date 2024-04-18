import requests

DISPLAY_NAME="Py"
GAME_ID = "mdkuvz"

INGEST_URL = "https://congenial-tribble-xrggx999vxwhvp5g-3000.app.github.dev/ingest"

join = requests.post(f"{INGEST_URL}/{GAME_ID}/join", json={"displayName": DISPLAY_NAME})
res = join.json()
