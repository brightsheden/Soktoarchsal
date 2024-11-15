import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Example GeoJSON for Sokoto State (replace with accurate data)
const sokotoGeoJson = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [5.0, 13.1],
        [5.5, 13.1],
        [5.5, 12.6],
        [5.0, 12.6],
        [5.0, 13.1],
      ],
    ],
  },
  properties: {},
};

const MapboxMap = () => {
  return (
    <Map
      initialViewState={{
        longitude: 5.2414, // Center of Sokoto
        latitude: 13.0586,
        zoom: 10,
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoic2hlZGVuYnJpZ2h0IiwiYSI6ImNtM2owYXl0ODA1NXcybHNiZmVuaG0zeWsifQ.ZO2AUdPHbvnYcPXhtpwpuw"
    >
      {/* Add GeoJSON Source and Layer */}
      <Source id="sokoto" type="geojson" data={sokotoGeoJson}>
        <Layer
          id="sokoto-layer"
          type="fill"
          paint={{
            'fill-color': 'blue', // Blue color for Sokoto
            'fill-opacity': 0.5,  // Semi-transparent
          }}
        />
      </Source>
    </Map>
  );
};

export default MapboxMap;
