import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

export default function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching your location");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Succesfully fetched your location");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({ lat, lon });
      });
    }
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type='text'
          placeholder='Search for a city'
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize'
        />
        <UilSearch
          size='30'
          className='text-white cursor-pointer transition ease-out hover:scale-125 '
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size='30'
          className='text-white cursor-pointer transition ease-out hover:scale-125 '
          onClick={handleLocationClick}
        />
      </div>
      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button
          name='metric'
          className='text-xl text-white font-light transition ease-out hover:scale-125'
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className='text-xl text-white mx1'>|</p>
        <button
          name='imperial'
          className='text-xl text-white font-light transition ease-out hover:scale-125'
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}
