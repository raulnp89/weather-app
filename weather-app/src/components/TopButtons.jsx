import React from "react";

export default function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Porto",
    },
    {
      id: 3,
      title: "Málaga",
    },
    {
      id: 4,
      title: "New York",
    },
    {
      id: 5,
      title: "Tokyo",
    },
  ];

  return (
    <div className='flex items-center justify-around my-6'>
      {cities.map((city) => (
        <button
          key={city.id}
          className='text-white text-lg font-medium'
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}
