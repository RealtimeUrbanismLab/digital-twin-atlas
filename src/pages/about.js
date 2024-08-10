// src/pages/about.js
import React from 'react';
import HamburgerMenu from '../components/HamburgerMenu';

const About = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <HamburgerMenu />
      <h1>About This Project</h1>
      <p>
        This project, the "Global Atlas of Digital Twins," is a comprehensive database and interactive map that showcases various digital twin projects across the world. The digital twin concept involves creating a virtual replica of a physical object, system, or city, allowing for real-time monitoring, simulation, and analysis.
      </p>
      <p>
        The atlas provides detailed case studies of digital twin implementations, highlighting the technology's impact on urban planning, smart cities, and more. Each case study includes information about the project, its location, and its significance in the field of digital twins.
      </p>
      <p>
        This project aims to bring awareness to the advancements and ethical considerations of digital twin technology, offering insights into its potential and challenges.
      </p>
    </div>
  );
};

export default About;
