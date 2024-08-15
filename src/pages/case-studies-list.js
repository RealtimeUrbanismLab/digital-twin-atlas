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

const defaultImage = '/path-to-default-image.jpg'; // Placeholder image path
const itemsPerPage = 10; // Number of case studies to load initially and on each scroll

const CaseStudiesList = () => {
  const [sortOption, setSortOption] = useState('alphabetical');
  const [sortOrder, setSortOrder] = useState('asc');
  const [shortListFilter, setShortListFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCaseStudies, setVisibleCaseStudies] = useState(itemsPerPage);
  const [filters, setFilters] = useState({
    country: '',
    status: '',
    projectState: '',
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
      (filters.status === '' || study.Status === filters.status) &&
      (filters.projectState === '' || study['Project State'] === filters.projectState)
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
          return order * a.Status.localeCompare(b.Status);
        case 'projectState':
          return order * a['Project State'].localeCompare(b['Project State']);
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
        backgroundColor: 'rgba(52, 152, 219, 0.7)', // Primary color
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const statusData = {
    labels: ['Implemented', 'In Progress', 'Planned'],
    datasets: [
      {
        label: 'Project Status Distribution',
        data: [
          caseStudies.filter(study => study.Status === 'Implemented').length,
          caseStudies.filter(study => study.Status === 'In Progress').length,
          caseStudies.filter(study => study.Status === 'Planned').length,
        ],
        backgroundColor: [
          'rgba(46, 204, 113, 0.7)', // Secondary Accent
          'rgba(52, 152, 219, 0.7)', // Primary Color
          'rgba(231, 76, 60, 0.7)', // Additional highlight color
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(231, 76, 60, 1)',
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
        <div className="chart-container">
          <h2>Projects by Country</h2>
          <Bar data={countryData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="chart-container">
          <h2>Project Status Distribution</h2>
          <Pie data={statusData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="controls">
        <div className="filters">
          <label>Sort by:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="alphabetical">Alphabetical</option>
            <option value="city">City</option>
            <option value="country">Country</option>
            <option value="area">Total Area</option>
            <option value="startYear">Start Year</option>
            <option value="status">Status</option>
            <option value="projectState">Project State</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="additional-filters">
          <label>Country:</label>
          <select name="country" value={filters.country} onChange={handleFilterChange}>
            <option value="">All</option>
            {[...new Set(caseStudies.map(study => study.country))].map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <label>Status:</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Implemented">Implemented</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
          <label>Project State:</label>
          <select name="projectState" value={filters.projectState} onChange={handleFilterChange}>
            <option value="">All</option>
            {[...new Set(caseStudies.map(study => study['Project State']))].map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="shortlist-filter">
          <label>Short List Only:</label>
          <input
            type="checkbox"
            checked={shortListFilter}
            onChange={(e) => setShortListFilter(e.target.checked)}
          />
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="case-studies-grid">
        {paginatedCaseStudies.map((study) => (
          <div className="case-study-card" key={study.id}>
            <Link to={`/case-studies/${study.id}`}>
              <div className="card-header">
                {study.shortList === 'Yes' && <span className="shortlist-tag">Short Listed</span>}
              </div>
              <h3>{study.name}</h3>
              <img
                src={study.imagePath || defaultImage}
                alt={study.name}
                className="thumbnail-image"
              />
              <div className="card-body">
                <p><strong>Country:</strong> {study.country || 'N/A'}</p>
                <p><strong>City:</strong> {study.location || 'N/A'}</p>
                <p><strong>Total Area:</strong> {study['Total Area (km2)'] || 'N/A'} km²</p>
                <p><strong>Start Year:</strong> {study['Start Year'] || 'N/A'}</p>
                <p style={{ color: study.Status === 'Implemented' ? 'green' : study.Status === 'In Progress' ? 'orange' : 'red' }}>
                  <strong>Status:</strong> {study.Status || 'N/A'}
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