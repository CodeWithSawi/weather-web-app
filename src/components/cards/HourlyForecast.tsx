import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../ui/WeatherIcon";

// type Props = {};

export default function HourlyForecast() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });
  return (
    <Card
      childrenClassName="flex gap-6 overflow-x-scroll"
      title="Hourly Forecast (48 Hours)"
    >
      {/* {JSON.stringify(data?.hourly).slice(0, 100)} */}
      {data.hourly.map((hour) => (
        <div className="flex flex-col gap-2 item-center p-2" key={hour.dt}>
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon URL={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°F</p>
        </div>
      ))}
    </Card>
  );
}
