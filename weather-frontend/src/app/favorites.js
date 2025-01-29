"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaHeart } from "react-icons/fa"; // Import FaHeart for the heart icon
import Link from "next/link"; // Import Link for navigation
import WeatherCard from "./components/WeatherCard"; // Assuming you have a WeatherCard component

export default function FavoritesPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [favorites, setFavorites] = useState([]); // Store the list of favorite cities
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Toggle dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Fetch favorite cities from the API
    const fetchFavorites = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/favorites'); // Replace with actual API endpoint
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const data = await res.json();
        setFavorites(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchFavorites();
  }, []);

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
          {/* Link to the Favorites page with the heart icon */}
          <Link href="/favorites">
            <button className="text-2xl">
              <FaHeart className="text-red-500" />
            </button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-6 bg-gray-100 text-black min-h-screen dark:bg-black dark:text-white">
        <h2 className="text-3xl font-bold mb-6">Your Favorite Cities</h2>
        {isLoading ? (
          <p className="text-center text-gray-400 dark:text-gray-500">Loading your favorites...</p>
        ) : (
          <div>
            {favorites.length === 0 ? (
              <p className="text-center text-gray-400 dark:text-gray-500">You have no favorite cities.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.map((city, index) => (
                  <WeatherCard key={index} weather={city} /> // Assuming the favorite city data structure is passed to WeatherCard
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="g-black text-black py-4 text-center dark:bg-black-100 dark:text-black">
        © 2025 Weather App
      </footer>
    </>
  );
}