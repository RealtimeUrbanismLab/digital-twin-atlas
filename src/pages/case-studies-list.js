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

  // Only access getComputedStyle in browser environment
  let primaryColor, secondaryColor, accentColor1, accentColor2, accentColor3;
  if (typeof window !== 'undefined') {
    primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
    accentColor1 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-1').trim();
    accentColor2 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-2').trim();
    accentColor3 = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-3').trim();
  }

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

  // Data for Charts
  const countryData = {
    labels: [...new Set(caseStudies.map(study => study.country))],
    datasets: [
      {
        label: 'Number of Projects by Country',
        data: [...new Set(caseStudies.map(study => study.country))].map(country =>
          caseStudies.filter(study => study.country === country).length
        ),
        backgroundColor: secondaryColor ? `${secondaryColor}B3` : 'rgba(52, 152, 219, 0.7)', // Fallback color
        borderColor: secondaryColor || 'rgba(52, 152, 219, 1)', // Fallback color
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
          accentColor1 ? `${accentColor1}B3` : 'rgba(46, 204, 113, 0.7)', // Fallback color
          primaryColor ? `${primaryColor}B3` : 'rgba(52, 152, 219, 0.7)', // Fallback color
          accentColor3 ? `${accentColor3}B3` : 'rgba(231, 76, 60, 0.7)', // Fallback color
          accentColor2 ? `${accentColor2}B3` : 'rgba(155, 89, 182, 0.7)', // Fallback color
        ],
        borderColor: [
          accentColor1 || 'rgba(46, 204, 113, 1)', // Fallback color
          primaryColor || 'rgba(52, 152, 219, 1)', // Fallback color
          accentColor3 || 'rgba(231, 76, 60, 1)', // Fallback color
          accentColor2 || 'rgba(155, 89, 182, 1)', // Fallback color
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
                <ul className="details-list">
                  <li><strong>Country:</strong> {study.country || 'N/A'}</li>
                  <li><strong>City:</strong> {study.location || 'N/A'}</li>
                  <li><strong>Total Area:</strong> {study['Total Area (km2)'] || 'N/A'} km²</li>
                  <li>
                    <strong>Status: </strong>
                    <span style={{ color: study.FinalStatus === 'Completed' ? 'green' : study.FinalStatus === 'In Progress' ? 'orange' : 'red' }}>
                      {study.FinalStatus || 'N/A'}
                    </span>
                  </li>
                </ul>
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
