import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";

function App() {
  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({ q: "London" });
    console.log(data);
  };
  fetchWeather();
  return (
    <div className='mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'>
      <TopButtons />
      <Inputs />

      <TimeAndLocation />
      <TemperatureDetails />
      <Forecast title={"Hourly Forecast"} />
      <Forecast title={"Daily Forecast"} />
    </div>
  );
}

export default App;
