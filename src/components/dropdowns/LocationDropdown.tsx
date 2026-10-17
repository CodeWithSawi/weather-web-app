import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const cities = [
  "Freetown",
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Sydney",
  "Lagos",
  "Cairo",
  "Dubai",
  "Singapore",
  "São Paulo",
];

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select
      value={location}
      onValueChange={(value) => {
        if (value) {
          setLocation(value);
        }
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      {/* Set z-index higher than Leaflet's internal panes (400-700) */}
      <SelectContent className="z-1000">
        <SelectGroup>
          {cities.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
