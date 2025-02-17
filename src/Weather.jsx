import { useState } from "react";
import axios from "axios";

function Weather() {
  const API_Key = "3bf28a218e96b2213da73f46eb6c2ad2";
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_Key}&units=metric`;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(city);
    setCity("");
  };

  const getData = () => {
    axios
      .get(url)
      .then((response) => {
        setCityData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert("Data not found!");
      });
  };

  return (
    <div className="flex-col justify-center text-center sm:w-1/2 mx-auto p-5">
      <p className="text-gray-400 mt-10 text-3xl font-bold font-mono border-b  pb-3">
        Simple Weather Application
      </p>
      <form action="/" onSubmit={submitHandler}>
        <div className="flex items-center mt-10 justify-center">
          {/* City name */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search your city..."
            className="w-98 px-5 py-2 border rounded-full"
          />
          {/* Search button */}
          <button
            onClick={getData}
            className="relative right-10 cursor-pointer hover:opacity-100 opacity-50"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
      {/* Weather information */}
      {cityData != undefined && (
        <div className="bg-gray-400 h-100 mt-10 rounded-2xl text-gray-700">
          <div className="flex justify-around mt-5">
            <p className="text-lg mt-5 font-medium">{cityData.name}</p>
            <p className="text-lg mt-5 font-medium">
              {new Date().toLocaleDateString("en-gb")}
            </p>
          </div>
          <div className="mt-10">
            <p className="text-9xl font-serif">
              {Math.trunc(cityData.main.temp)}&deg;
            </p>
            <p className="text-xl font-semibold">
              {Math.trunc(cityData.main.feels_like) >= 15 &&
              Math.trunc(cityData.main.feels_like) <= 20
                ? "Cloudy"
                : "Clear"}
            </p>
            <p className="text-xl font-semibold">
              Feels like {Math.trunc(cityData.main.feels_like)}&deg;
            </p>
            <p className="text-xl font-semibold">
              Humidity {cityData.main.humidity}%
            </p>
            <p className="text-xl font-semibold">Description - {cityData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
