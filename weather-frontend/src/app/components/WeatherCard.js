export default function WeatherCard({ weather }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl mt-6 grid grid-cols-2 gap-6 relative dark:bg-gray-800 dark:text-white">
        {/* Title Section */}
        <div className="col-span-2 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white font-pricedown">{weather.city}</h2>
          <p className="text-gray-500 text-lg dark:text-gray-300">{weather.description}</p>
        </div>
        
        {/* Temperature Section */}
        <div className="flex flex-col items-center bg-blue-100 p-4 rounded-xl shadow-md dark:bg-blue-900">
          <p className="text-gray-600 text-sm dark:text-gray-300">Temperature</p>
          <p className="text-blue-600 text-3xl font-semibold dark:text-blue-300">{weather.temperature}°C</p>
        </div>
        
        {/* Humidity Section */}
        <div className="flex flex-col items-center bg-green-100 p-4 rounded-xl shadow-md dark:bg-green-900">
          <p className="text-gray-600 text-sm dark:text-gray-300">Humidity</p>
          <p className="text-green-600 text-3xl font-semibold dark:text-green-300">{weather.humidity}%</p>
        </div>
  
        {/* Wind Speed Section */}
        <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-xl shadow-md dark:bg-yellow-900">
          <p className="text-gray-600 text-sm dark:text-gray-300">Wind Speed</p>
          <p className="text-yellow-600 text-3xl font-semibold dark:text-yellow-300">{weather.windSpeed} km/h</p>
        </div>
  
        {/* Pressure Section */}
        <div className="flex flex-col items-center bg-purple-100 p-4 rounded-xl shadow-md dark:bg-purple-900">
          <p className="text-gray-600 text-sm dark:text-gray-300">Pressure</p>
          <p className="text-purple-600 text-3xl font-semibold dark:text-purple-300">{weather.pressure} hPa</p>
        </div>
      </div>
    );
  }