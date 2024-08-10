import React from 'react';
import HamburgerMenu from '../components/HamburgerMenu'; // Import HamburgerMenu

const CaseStudyTemplate = ({ pageContext: { study } }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <HamburgerMenu /> {/* Add the HamburgerMenu */}
      <h1>{study.name}</h1>
      <p><strong>Location:</strong> {study.location}, {study.country}</p>
      <p><strong>Coordinates:</strong> {study.lat}, {study.lng}</p>
      <p>{study.shortDescription}</p>
      <p>{study.description}</p>
      <img src={study.imagePath} alt={study.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
    </div>
  );
};

export default CaseStudyTemplate;
