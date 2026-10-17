import { weatherResponseSchema } from "./schema/weatherSchema";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
import { geocodeSchema } from "./schema/geocodeSchema";

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  if (!API_KEY) console.error("Provide the weather API key");

  const URI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(URI);

  if (!res.ok) {
    throw new Error(`Failed to fetch weather data: ${res.statusText}`);
  }

  const json = await res.json();

  const result = weatherResponseSchema.safeParse(json);
  if (!result.success) {
    console.error(
      "Zod Validation Error Details:",
      JSON.stringify(result.error.issues, null, 2),
    );
    throw result.error;
  }

  return result.data;
}

export async function getGeocode(location: string) {
  const URI = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
  const res = await fetch(URI);

  if (!res.ok) {
    throw new Error(`Failed to fetch weather data: ${res.statusText}`);
  }

  const json = await res.json();

  const result = geocodeSchema.safeParse(json);
  if (!result.success) {
    console.error(
      "Zod Validation Error Details:",
      JSON.stringify(result.error.issues, null, 2),
    );
    throw result.error;
  }

  return result.data;
}
