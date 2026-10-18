import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";
import { useEffect } from "react";

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
  mapType: string;
};

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export default function Map({ mapType, coords, onMapClick }: Props) {
  const { lat, lon } = coords;

  return (
    <div className="relative z-0 w-full h-125">
      <MapContainer
        center={[lat, lon]}
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        <MapController coords={coords} onMapClick={onMapClick} />
        <MapTilerBaseLayer />
        <TileLayer
          key={mapType}
          url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`}
          opacity={0.4}
        />
        <Marker position={[lat, lon]} />
      </MapContainer>
    </div>
  );
}

type MapControllerProps = {
  onMapClick: (lat: number, lon: number) => void;
  coords: { lat: number; lon: number };
};

function MapController({ onMapClick, coords }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([coords.lat, coords.lon], map.getZoom(), { animate: true });
  }, [coords, map]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });

  return null;
}

function MapTilerBaseLayer() {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: MAPTILER_API_KEY,
      style: "basic-dark",
    });

    mtLayer.addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map]);

  return null;
}
