import React, { useState } from 'react';
import { Link } from 'gatsby';
import HamburgerMenu from '../components/HamburgerMenu';
import caseStudies from '../data/caseStudies';

const CaseStudiesList = () => {
  const [sortOption, setSortOption] = useState('alphabetical'); // Default sort option
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [shortListFilter, setShortListFilter] = useState(false); // Short list filter

  const sortedCaseStudies = [...caseStudies]
    .filter(study => (shortListFilter ? study.shortList === 'Yes' : true))
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

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <HamburgerMenu />
      <h1>Case Studies</h1>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px', fontSize: '1.1rem', color: '#444' }}>Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              backgroundColor: '#f4f4f9',
              color: '#333',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
              marginRight: '10px',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#f4f4f9')}
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="city">City</option>
            <option value="country">Country</option>
            <option value="area">Total Area</option>
            <option value="startYear">Start Year</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              backgroundColor: '#f4f4f9',
              color: '#333',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#f4f4f9')}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label style={{ marginRight: '10px', fontSize: '1.1rem', color: '#444' }}>Short List Only:</label>
          <input
            type="checkbox"
            checked={shortListFilter}
            onChange={(e) => setShortListFilter(e.target.checked)}
            style={{
              transform: 'scale(1.5)',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
        {sortedCaseStudies.map((study) => (
          <li
            key={study.id}
            style={{
              background: '#f9f9f9',
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out',
              width: 'calc(50% - 20px)',
              marginRight: '20px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Link
              to={`/case-studies/${study.id}`}
              style={{ textDecoration: 'none', color: '#333' }}
            >
              {study.shortList === 'Yes' && <span style={{ color: 'green' }}>Short Listed</span>}
              <h3>{study.name}</h3>
              <p><strong>Country:</strong> {study.country}</p>
              <p><strong>City:</strong> {study.location}</p>
              <p><strong>Total Area:</strong> {study['Total Area (km2)']} km²</p>
              <p><strong>Start Year:</strong> {study['Start Year']}</p>
              <p><strong>System Twinned:</strong> {study['System Digital Twinned']}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseStudiesList;
