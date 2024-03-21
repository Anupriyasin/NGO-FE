import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { orissaBoundary } from "./OrissaGeoJson";
import Requirements from "../../Pages/Requirements";

function App() {
  const position = [20.2376, 84.27];

  const geoJSONStyle = {
    color: "green",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.1,
  };

  return (
    <div className="App bg-transparent row d-flex justify-content-center">
      <h1 className="text-dark m-2">Requirements Map</h1>
      <MapContainer
        center={position}
        zoom={7}
        style={{ height: "550px", width: "75%", borderRadius: "20px",}}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={orissaBoundary} style={geoJSONStyle} />
        <Marker position={position}>
          <Popup>
            <div className="d-flex row">
              <h5 className="fw-bold">{"Hostel Name"}</h5>
              <span className="d-flex">
                <p><span className="fw-bold">Requirement:</span> {"Requirement name"}</p>
              </span>
              <span className="d-flex" style={{ marginTop: "-20px" }}>
                <p><span className="fw-bold">Quantity:</span> {"Total Quantity"}</p>
              </span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
