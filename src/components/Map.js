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
        center: [43.098681, 32.072086],
        zoom: 3.5,
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
          backgroundColor: 'var(--card-background-color)',
          padding: 'var(--space-3)',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          zIndex: 10,
          maxWidth: '300px',
          textAlign: 'center',
          color: 'var(--text-color)',
          fontSize: 'var(--font-md)',
          lineHeight: 'var(--line-height-normal)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)', color: 'var(--heading-color)' }}>{selectedStudy.name}</h2>
          <p style={{ marginBottom: 'var(--space-1)' }}><strong>Location:</strong> {selectedStudy.location}, {selectedStudy.country}</p>
          <p style={{ marginBottom: 'var(--space-1)' }}><strong>Start Year:</strong> {selectedStudy['Start Year']}</p>
          <p style={{ marginBottom: 'var(--space-1)' }}><strong>Creators:</strong> {selectedStudy.Creators}</p>
          <p style={{ marginBottom: 'var(--space-3)' }}>
            <span className="fade-text">
              <strong>Description:</strong> {truncateText(selectedStudy.Description, 50)}
              {selectedStudy.Description && selectedStudy.Description.length > 50 && (
                <span style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '2em',
                  height: '1.2em',
                  background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, var(--card-background-color) 100%)'
                }}></span>
              )}
            </span>
          </p>
          <Link to={`/case-studies/${selectedStudy.id}`} style={{
            display: 'inline-block',
            marginBottom: 'var(--space-3)',
            padding: 'var(--space-2) var(--space-3)',
            backgroundColor: 'var(--button-background-color)',
            color: 'var(--button-text-color)',
            borderRadius: 'var(--border-radius)',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--button-hover-background-color)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--button-background-color)'}
          >Learn more</Link>
          <button onClick={closePopup} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: 'var(--text-color)',
          }}>✖</button>
        </div>
      )}
    </div>
  );
};

export default Map;
