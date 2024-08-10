// gatsby-node.js

const path = require('path');
const caseStudies = require('./src/data/caseStudies.js'); // Import the data

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  caseStudies.forEach(study => {
    createPage({
      path: `/case-studies/${study.id}`,
      component: path.resolve('./src/templates/case-study.js'),
      context: { study }, // Pass the study object to the template
    });    
  });
};
