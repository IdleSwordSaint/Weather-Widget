from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import create_db_and_tables, get_db, Favorite, Location
from api import fetch_weather
from starlette.responses import JSONResponse

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
@app.get("/weather-app/locations/all")
async def fetch_all(db: Session = Depends(get_db)):
    cities = db.query(Location).all()
    return JSONResponse(status_code=200, content=[{"name": city.name, "latitude": city.latitude, "longitude": city.longitude} for city in cities])

@app.post("/weather-app/add-location")
async def add_location(city: str, lat: int, long: int, db: Session = Depends(get_db)):
    existing_location = db.query(Location).filter(Location.name == city).first()
    if existing_location:
        return JSONResponse(status_code=409, content={"message": f"{city} is already in locations"})
    
    new_location = Location(name=city, latitude=lat, longitude=long)
    db.add(new_location)
    db.commit()
    return JSONResponse(status_code=201, content={"message": f"{city} added to locations"})

@app.get("/weather-app/locations")
async def get_location(city: str, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.name == city).first()
    if not location:
        raise HTTPException(status_code=404, detail="City not found!")
    return JSONResponse(status_code=200, content={"name": location.name, "latitude": location.latitude, "longitude": location.longitude})

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
    return JSONResponse(status_code=200, content=data["timelines"]["daily"][0]["values"])

@app.put("/weather-app/update-location")
async def update_location(city: str, lat: int, long: int, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.name == city).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    location.latitude = lat
    location.longitude = long
    db.commit()
    return JSONResponse(status_code=200, content={"message": f"Location {city} updated successfully"})

@app.delete("/weather-app/remove-location/{city}")
async def remove_location(city: str, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.name == city).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    db.delete(location)
    db.commit()
    return JSONResponse(status_code=204, content={"message": ""})
