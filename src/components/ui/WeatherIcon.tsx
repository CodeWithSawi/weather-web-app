import React from "react";

type Props = {
  URL: string;
};

export default function WeatherIcon({ URL }: Props) {
  return (
    <img
      className="size-8"
      src={`https://openweathermap.org/payload/api/media/file/${URL}.png`}
      alt="weather icon"
    />
  );
}
