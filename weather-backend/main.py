from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import create_db_and_tables, get_db, Favorite, Location
from api import fetch_weather

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_db_and_tables()

@app.get("/")
async def health_check():
    return "The health check is successful!"

# Example /weather-app/weather?city=New+York
@app.post("/weather-app/favorites")
async def save_favorite(city: str, db: Session = Depends(get_db)):
    existing_favorite = db.query(Favorite).filter(Favorite.city_name == city).first()
    if existing_favorite:
        return {"message": f"{city} is already in favorites"}
    
    new_favorite = Favorite(city_name=city)
    db.add(new_favorite)
    db.commit()
    return {"message": f"{city} saved to favorites"}

@app.post("/weather-app/add-location")
async def add_location(city: str, lat: int, long: int, db: Session = Depends(get_db)):
    existing_location = db.query(Location).filter(Location.name == city).first()
    if existing_location:
        return {"message": f"{city} is already in locations"}
    
    new_location = Location(name=city, latitude=lat, longitude=long)
    db.add(new_location)
    db.commit()
    return {"message": f"{city} saved to locations"}

@app.get("/weather-app/locations/{city}")
async def get_location(city: str, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.name == city).first()
    if not location:
        raise HTTPException(status_code=404, detail="City not found!")
    return {"name": location.name, "latitude": location.latitude, "longitude": location.longitude}

# Example /weather-app/weather?city=New+York
@app.get("/weather-app/get-weather/{city}")
async def get_weather(city: str, db: Session = Depends(get_db)):
    print(city)
    location = db.query(Location).filter(Location.name == city).first()
    if not location:
        raise HTTPException(status_code=404, detail="City not found!")
    data = await fetch_weather(location.latitude, location.longitude)
    if not data:
        print("Error fetching")
        raise HTTPException(status_code=404, detail="City not found!")
    return data["timelines"]["daily"][0]["values"]

@app.get("/weather-app/favorites")
async def list_favorite(db: Session = Depends(get_db)):
    favorites = db.query(Favorite.city_name).all()
    return [city[0] for city in favorites]
