import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";

delete (
  L.Icon.Default.prototype as typeof L.Icon.Default.prototype & {
    _getIconUrl?: () => string;
  }
)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

export default function Map({ coords, onMapClick }: Props) {
  const { lat, lon } = coords;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "100%", height: "500px" }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

type MapClickProps = {
  onMapClick: (lat: number, lon: number) => void;
};

function MapClick({ onMapClick }: MapClickProps) {
  // useMapEvents safely binds and cleans up map events per render cycle
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      map.panTo([lat, lng]);
      onMapClick(lat, lng);
    },
  });

  return null;
}
