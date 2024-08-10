# Digital Twin Atlas

## Overview
Digital Twin Atlas is a project designed to map and showcase digital twins across the globe. This application is built with Gatsby and Mapbox GL, allowing users to explore various case studies of digital twin projects through an interactive map interface.

## Features
- **Interactive Map**: Browse and explore global digital twin projects using a Mapbox-powered map.
- **Case Studies**: Detailed information on each digital twin project, accessible through map markers and popups.
- **Responsive Design**: The application is designed to work across devices, ensuring a consistent experience.

## Prerequisites
- Node.js (LTS version recommended)
- npm or yarn

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/YourGitHubUsername/digital-twin-atlas.git
    ```

2. Navigate to the project directory:
    ```bash
    cd digital-twin-atlas
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

## Development

To start a development server with hot-reloading:

```bash
npm run develop
```

### Running with Path Prefix Locally

If you need to test the site with the path prefix (for example, `/digital-twin-atlas/`), you can do so by running:

```bash
npm run build -- --prefix-paths
npm run serve -- --prefix-paths
```

This will serve your built site with the correct prefix applied, allowing you to test it locally as it would appear on GitHub Pages.

## Deployment

This project is designed to be deployed to GitHub Pages. Before deploying, make sure your `gatsby-config.js` has the correct `pathPrefix`:

```javascript
module.exports = {
  pathPrefix: "/digital-twin-atlas",
  siteMetadata: {
    // Your site metadata here
  },
  // other configurations...
};
```

To deploy:

```bash
npm run deploy
```

This will build the project with the necessary path prefix and push the contents of the `public` directory to the `gh-pages` branch of your repository.

## Usage

### Interactive Map
- Click on a marker to view information about the corresponding digital twin project.
- The marker will change to a highlighted state when selected.
- The popup provides a brief overview and a link to a detailed case study.

### Case Studies
- Each case study is a dedicated page with detailed information about the digital twin project, including location, description, and images.

## Extending the Project

### Adding New Case Studies
To add a new case study:

1. Add a new entry in the `src/data/caseStudies.js` file with the relevant details (name, location, description, etc.).
2. The map and site will automatically incorporate this new case study.

### Customizing the Map
You can customize the map style by modifying the Mapbox style URL in the `Map.js` component:

```javascript
const initializeMap = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/realtimelab/clznlra4y00a001qgan7xdk3p', // Update this line with your style URL
  center: [0, 20],
  zoom: 2,
  bearing: 0,
  pitch: 0,
});
```

## Troubleshooting

### Issues with Path Prefixes
If you encounter issues with paths not resolving correctly after deployment:

1. Ensure you have set the `pathPrefix` correctly in `gatsby-config.js`.
2. Use Gatsby's `Link` component for internal links, as it automatically handles path prefixes.
3. Test the site locally using `gatsby serve --prefix-paths` to ensure the prefix is applied correctly.

### Common Commands

- **Start Development Server**: `npm run develop`
- **Build for Production**: `npm run build`
- **Serve Production Build Locally**: `npm run serve`
- **Deploy to GitHub Pages**: `npm run deploy`