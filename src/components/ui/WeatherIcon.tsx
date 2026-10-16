import { clsx } from "clsx";
import React from "react";

type Props = {
  URL: string;
  className?: string;
};

export default function WeatherIcon({ URL, className }: Props) {
  return (
    <img
      className={clsx("size-8", className)}
      src={`https://openweathermap.org/payload/api/media/file/${URL}.png`}
      alt="weather icon"
    />
  );
}
