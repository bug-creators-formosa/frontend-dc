import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

type MarkerType = {
  marker_id: string;
  coords: [number, number];
  name: string;
};

export default function MapPage() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const onMarkerAdd = () => {};
  const onMarkerDelete = () => {};
  const onMarkerUpdate = () => {};

  return (
    <main>
      <MapContainer
        center={[-24.6545, -59.5011]}
        zoom={8}
        className="h-[48rem]"
      >
        <LayersControl>
          <LayersControl.BaseLayer name="Mapa 2D" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Mapa Satelital">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://khms0.google.com/kh/v=979?x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <FeatureGroup key={markers.toString()}>
          <EditControl
            onCreated={onMarkerAdd}
            onEdited={onMarkerUpdate}
            onDeleted={onMarkerDelete}
            position={"bottomleft"}
            draw={{
              marker: true,
              circle: false,
              circlemarker: false,
              polygon: false,
              polyline: false,
              rectangle: false,
            }}
          />

          {markers.map((marker) => (
            <Marker position={marker.coords} key={marker.marker_id}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
        </FeatureGroup>
      </MapContainer>
    </main>
  );
}
