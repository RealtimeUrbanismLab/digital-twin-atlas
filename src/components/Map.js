import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerIcon from '../images/marker-icon.png';
import selectedMarkerIcon from '../images/marker-icon-selected.png';
import { Link } from 'gatsby'; // Import the Link component

const mapboxToken = "your-mapbox-token-here";

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
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          zIndex: 10,
          maxWidth: '300px',
          textAlign: 'center'
        }}>
          <h2>{selectedStudy.name}</h2>
          <p>{selectedStudy.shortDescription}</p>
          <Link to={`/case-studies/${selectedStudy.id}`}>Learn more</Link> {/* Use Link for internal navigation */}
          <button onClick={closePopup} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
          }}>✖</button>
        </div>
      )}
    </div>
  );
};

export default Map;
