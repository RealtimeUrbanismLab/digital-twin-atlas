import React from 'react';
import Map from '../components/Map';
import HamburgerMenu from '../components/HamburgerMenu';
import 'mapbox-gl/dist/mapbox-gl.css';
import caseStudies from '../data/caseStudies'; // Import the data

const IndexPage = () => {
  // Access CSS variables
  let secondaryColor;
  if (typeof window !== 'undefined') {
    secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
  }

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <HamburgerMenu />
      <h1 style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '3vw', // Responsive font size
        color: secondaryColor, // Fallback to black if variable is not available
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for better readability
        zIndex: 10,
        textAlign: 'center',
      }}>
        Global Atlas of Digital Twins
      </h1>
      <Map caseStudies={caseStudies} />
    </main>
  );
};

export default IndexPage;
