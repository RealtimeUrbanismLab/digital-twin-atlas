import React from 'react';
import HamburgerMenu from '../components/HamburgerMenu'; 

const CaseStudyTemplate = ({ pageContext: { study } }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <HamburgerMenu /> 
      <h1>{study.name}</h1>
      <p><strong>Location:</strong> {study.location}, {study.country}</p>
      <p><strong>Coordinates:</strong> {study.lat}, {study.lng}</p>
      <p><strong>Description:</strong> {study.Description}</p>
      <p><strong>Total Area:</strong> {study['Total Area (km2)']} km²</p>
      <p><strong>System Digital Twinned:</strong> {study['System Digital Twinned']}</p>
      <p><strong>Start Year:</strong> {study['Start Year']}</p>
      <p><strong>End Year:</strong> {study['End Year']}</p>
      <p><strong>Creators:</strong> {study.Creators}</p>
      <p><strong>Clients/Sponsors:</strong> {study['Clients/Sponsors']}</p>
      <p><strong>Users:</strong> {study.Users}</p>
      <p><strong>Status:</strong> {study.Status}</p>
      <p><strong>3D Platform:</strong> {study["3D Platform"]}</p>
      <p><strong>3D Platform Features:</strong> {study["3D Platform Features"]}</p>
      <p><strong>3D Platform to Physical City Control:</strong> {study["3D Platform to Physical City Control"]}</p>
      <p><strong>Decision Making:</strong> {study['Decision Making']}</p>
      <p><strong>Contested Claims/Challenges:</strong> {study['Contested Claims/Challenges']}</p>
      {study.imagePath && <img src={study.imagePath} alt={study.name} style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '20px' }} />}
    </div>
  );
};

export default CaseStudyTemplate;