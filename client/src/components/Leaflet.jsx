import React, { useState } from "react";
import "../../public/css/maps.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import customIconUrl from "../../public/images/descargar.png";

const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [38, 38],
});

const createClusterCustomIcon = (cluster) => {
  return new L.DivIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};

const InteractiveMap = () => {
  const [markers, setMarkers] = useState([]);

  // Custom hook to handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newMarker = {
          id: markers.length + 1,
          geocode: [e.latlng.lat, e.latlng.lng],
          popUp: `Nuevo Pozo ${markers.length + 1}`,
        };
        setMarkers([...markers, newMarker]);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[-26.185157, -58.175474]}
      zoom={12}
      style={{ height: "550px", width: "90%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
            <Popup>
              <input
                type="text"
                defaultValue={marker.popUp}
                onBlur={(e) => {
                  const updatedMarkers = markers.map((m) =>
                    m.id === marker.id ? { ...m, popUp: e.target.value } : m
                  );
                  setMarkers(updatedMarkers);
                }}
              />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default InteractiveMap;
