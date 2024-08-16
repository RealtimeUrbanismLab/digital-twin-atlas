import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import HamburgerMenu from '../components/HamburgerMenu';
import caseStudies from '../data/caseStudies';
import MapboxGL from 'mapbox-gl';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import '../styles/CaseStudiesList.css';
import defaultImage from '../images/case-studies/case-study.jpg';
import 'mapbox-gl/dist/mapbox-gl.css';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const itemsPerPage = 12;

MapboxGL.accessToken = 'pk.eyJ1IjoicmVhbHRpbWVsYWIiLCJhIjoiY2x6cWUyYmNkMGNyNzJxcTg5ZHB3cmM3aCJ9.GxeOk3BD74C7ElBQZZCguw';

const CaseStudiesList = () => {
  const [sortOption, setSortOption] = useState('alphabetical');
  const [sortOrder, setSortOrder] = useState('asc');
  const [shortListFilter, setShortListFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCaseStudies, setVisibleCaseStudies] = useState(itemsPerPage);
  const [filters, setFilters] = useState({
    country: '',
    status: '',
    startYear: '',
    endYear: ''
  });
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const loadMoreRef = useRef();
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

  // Initialize Mapbox map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new MapboxGL.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0], // Default center
        zoom: 2, // Default zoom level
      });
    }
  }, []);

  const updateMapMarkers = (studies) => {
    if (mapRef.current) {
      // Remove existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      const bounds = new MapboxGL.LngLatBounds();

      studies.forEach((study) => {
        if (study.lat && study.lng) {
          const marker = new MapboxGL.Marker()
            .setLngLat([study.lng, study.lat])
            .setPopup(new MapboxGL.Popup({ offset: 25 }).setText(study.name))
            .addTo(mapRef.current);

          marker.getElement().addEventListener('click', () => {
            setSelectedStudyId(study.id);
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

  const filteredCaseStudies = [...caseStudies]
    .filter(study =>
      (shortListFilter ? study.shortList === 'Yes' : true) &&
      (searchQuery === '' || study.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.country === '' || study.country === filters.country) &&
      (filters.status === '' || study.FinalStatus === filters.status) &&
      (filters.startYear === '' || study['Start Year'] >= filters.startYear) &&
      (filters.endYear === '' || study['End Year'] <= filters.endYear || study['End Year'] === 'N/A')
    )
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortOption) {
        case 'alphabetical':
          return order * a.name.localeCompare(b.name);
        case 'city':
          return order * a.location.localeCompare(b.location);
        case 'country':
          return order * a.country.localeCompare(b.country);
        case 'area':
          return order * (parseFloat(b['Total Area (km2)']) - parseFloat(a['Total Area (km2)']));
        case 'startYear':
          return order * (a['Start Year'] - b['Start Year']);
        case 'status':
          return order * a.FinalStatus.localeCompare(b.FinalStatus);
        default:
          return 0;
      }
    });

  const paginatedCaseStudies = filteredCaseStudies.slice(0, visibleCaseStudies);

  useEffect(() => {
    updateMapMarkers(filteredCaseStudies.slice(0, visibleCaseStudies));
  }, [filters, searchQuery, shortListFilter, sortOrder, sortOption, visibleCaseStudies]);

  // Load more items when scrolling reaches the bottom
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCaseStudies((prev) => Math.min(prev + itemsPerPage, filteredCaseStudies.length));
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [filteredCaseStudies]);

  // Data for Charts
  const countryData = {
    labels: [...new Set(caseStudies.map(study => study.country))],
    datasets: [
      {
        label: 'Number of Projects by Country',
        data: [...new Set(caseStudies.map(study => study.country))].map(country =>
          caseStudies.filter(study => study.country === country).length
        ),
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') + 'B3',
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: ['Completed', 'In Progress', 'Failed', 'Did Not Start'],
    datasets: [
      {
        label: 'Project Status Distribution',
        data: [
          caseStudies.filter(study => study.FinalStatus === 'Completed').length,
          caseStudies.filter(study => study.FinalStatus === 'In Progress').length,
          caseStudies.filter(study => study.FinalStatus === 'Failed').length,
          caseStudies.filter(study => study.FinalStatus === 'Did Not Start').length,
        ],
        backgroundColor: [
          getComputedStyle(document.documentElement).getPropertyValue('--accent-color-1') + 'B3',
          getComputedStyle(document.documentElement).getPropertyValue('--primary-color') + 'B3',
          getComputedStyle(document.documentElement).getPropertyValue('--accent-color-3') + 'B3',
          getComputedStyle(document.documentElement).getPropertyValue('--accent-color-2') + 'B3',
        ],
        borderColor: [
          getComputedStyle(document.documentElement).getPropertyValue('--accent-color-1'),
          getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
          getComputedStyle(document.documentElement).getPropertyValue('--accent-color-3'),
          getComputedStyle(document.documentElement).getPropertyValue('--accent-color-2'),
        ],
        borderWidth: 1,
      },
    ],
  };

  const CaseStudyOverlay = ({ study, onClose }) => (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <h3>{study.name}</h3>
        <img src={study.imagePath || defaultImage} alt={study.name} className="duotone img" />
        <ul className="details-list">
          <li><strong>Country:</strong> {study.country || 'N/A'}</li>
          <li><strong>City:</strong> {study.location || 'N/A'}</li>
          <li><strong>Creators:</strong> {study['Creators'] || 'N/A'}</li>
          <li><strong>Total Area:</strong> {study['Total Area (km2)'] || 'N/A'} km²</li>
          <li><strong>Platform/Organization:</strong> {study['Platform/Organization'] || 'N/A'}</li>
          <li><strong>System Digital Twinned:</strong> {study['System Digital Twinned'] || 'N/A'}</li>
          <li><strong>3D Platform Features:</strong> {study['3D Platform Features'] || 'N/A'}</li>
          <li><span style={{ color: study.FinalStatus === 'Completed' ? 'green' : study.FinalStatus === 'In Progress' ? 'orange' : 'red' }}>
            <strong>Status: </strong>{study.FinalStatus || 'N/A'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <HamburgerMenu />
      <h1>Case Studies</h1>

      <div className="controls sticky-filters">
        <div className="filters-group">
          <div className="filter-controls">
            <label>Filters:</label>
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
          </div>
          <input
            type="text"
            className="search-bar"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={clearFilters} className="clear-filters-button">Clear Filters</button>
        </div>

        <div className="sort-toggle-group">
          <div className="toggle-switch">
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

          <div className="toggle-button">
            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-wrapper">
          <h3 className="chart-title">Project Status Distribution</h3>
          <div className="chart-container">
            <Pie data={statusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="chart-wrapper">
          <h3 className="chart-title">Projects by Country</h3>
          <div className="chart-container">
            <Bar data={countryData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="map-container">
        <div id="map" ref={mapContainerRef}></div>
      </div>

      <div className="case-studies-grid">
        {paginatedCaseStudies.map((study) => (
          <div
            className={`card case-study-card ${study.id === selectedStudyId ? 'selected' : ''}`}
            key={study.id}
            onClick={() => setSelectedStudyId(study.id)}
          >
            <h3 className="card-title">{study.name}</h3>
            <div className="image-container">
              <img
                src={study.imagePath || defaultImage}
                alt={study.name}
                className="duotone img"
              />
              {study.shortList === 'Yes' && <span className="shortlist-tag">Short Listed</span>}
            </div>
            <div className="card-body">
              <ul className="details-list">
                <li><strong>Country:</strong> {study.country || 'N/A'}</li>
                <li><strong>City:</strong> {study.location || 'N/A'}</li>
                <li><strong>Creators:</strong> {study['Creators'] || 'N/A'}</li>
                <li><strong>Total Area:</strong> {study['Total Area (km2)'] || 'N/A'} km²</li>
                <li><strong>Platform/Organization:</strong> {study['Platform/Organization'] || 'N/A'}</li>
                <li><strong>System Digital Twinned:</strong> {study['System Digital Twinned'] || 'N/A'}</li>
                <li><strong>3D Platform Features:</strong> {study['3D Platform Features'] || 'N/A'}</li>
                <li><span style={{ color: study.FinalStatus === 'Completed' ? 'green' : study.FinalStatus === 'In Progress' ? 'orange' : 'red' }}>
                  <strong>Status: </strong>{study.FinalStatus || 'N/A'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} style={{ height: '50px', marginTop: '20px' }}></div>

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
