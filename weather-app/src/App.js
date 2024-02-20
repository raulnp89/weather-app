import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Málaga" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "Your location";
      toast.info("Fetching weather for " + message);
      const data = await getFormattedWeatherData({ ...query, units }).then(
        (data) => {
          toast.success(
            `Succesfully fetched weather for ${data.name}, ${data.country}}`
          );
          setWeather(data);
        }
      );
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) {
      return "from-cyan-700 to-blue-700";
    } else {
      return "from-yellow-700 to-orange-700";
    }
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureDetails weather={weather} />
          {/* <Forecast title={"Hourly Forecast"} items={weather.hourly} />
          <Forecast title={"Daily Forecast"} items={weather.daily} /> */}
        </div>
      )}

      <ToastContainer autoClose={2000} theme='colored' newestOnTop={true} />
    </div>
  );
}

export default App;
