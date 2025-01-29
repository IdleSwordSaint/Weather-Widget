"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaHeart } from "react-icons/fa"; // Import FaHeart for the heart icon
import Link from "next/link"; // Import Link for navigation
import SearchBar from "./components/SearchBar";   // Use relative path here
import WeatherCard from "./components/WeatherCard"; // Use relative path here

export default function Page() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Add state for tracking favorites

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/weather-app/weather?city=${city}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error(error.message);
      setWeather(null); // Clear previous data on error
    }
  };

  const saveFavorite = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/weather-app/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle favorite status
    if (!isFavorite) {
      saveFavorite();
    }
  };

  return (
    <>
      <header className="bg-black text-white py-6 flex justify-between items-center px-6 dark:bg-black">
        <h1 className="text-4xl font-bold font-pricedown">Weather App</h1>
        <div className="flex items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-2xl mr-4"
          >
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
          </button>
          {/* Link to the Favorites page */}
          <Link href="/favorites">
            <button className="text-2xl">
              <FaHeart
                className={`transition-colors duration-300 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              />
            </button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-6 bg-gray-100 text-black min-h-screen dark:bg-black dark:text-white">
        <SearchBar onSearch={fetchWeather} />
        {weather ? (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{city}</h2>
            <p>Temperature: {weather.temp_c} °C</p>
            <p>Wind: {weather.wind_kph} kph</p>
            <p>Pressure: {weather.pressure_mb} mb</p>
            <p>Humidity: {weather.humidity} %</p>
            <button onClick={toggleFavorite} className="text-red-500">
              ❤️ Save to Favorites
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6 dark:text-gray-500">
            Search for a city to see the weather.
          </p>
        )}
      </main>
      <footer className="g-black text-black py-4 text-center dark:bg-black-100 dark:text-black">
        © 2025 Weather App
      </footer>
    </>
  );
}
