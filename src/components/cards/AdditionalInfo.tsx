import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import CloudinessIcon from "../../assets/icons/cloudiness.svg?react";
import UvIndexIcon from "../../assets/icons/uv-index.svg?react";
import WindDirectionIcon from "../../assets/icons/wind-direction.svg?react";
import PressureIcon from "../../assets/icons/pressure.svg?react";
import SunriseIcon from "../../assets/icons/sunrise.svg?react";
import SunsetIcon from "../../assets/icons/sunset.svg?react";
import Uparrow from "../../assets/icons/uparrow.svg?react";

import { getWeather } from "../../api";

const rows = [
  { label: "Cloudiness (%)", value: "clouds", Icon: CloudinessIcon },
  { label: "UV Index", value: "uvi", Icon: UvIndexIcon },
  { label: "Wind Direction", value: "wind_deg", Icon: WindDirectionIcon },
  { label: "Pressure (hPa)", value: "pressure", Icon: PressureIcon },
  { label: "Sunrise", value: "sunrise", Icon: SunriseIcon },
  { label: "Sunset", value: "sunset", Icon: SunsetIcon },
] as const;

type Row = (typeof rows)[number];

type Props = {
  value: Row["value"];
  number: number;
};

export default function AdditionalInfo() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });

  return (
    <Card
      childrenClassName="flex flex-col gap-8"
      title="Additional Weather Info"
    >
      {rows.map(({ label, value, Icon }) => (
        <div key={value} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-gray-500">{label}</span>
            {Icon && <Icon className="size-8 invert text-gray-500" />}
          </div>
          <FormatComponent
            value={value}
            number={data.current[value as keyof typeof data.current] as number}
          />
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: Props) {
  if (value === "sunrise" || value === "sunset") {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (value === "wind_deg")
    return (
      <Uparrow
        className="size-8 invert"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );
  return Math.round(number);
}
