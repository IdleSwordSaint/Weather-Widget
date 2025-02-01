"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import SearchBar from "./components/SearchBar";   // Use relative path here
import WeatherCard from "./components/WeatherCard"; // Use relative path here

export default function Page() {
  const [weather, setWeather] = useState({
    city: "San Francisco",
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    pressure: 1012,
  });
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchWeather = async (city) => {
    try {
      // Fetch location (latitude & longitude)
      const locationRes = await fetch(`http://127.0.0.1:8000/weather-app/locations/${city}`);
      if (!locationRes.ok) throw new Error("City not found");
      const locationData = await locationRes.json();
      
      // Fetch weather using the returned city name
      const weatherRes = await fetch(`http://127.0.0.1:8000/weather-app/get-weather/${locationData.name}`);
      if (!weatherRes.ok) throw new Error("Weather data not found");
      const weatherData = await weatherRes.json();
  
      // Update state with required weather properties
      setWeather({
        city: locationData.name,
        temperature: weatherData.temperatureAvg,
        humidity: weatherData.humidityAvg,
        windSpeed: weatherData.windSpeedAvg,
        pressure: weatherData.pressureSurfaceLevelAvg,
      });
  
    } catch (error) {
      console.error(error.message);
      setWeather(null); // Clear previous data on error
    }
  };

  return (
    <>
      <header className="bg-black text-white py-6 flex justify-between items-center px-6 dark:bg-black">
        <h1 className="text-4xl font-bold font-pricedown">Weather App</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
        </button>
      </header>
      <main className="container mx-auto p-6 bg-gray-100 text-black min-h-screen dark:bg-black dark:text-white">
        <SearchBar onSearch={fetchWeather} />
        {weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <p className="text-center text-gray-400 mt-6 dark:text-gray-500">
            Search for a city to see the weather.
          </p>
        )}
      </main>
      <footer className="g-black text-white py-4 text-center dark:bg-black-100 dark:text-black">
        © 2025 Weather App
      </footer>
    </>
  );
}
