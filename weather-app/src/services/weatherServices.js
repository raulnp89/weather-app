import fetch from "node-fetch";
import { URL, URLSearchParams } from "url"; // Add this import statement
const API_KEY = "a30c8f5da8ba6433638ddfc5d6c9d6f5";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {};
  }
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, humidity, temp_min, temp_max },
    name,
    dt,
    sys: { sunrise, sunset, country },
    weather,
    wind: { speed },
  } = data;
  const { main: details, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    sunrise,
    sunset,
    country,
    details,
    icon,
    speed,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formatedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);
  return formatedCurrentWeather;
};

export default getFormattedWeatherData;
