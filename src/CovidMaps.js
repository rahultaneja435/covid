import React from "react";
import { TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import "./covidmap.css";
import { mappedData } from "./util";

function CovidMaps({ centerData, zoomData, countryResponse, casesType }) {
  return (
    <div className="covidMapper">
      <MapContainer center={centerData} zoom={zoomData}>
        <TileLayer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href = "http://osm.org/copyright">OpenStreet</a> contributers'
        />
        {mappedData(countryResponse, casesType)}
      </MapContainer>
    </div>
  );
}

export default CovidMaps;
