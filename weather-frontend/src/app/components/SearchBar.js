import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center space-x-4 p-4 bg-white rounded-full shadow-lg max-w-lg mx-auto border border-gray-200 focus-within:border-blue-500 transition-all duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-600 dark:focus-within:border-blue-300">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className="w-full px-6 py-3 text-lg text-gray-700 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full transition-all duration-200 ease-in-out dark:text-gray-300 dark:placeholder-gray-500 dark:focus:ring-blue-300"
      />
      <button
        type="submit"
        className="absolute right-4 text-blue-500 text-xl transition-transform transform hover:scale-110 focus:outline-none dark:text-blue-300"
      >
        🔍
      </button>
    </form>
  );
}
