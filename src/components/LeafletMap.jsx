import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  return (
    <MapContainer
      center={[13.0586, 5.2414]} 
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[13.0586, 5.2414]} />
    </MapContainer>
  );
};

export default LeafletMap;
