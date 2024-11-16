import React, { useState, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = () => {
  const [mapRef, setMapRef] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: 5.2414,
    latitude: 13.0586,
    zoom: 10,

  });

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
  

  useEffect(() => {
    if (mapRef?.current) {
      mapRef?.current.on('load', () => {
        console.log('Map loaded successfully');
      });
      mapRef.current.on('moveend', () => {
        setViewport(mapRef?.current.getViewport());
      });
    }
  }, []);

  const handleResize = () => {
    if (mapRef?.current) {
      mapRef?.current.fitBounds(
        [[viewport.longitude - 0.01, viewport.latitude - 0.01], 
         [viewport.longitude + 0.01, viewport.latitude + 0.01]],
        { padding: 50 }
      );
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Map
      ref={setMapRef}
      style={{ width: '100%', height: 300 }} // Start with a smaller height
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoic2hlZGVuYnJpZ2h0IiwiYSI6ImNtM2owYXl0ODA1NXcybHNiZmVuaG0zeWsifQ.ZO2AUdPHbvnYcPXhtpwpuw"
    >
      <Source id="sokoto" type="geojson" data={sokotoGeoJson}>
        <Layer
          id="sokoto-layer"
          type="fill"
          paint={{
            'fill-color': '#0000ff',
            'fill-opacity': 0.5,
          }}
        />
      </Source>
    </Map>
  );
};

export default MapboxMap;