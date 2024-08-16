import React, { useState, useEffect, useRef } from 'react';
import MapboxGL from 'mapbox-gl';
import HamburgerMenu from '../components/HamburgerMenu';
import caseStudies from '../data/caseStudies';
import '../styles/CaseStudiesList.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import defaultImage from '../images/case-studies/case-study.jpg';

MapboxGL.accessToken = 'pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6cWUyYmNkMGNyNzJxcTg5ZHB3cmM3aCJ9.GxeOk3BD74C7ElBQZZCguw';

const CaseStudiesList = () => {
  const [filters, setFilters] = useState({
    country: '',
    status: '',
    startYear: '',
    endYear: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [shortListFilter, setShortListFilter] = useState(false);
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      status: '',
      startYear: '',
      endYear: ''
    });
    setSearchQuery('');
    setShortListFilter(false);
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new MapboxGL.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/realtimelab/clznlra4y00a001qgan7xdk3p', // mapbox://styles/mapbox/streets-v11
        center: [0, 0], 
        zoom: 2,
      });
    }
  }, []);

  const updateMapMarkers = (studies) => {
    if (mapRef.current) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
  
      const bounds = new MapboxGL.LngLatBounds();
  
      studies.forEach((study) => {
        if (study.lat && study.lng) {
          const popupContent = `
            <h3>${study.name}</h3>
            <p><strong>Location:</strong> ${study.location}, ${study.country}</p>
            <p><strong>Status:</strong> ${study.FinalStatus}</p>
            <button id="learn-more-${study.id}" class="learn-more-button">Learn More</button>
          `;
  
          const popup = new MapboxGL.Popup({ offset: 25 })
            .setHTML(popupContent);
  
          const marker = new MapboxGL.Marker()
            .setLngLat([study.lng, study.lat])
            .setPopup(popup)
            .addTo(mapRef.current);
  
          // Delay to ensure popup content is rendered in DOM
          marker.getElement().addEventListener('click', () => {
            popup.addTo(mapRef.current);
  
            setTimeout(() => {
              const learnMoreButton = document.getElementById(`learn-more-${study.id}`);
              if (learnMoreButton) {
                learnMoreButton.addEventListener('click', (e) => {
                  e.stopPropagation(); // Prevent triggering the marker's click event
                  console.log('Learn More button clicked for study id:', study.id);
                  setSelectedStudyId(study.id);
                });
              } else {
                console.log('Learn More button not found:', `learn-more-${study.id}`);
              }
            }, 100); // Adjust timeout if needed
          });
  
          markersRef.current.push(marker);
          bounds.extend([study.lng, study.lat]);
        }
      });
  
      if (studies.length > 0 && !bounds.isEmpty()) {
        mapRef.current.fitBounds(bounds, { padding: 50 });
      } else {
        mapRef.current.setCenter([0, 0]);
        mapRef.current.setZoom(2);
      }
    }
  };
  
  
  

  const filteredCaseStudies = caseStudies
    .filter(study =>
      (shortListFilter ? study.shortList === 'Yes' : true) &&
      (searchQuery === '' || study.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.country === '' || study.country === filters.country) &&
      (filters.status === '' || study.FinalStatus === filters.status) &&
      (filters.startYear === '' || study['Start Year'] >= filters.startYear) &&
      (filters.endYear === '' || study['End Year'] <= filters.endYear || study['End Year'] === 'N/A')
    );

  useEffect(() => {
    updateMapMarkers(filteredCaseStudies);
  }, [filters, searchQuery, shortListFilter]);

  const CaseStudyOverlay = ({ study, onClose }) => {
    // Only access getComputedStyle in browser environment
    let primaryColor, secondaryColor, accentColor1, accentColor2, accentColor3;
    if (typeof window !== 'undefined') {
      primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
      accentColor1 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-1').trim();
      accentColor2 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-2').trim();
      accentColor3 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-3').trim();
    }

    return (
      <div className="overlay">
        <div className="overlay-content">
          <button className="close-button" onClick={onClose}>Close</button>
          <h1>{study.name}</h1>      
          <img
            src={study.imagePath || defaultImage}
            alt={study.name}
            style={{ maxWidth: '100%', borderRadius: '0px', marginTop: '20px' }}
            className="duotone img"
          />
          <div className="overlay-details">
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
            <p><strong>Project State:</strong> {study['Project State']}</p>
            <p><strong>Platform/Organization:</strong> {study['Platform/Organization']}</p>
            <p><strong>Shortlisted:</strong> {study.shortList}</p>
            <p><strong>3D Platform:</strong> {study["3D Platform"]}</p>
            <p><strong>3D Platform Features:</strong> {study["3D Platform Features"]}</p>
            <p><strong>3D Platform to Physical City Control:</strong> {study["3D Platform to Physical City Control"]}</p>
            <p><strong>Decision Making:</strong> {study['Decision Making']}</p>
            <p><strong>Contested Claims/Challenges:</strong> {study['Contested Claims/Challenges']}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <div className="hamburger-overlay">
        <HamburgerMenu />
      </div>
  
      <div className="controls-overlay">
        <div className="filters-group">
          <div className="filter-controls">
            <select name="country" value={filters.country} onChange={handleFilterChange}>
              <option value="">Country: All</option>
              {[...new Set(caseStudies.map(study => study.country))].map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">Status: All</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Failed">Failed</option>
              <option value="Did Not Start">Did Not Start</option>
            </select>
            <input
              type="number"
              name="startYear"
              className="search-bar"
              placeholder="Start Year"
              value={filters.startYear}
              onChange={(e) => handleFilterChange(e)}
              min="1900"
              max="2100"
            />
            <input
              type="number"
              name="endYear"
              className="search-bar"
              placeholder="End Year"
              value={filters.endYear}
              onChange={(e) => handleFilterChange(e)}
              min="1900"
              max="2100"
            />
            <input
              type="text"
              className="search-bar"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
  
        <div className="toggle-switch">
          <button onClick={clearFilters} className="clear-filters-button">Clear Filters</button>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={shortListFilter}
              onChange={(e) => setShortListFilter(e.target.checked)}
            />
            <span className="slider"></span>
            <span className="toggle-text">Short List Only</span>
          </label>
        </div>
      </div>
  
      <div className="map-container">
        <div id="map" ref={mapContainerRef} />
      </div>
  
      {selectedStudyId && (
        <CaseStudyOverlay
          study={caseStudies.find(study => study.id === selectedStudyId)}
          onClose={() => setSelectedStudyId(null)}
        />
      )}
    </div>
  );
};

export default CaseStudiesList;
