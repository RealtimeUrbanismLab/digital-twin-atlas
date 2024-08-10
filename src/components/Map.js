import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerIcon from '../images/marker-icon.png';
import selectedMarkerIcon from '../images/marker-icon-selected.png'; // Highlighted marker icon

const mapboxToken = "pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6bmdibWxzMG1hdDJrbjZ0eGNnYXgzdiJ9.7ierylGm2YDls-lDZyXODg";

const Map = ({ caseStudies }) => {
  const [map, setMap] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [highlightedMarker, setHighlightedMarker] = useState(null);

  useEffect(() => {
    if (!map) {
      mapboxgl.accessToken = mapboxToken;

      const initializeMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/realtimelab/clznlra4y00a001qgan7xdk3p',
        center: [0, 20],
        zoom: 2,
        bearing: 0,
        pitch: 0,
      });

      caseStudies.forEach(study => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.style.backgroundImage = `url(${markerIcon})`;
        markerElement.style.width = '32px';
        markerElement.style.height = '32px';
        markerElement.style.backgroundSize = '100%';
        markerElement.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([study.lng, study.lat])
          .addTo(initializeMap);

        markerElement.addEventListener('click', () => {
          if (highlightedMarker && highlightedMarker !== markerElement) {
            highlightedMarker.style.backgroundImage = `url(${markerIcon})`; // Reset previous marker
          }

          markerElement.style.backgroundImage = `url(${selectedMarkerIcon})`; // Highlight current marker
          setHighlightedMarker(markerElement); // Update the highlighted marker
          setSelectedStudy(study);
        });
      });

      setMap(initializeMap);
    }

    return () => {
      if (map) map.remove();
    };
  }, [caseStudies, map]);

  const closePopup = () => {
    if (highlightedMarker) {
      highlightedMarker.style.backgroundImage = `url(${markerIcon})`;
      setHighlightedMarker(null);
    }
    setSelectedStudy(null);
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div id="map" style={{ width: '100%', height: '100%' }} />
      {selectedStudy && (
        <div className="popup" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
          zIndex: 10,
          maxWidth: '320px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={closePopup}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#333">
              <path d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.58 7.12 4.7A1 1 0 005.7 5.71L10.58 10.59 5.71 15.46a1 1 0 001.42 1.42L12 11.41l4.88 4.88a1 1 0 001.42-1.42L13.41 10.59 18.3 5.71z" />
            </svg>
          </div>
          <h2 style={{ marginTop: '0', fontSize: '1.5rem', color: '#333' }}>{selectedStudy.name}</h2>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '15px' }}>{selectedStudy.shortDescription}</p>
          <a href={`/case-studies/${selectedStudy.id}`} rel="noopener noreferrer" style={{
            display: 'inline-block',
            marginTop: '10px',
            backgroundColor: '#1e90ff',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
          }}>Learn more</a>
        </div>
      )}
    </div>
  );
};

export default Map;
