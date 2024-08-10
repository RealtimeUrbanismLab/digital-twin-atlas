import React, { useState } from 'react';
import { Link } from 'gatsby';
import HamburgerMenu from '../components/HamburgerMenu'; // Import HamburgerMenu
import caseStudies from '../data/caseStudies';

const CaseStudiesList = () => {
  const [sortOption, setSortOption] = useState('alphabetical'); // Default sort option

  const sortedCaseStudies = [...caseStudies].sort((a, b) => {
    switch (sortOption) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'city':
        return a.location.localeCompare(b.location);
      case 'country':
        return a.country.localeCompare(b.country);
      case 'shortList':
        return a.shortList === b.shortList ? 0 : a.shortList === 'Yes' ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <HamburgerMenu /> {/* Add the HamburgerMenu */}
      <h1>Case Studies</h1>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
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
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#f4f4f9')}
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="city">City</option>
          <option value="country">Country</option>
          <option value="shortList">Short List</option>
        </select>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {sortedCaseStudies.map((study) => (
          <li
            key={study.id}
            style={{
              background: '#f9f9f9',
              marginBottom: '10px',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Link
              to={`/case-studies/${study.id}`}
              style={{ textDecoration: 'none', color: '#333' }}
            >
              <h3>{study.name}</h3>
              <p>{study.location}, {study.country}</p>
              {study.shortList === 'Yes' && <span style={{ color: 'green' }}>Short Listed</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseStudiesList;
