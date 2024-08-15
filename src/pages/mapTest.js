import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import MapboxGL from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/CaseStudiesList.css';

MapboxGL.accessToken = 'pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6cWUyYmNkMGNyNzJxcTg5ZHB3cmM3aCJ9.GxeOk3BD74C7ElBQZZCguw';

const CaseStudiesList = ({ caseStudies }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new MapboxGL.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
      });

      mapRef.current.on('load', () => {
        caseStudies.forEach(study => {
          if (study.lat && study.lng) {
            new MapboxGL.Marker()
              .setLngLat([study.lng, study.lat])
              .setPopup(new MapboxGL.Popup({ offset: 25 }).setText(study.name))
              .addTo(mapRef.current);
          }
        });
      });
    }
  }, [caseStudies]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Other UI components */}
      <div className="map-container">
        <div id="map" ref={mapContainerRef}></div>
      </div>
      {/* Other UI components */}
    </div>
  );
};

export default CaseStudiesList;
