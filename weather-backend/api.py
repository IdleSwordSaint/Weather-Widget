import requests

API_KEY = "6MZ6NZSDnVUVcVqrtQ9FAYcvfREiqG6W"

async def fetch_weather(lat: int, long: int):
    url = f"https://api.tomorrow.io/v4/weather/forecast?location={lat},{long}&apikey={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None
