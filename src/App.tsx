import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import Card from "./components/cards/Card";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";

function App() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });

  return (
    <div className="flex flex-col gap-8">
      <AdditionalInfo />
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
    </div>
  );
}

export default App;
