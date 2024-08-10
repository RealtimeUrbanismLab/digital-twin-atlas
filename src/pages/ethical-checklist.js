import React from 'react';
import HamburgerMenu from '../components/HamburgerMenu'; // Import HamburgerMenu

const EthicalChecklist = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <HamburgerMenu /> {/* Add the HamburgerMenu */}
      <h1>Ethical Checklist</h1>
      <p>This is a placeholder for the Ethical Checklist content. Here, you can outline the ethical considerations for digital twin projects, including data privacy, environmental impact, and social equity.</p>
    </div>
  );
};

export default EthicalChecklist;
