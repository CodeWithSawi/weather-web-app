import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
import type { MapType } from "../MapLegend";

type Props = {
  mapType: MapType;
  setMapType: Dispatch<SetStateAction<MapType>>;
};

const mapTypes: MapType[] = [
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
        const selectedMapType = mapTypes.find((item) => item === value);
        if (selectedMapType) {
          setMapType(selectedMapType);
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
