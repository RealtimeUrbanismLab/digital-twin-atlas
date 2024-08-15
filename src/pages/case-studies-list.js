import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import HamburgerMenu from '../components/HamburgerMenu';
import caseStudies from '../data/caseStudies';
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

const itemsPerPage = 12; // Number of case studies to load initially and on each scroll

const CaseStudiesList = () => {
  const [sortOption, setSortOption] = useState('alphabetical');
  const [sortOrder, setSortOrder] = useState('asc');
  const [shortListFilter, setShortListFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCaseStudies, setVisibleCaseStudies] = useState(itemsPerPage);
  const [filters, setFilters] = useState({
    country: '',
    status: '',
  });
  const loadMoreRef = useRef();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const sortedCaseStudies = [...caseStudies]
    .filter(study =>
      (shortListFilter ? study.shortList === 'Yes' : true) &&
      (searchQuery === '' || study.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.country === '' || study.country === filters.country) &&
      (filters.status === '' || study.FinalStatus === filters.status)
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

  const paginatedCaseStudies = sortedCaseStudies.slice(0, visibleCaseStudies);

  // Load more items when scrolling reaches the bottom
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCaseStudies((prev) => Math.min(prev + itemsPerPage, sortedCaseStudies.length));
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
  }, [sortedCaseStudies]);

  // Fetching CSS variables using JavaScript
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
  const accentColor1 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-1').trim();
  const accentColor2 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-2').trim();
  const accentColor3 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-3').trim();

  // Data for Charts
  const countryData = {
    labels: [...new Set(caseStudies.map(study => study.country))],
    datasets: [
      {
        label: 'Number of Projects by Country',
        data: [...new Set(caseStudies.map(study => study.country))].map(country =>
          caseStudies.filter(study => study.country === country).length
        ),
        backgroundColor: `${secondaryColor}B3`, // Secondary color with 70% opacity
        borderColor: secondaryColor,
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
          `${accentColor1}B3`, // Accent color 1 with 70% opacity
          `${primaryColor}B3`, // Primary color with 70% opacity
          `${accentColor3}B3`, // Accent color 3 with 70% opacity
          `${accentColor2}B3`, // Accent color 2 with 70% opacity
        ],
        borderColor: [
          accentColor1,
          primaryColor,
          accentColor3,
          accentColor2,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <HamburgerMenu />
      <h1>Case Studies</h1>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-wrapper">
          <h2 className="chart-title">Projects by Country</h2>
          <div className="chart-container">
            <Bar data={countryData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="chart-wrapper">
          <h2 className="chart-title">Project Status Distribution</h2>
          <div className="chart-container">
            <Pie data={statusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Filters Section */}
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
          </div>
          <input
            type="text"
            className="search-bar"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="sort-controls">
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
      </div>

      {/* Case Studies Grid */}
      <div className="case-studies-grid">
        {paginatedCaseStudies.map((study) => (
          <div className="card case-study-card" key={study.id}>
            <Link to={`/case-studies/${study.id}`}>
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
                <p><strong>Country:</strong> {study.country || 'N/A'}</p>
                <p><strong>City:</strong> {study.location || 'N/A'}</p>
                <p><strong>Total Area:</strong> {study['Total Area (km2)'] || 'N/A'} km²</p>
                <p style={{ color: study.FinalStatus === 'Completed' ? 'green' : study.FinalStatus === 'In Progress' ? 'orange' : 'red' }}>
                  <strong>Status:</strong> {study.FinalStatus || 'N/A'}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Load More Indicator */}
      <div ref={loadMoreRef} style={{ height: '50px', marginTop: '20px' }}></div>
    </div>
  );
};

export default CaseStudiesList;
