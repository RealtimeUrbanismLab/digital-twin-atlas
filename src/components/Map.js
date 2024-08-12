import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerIcon from '../images/marker-icon.png';
import selectedMarkerIcon from '../images/marker-icon-selected.png';
import { Link } from 'gatsby';

const mapboxToken = process.env.GATSBY_MAPBOX_API_KEY || "pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6cWUyYmNkMGNyNzJxcTg5ZHB3cmM3aCJ9.GxeOk3BD74C7ElBQZZCguw";

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
            highlightedMarker.style.backgroundImage = `url(${markerIcon})`;
          }

          markerElement.style.backgroundImage = `url(${selectedMarkerIcon})`;
          setHighlightedMarker(markerElement);
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

  const truncateText = (text, maxLength) => {
    if (!text) return '';  // Return an empty string if text is undefined or null
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
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
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          zIndex: 10,
          maxWidth: '300px',
          textAlign: 'center',
          color: '#333',
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#444' }}>{selectedStudy.name}</h2>
          <p style={{ marginBottom: '5px' }}><strong>Location:</strong> {selectedStudy.location}, {selectedStudy.country}</p>
          <p style={{ marginBottom: '5px' }}><strong>Start Year:</strong> {selectedStudy['Start Year']}</p>
          <p style={{ marginBottom: '5px' }}><strong>Creators:</strong> {selectedStudy.Creators}</p>
          <p style={{ marginBottom: '15px' }}>
            <span className="fade-text">
            <strong>Description:</strong> {truncateText(selectedStudy.Description, 50)}
              {selectedStudy.Description && selectedStudy.Description.length > 50 && (
                <span style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '2em',
                  height: '1.2em',
                  background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 100%)'
                }}></span>
              )}
            </span>
          </p>
          <Link to={`/case-studies/${selectedStudy.id}`} style={{
            display: 'inline-block',
            marginBottom: '15px',
            padding: '10px 20px',
            backgroundColor: '#007acc',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#005fa3'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#007acc'}
          >Learn more</Link>
          <button onClick={closePopup} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#888',
          }}>✖</button>
        </div>
      )}
    </div>
  );
};

export default Map;
