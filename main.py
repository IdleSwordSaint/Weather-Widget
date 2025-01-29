from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import create_db_and_tables, add_favorite, get_favorites
from api import fetch_weather
import sqlite3

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_db_and_tables()

@app.get("/weather-app/weather")
async def get_weather(city: str):
    data = await fetch_weather(city)
    if not data:
        raise HTTPException(status_code=404, detail="City not found!")
    return data

@app.post("/weather-app/favorites")
async def save_favorite(city: str):
    add_favorite(city)
    return {"message": f"{city} saved to favorites"}

@app.get("/weather-app/favorites")
async def list_favorite():
    favorites = get_favorites()
    return favorites