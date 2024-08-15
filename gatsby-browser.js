/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

import './src/styles/global.css';

export const onClientEntry = () => {
  // Load Google Fonts
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Load Font Awesome for icons
  const script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/a076d05399.js';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
};

