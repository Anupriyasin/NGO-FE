import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { orissaBoundary } from "./OrissaGeoJson";
import { getMapData } from "../../api/Users";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function App() {
  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
  };
  const position = [20.2376, 84.27];
  const [mapData, setMapData] = useState([]);

  const geoJSONStyle = {
    color: "green",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.1,
  };

  useEffect(() => {
    getMapData()
      .then((res) => {
        console.log(res.data[0].Requirement_Name);
        setMapData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App bg-transparent row d-flex justify-content-center">
      <h1 className="text-dark m-2">{t("Requirements Map")}</h1>
      <MapContainer
        center={position}
        zoom={7}
        style={{
          height: "550px",
          width: "75%",
          borderRadius: "20px",
          zIndex: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={orissaBoundary} style={geoJSONStyle} />
        {mapData.map((marker) => (
          marker.lat !== null || marker.longitude !== null
          ? <Marker position={[marker.lat, marker.longitude]}>
            <Popup>
              <div className="d-flex row">
                <h5 className="fw-bold">{marker.Hostel_Name}</h5>
                <span className="d-flex">
                  <p>
                    <span className="fw-bold">{t("Requirement")}:</span>{" "}
                    {marker.Requirement_Name}
                  </p>
                </span>
                <span className="d-flex" style={{ marginTop: "-20px" }}>
                  <p>
                    <span className="fw-bold">{t("Quantity")}:</span>{" "}
                    {marker.Quantity}
                  </p>
                </span>
              </div>
            </Popup>
          </Marker>
          : ""
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
