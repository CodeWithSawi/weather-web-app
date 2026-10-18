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
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

const mapTypes = [
  "precipitation_new",
  "clouds_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select
      value={mapType}
      onValueChange={(value) => {
        if (value) {
          setMapType(value);
        }
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select layer" />
      </SelectTrigger>
      <SelectContent className="z-1000">
        <SelectGroup>
          {mapTypes.map((item) => (
            <SelectItem key={item} value={item} className="capitalize">
              {item.split("_")[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
