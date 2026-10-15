import { weatherResponseSchema } from "./schema/weatherSchema";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  if (!API_KEY) console.error("Provide the weather API key");

  const URI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
  const res = await fetch(URI);

  if (!res.ok) {
    throw new Error(`Failed to fetch weather data: ${res.statusText}`);
  }

  const json = await res.json();

  const data = weatherResponseSchema.parse(json);

  return data;
}
