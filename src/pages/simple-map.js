import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SimpleMap = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6bmdibWxzMG1hdDJrbjZ0eGNnYXgzdiJ9.7ierylGm2YDls-lDZyXODg'; // Replace with your token
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-122.4194, 37.7749], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default SimpleMap;