import requests

API_KEY = "d9a79ba257464f4aa4090041252801"

async def fetch_weather(city: str):
    url = f"https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=6MZ6NZSDnVUVcVqrtQ9FAYcvfREiqG6W"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None
