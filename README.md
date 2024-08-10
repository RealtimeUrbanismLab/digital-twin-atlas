# Digital Twin Atlas

## Overview

The **Digital Twin Atlas** is an interactive map-based project showcasing various digital twin case studies from around the world. The application is built using [Gatsby](https://www.gatsbyjs.com/), [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/), and React. Each case study is represented as a marker on the map, with detailed information available through a popup and a dedicated case study page.

## Features

- **Interactive Map**: Explore digital twin case studies on an interactive Mapbox-powered map.
- **Responsive Design**: The application is fully responsive, providing a seamless experience across devices.
- **Marker Highlighting**: Click on a marker to highlight it and view detailed information in a popup.
- **Case Study Pages**: Each marker links to a detailed page with further information about the digital twin project.

## Project Structure

```
├── src
│   ├── components
│   │   ├── HamburgerMenu.js
│   │   ├── Map.js
│   ├── data
│   │   └── caseStudies.js
│   ├── images
│   │   ├── marker-icon.png
│   │   ├── marker-icon-selected.png
│   ├── pages
│   │   ├── index.js
│   ├── styles
│   │   ├── HamburgerMenu.css
│   │   └── global.css
│   ├── templates
│   │   └── case-study.js
├── public
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── package.json
├── README.md
```

### Key Files and Directories

- **src/components**: Contains the main React components (`HamburgerMenu.js`, `Map.js`) used throughout the project.
- **src/data**: Houses the `caseStudies.js` file, which contains all the case study data.
- **src/images**: Stores images for markers and other UI elements.
- **src/pages**: Includes the main pages (`index.js`) for the application.
- **src/templates**: Contains the template file (`case-study.js`) for dynamically generating case study pages.
- **src/styles**: Contains global styles (`global.css`) and specific component styles (`HamburgerMenu.css`).

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) and npm (Node Package Manager)
- [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/digital-twin-atlas.git
   cd digital-twin-atlas
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Development Server

To start the development server and view the project locally:

```sh
gatsby develop
```

The development server will be available at `http://localhost:8000`.

### Building for Production

To build the project for production:

```sh
gatsby build
```

The static files will be generated in the `public` directory.

### Deploying the Project

You can deploy the `public` directory to any static site hosting service, such as [GitHub Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), or [Vercel](https://vercel.com/).

## Adding/Modifying Case Studies

### Data Structure

The case studies are stored in the `src/data/caseStudies.js` file. Each case study is an object in the array, with the following structure:

```javascript
const caseStudies = [
  {
    id: '1',
    name: 'Digital Twin of Vienna',
    location: 'Vienna',
    country: 'Austria',
    shortList: 'Yes',
    lat: 48.20263,
    lng: 16.36842,
    shortDescription: 'This is a brief description of Case Study 1, Digital Twin of Vienna.',
    description: 'Full description of Digital Twin of Vienna.',
    imagePath: '/images/case-study-1.jpg',
  },
  // More case studies...
];
```

### Adding a New Case Study

1. **Add Case Study Data**: Open the `caseStudies.js` file and add a new object to the array following the structure above.
2. **Add Case Study Image**: Place the corresponding image in the `src/images` directory.
3. **Rebuild and Deploy**: After adding the new case study, rebuild the project with `gatsby build` and deploy the updated `public` directory.

## Extending the Project

### Customizing Styles

- **Global Styles**: Modify `src/styles/global.css` to change global styles across the application.
- **Component-Specific Styles**: Modify the specific CSS files, such as `HamburgerMenu.css`, to adjust individual components.

### Customizing Map

- **Map Style**: You can update the Mapbox style URL in the `Map.js` component.
- **Markers**: Replace the marker icons in `src/images` with your preferred designs.

## Known Issues and Troubleshooting

- **Mapbox Issues**: If the map isn't loading correctly, check the Mapbox access token in `Map.js`.
- **Marker Highlighting**: If markers aren't behaving as expected, ensure that the correct event listeners and state updates are in place.