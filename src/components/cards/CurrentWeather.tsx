import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../ui/WeatherIcon";

// type Props = {};

export default function CurrentWeather() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });
  return (
    <Card
      childrenClassName="flex flex-col items-center gap-6"
      title="Current Weather"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl text-center font-semibold">
          {Math.round(data.current.temp)}°F
        </h2>
        <WeatherIcon className="size-16" URL={data.current.weather[0].icon} />
        <h3 className="capitalize text-xl">
          {data.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center flex-col gap-2">
          <p className="text-gray-500">Feels like</p>
          <p>{Math.round(data.current.feels_like)}°F</p>
        </div>
        <div className="flex items-center flex-col gap-2">
          <p className="text-gray-500">Humidity</p>
          <p>{Math.round(data.current.humidity)}%</p>
        </div>
        <div className="flex items-center flex-col gap-2">
          <p className="text-gray-500">Wind</p>
          <p>{Math.round(data.current.wind_speed)}mph</p>
        </div>
      </div>
      {/* {JSON.stringify(data?.current).slice(0, 100)} */}
    </Card>
  );
}
