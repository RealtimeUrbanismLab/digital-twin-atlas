// src/templates/case-study.js

import React from 'react';

const CaseStudyTemplate = ({ pageContext: { study } }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>{study.name}</h1>
      <p><strong>Location:</strong> {study.location}, {study.country}</p>
      <p><strong>Coordinates:</strong> {study.lat}, {study.lng}</p>
      <p>{study.shortDescription}</p>
      <p>{study.description}</p>
      <img src={study.imagePath} alt={study.name} />
    </div>
  );
};

export default CaseStudyTemplate;
