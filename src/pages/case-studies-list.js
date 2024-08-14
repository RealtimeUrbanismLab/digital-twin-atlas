import React, { useState } from 'react';
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

const CaseStudiesList = () => {
  const [sortOption, setSortOption] = useState('alphabetical');
  const [sortOrder, setSortOrder] = useState('asc');
  const [shortListFilter, setShortListFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sortedCaseStudies = [...caseStudies]
    .filter(study =>
      (shortListFilter ? study.shortList === 'Yes' : true) &&
      (searchQuery === '' || study.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
        default:
          return 0;
      }
    });

  // Data for Charts
  const countryData = {
    labels: [...new Set(caseStudies.map(study => study.country))],
    datasets: [
      {
        label: 'Number of Projects by Country',
        data: [...new Set(caseStudies.map(study => study.country))].map(country =>
          caseStudies.filter(study => study.country === country).length
        ),
        backgroundColor: 'rgba(30, 144, 255, 0.7)',
        borderColor: 'rgba(30, 144, 255, 1)',
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
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
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
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
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
        {sortedCaseStudies.map((study) => (
          <div className="case-study-card" key={study.id}>
            <Link to={`/case-studies/${study.id}`}>
              <div className="card-header">
                {study.shortList === 'Yes' && <span className="shortlist-tag">Short Listed</span>}
              </div>
              <h3>{study.name}</h3>
              {study.imagePath && <img src={study.imagePath} alt={study.name} className="thumbnail-image" />}
              <div className="card-body">
                <p><strong>Country:</strong> {study.country}</p>
                <p><strong>City:</strong> {study.location}</p>
                <p><strong>Total Area:</strong> {study['Total Area (km2)']} km²</p>
                <p><strong>Start Year:</strong> {study['Start Year']}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesList;
