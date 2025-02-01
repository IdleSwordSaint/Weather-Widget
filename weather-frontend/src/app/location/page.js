"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaPlus, FaTrash, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function LocationPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [locations, setLocations] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch("https://weather-backend-sand.vercel.app/weather-app/locations/all");
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addLocation = async () => {
    try {
      const url = new URL("https://weather-backend-sand.vercel.app/weather-app/add-location");
      url.searchParams.append("city", newCity);
      url.searchParams.append("lat", parseFloat(lat));
      url.searchParams.append("long", parseFloat(long));
  
      const res = await fetch(url, {
        method: "POST", // still POST request, but query params in URL
      });
      
      if (!res.ok) throw new Error("Failed to add location");
      fetchLocations();
      setNewCity("");
      setLat("");
      setLong("");
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const removeLocation = async (city) => {
    try {
      const res = await fetch(`https://weather-backend-sand.vercel.app/weather-app/remove-location/${city}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove location");
      fetchLocations();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <header className="bg-black text-white py-6 flex justify-between items-center px-6 dark:bg-black">
        <h1 className="text-4xl font-bold">Saved Locations</h1>
        <div className="flex items-center">
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl mr-4">
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
          </button>
          <Link href="/" className="text-2xl">
            <FaHome className="text-blue-500" />
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-6 bg-gray-100 text-black min-h-screen dark:bg-black dark:text-white">
      <div className="mb-6">
  <input 
    type="text" 
    placeholder="Enter city" 
    value={newCity} 
    onChange={(e) => setNewCity(e.target.value)}
    className="p-2 border rounded mr-2 text-black" // Add text-black for visible text
  />
  <input 
    type="text" 
    placeholder="Lat" 
    value={lat} 
    onChange={(e) => setLat(e.target.value)}
    className="p-2 border rounded mr-2 text-black" // Add text-black for visible text
  />
  <input 
    type="text" 
    placeholder="Long" 
    value={long} 
    onChange={(e) => setLong(e.target.value)}
    className="p-2 border rounded mr-2 text-black" // Add text-black for visible text
  />
  <button onClick={addLocation} className="bg-blue-500 text-white px-4 py-2 rounded">
    <FaPlus />
  </button>
</div>

        <ul>
          {locations.map((loc, index) => (
            <li key={index} className="flex justify-between items-center p-4 border-b">
              <span>{loc.name} (Lat: {loc.latitude}, Long: {loc.longitude})</span>
              <button onClick={() => removeLocation(loc.name)} className="text-red-500">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bg-black text-white py-4 text-center dark:bg-black">
        © 2025 Weather App
      </footer>
    </>
  );
}
