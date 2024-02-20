import { DateTime } from "luxon";
const API_KEY = "95769dbfa91b86e4fdfbab9c522da75b";
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
  if (!data.coord) {
    console.error("Data does not contain coord property");
    return {};
  }
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

const formatForecastWeather = (data) => {
  let { timezone, daily = [], hourly = [] } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  console.log("Daily forecast items:", daily);
  console.log("Hourly forecast items:", hourly);

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formatedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formatedCurrentWeather;

  if (!lat || !lon) {
    console.error("Lat or lon is undefined");
    return {};
  }
  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formatedCurrentWeather, ...formattedForecastWeather };
};
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd, LLL yyyy' | Local time: 'hh:mm a"
) => {
  if (typeof secs !== "number") {
    console.error("Secs is not a number");
    return;
  }

  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
