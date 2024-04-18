from typing import TypedDict

# Define a TypedDict for the expected keys and value types
class JoinRes(TypedDict):
    gameId: str
    playerId: str
    modelUrl: str
