import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "./api";

function App() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });

  return <>{JSON.stringify(data)}</>;
}

export default App;
