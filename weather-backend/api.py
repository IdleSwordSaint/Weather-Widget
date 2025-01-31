import requests
import os
from dotenv import load_dotenv
load_dotenv()

async def fetch_weather(lat: int, long: int):

    API_KEY = os.getenv("API_KEY")
    print(API_KEY)
    url = f"https://api.tomorrow.io/v4/weather/forecast?location={lat},{long}&apikey={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None
