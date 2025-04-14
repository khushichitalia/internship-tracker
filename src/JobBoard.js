import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './JobBoard.css';

const companies = [
  { name: 'Airbnb', token: 'airbnb' },
  { name: 'Dropbox', token: 'dropbox' },
  { name: 'Cloudflare', token: 'cloudflare' },
  { name: 'Postman', token: 'getpostman' },
  { name: 'GitLab', token: 'gitlab' },
  { name: 'Duolingo', token: 'duolingo' },
  { name: 'Asana', token: 'asana' },
  { name: 'Affirm', token: 'affirm' },
  { name: 'Algolia', token: 'algolia' },
  { name: 'Robinhood', token: 'robinhood' },
  { name: 'Doordash', token: 'doordash' },
  { name: 'Discord', token: 'discord' },
  { name: 'Coupang', token: 'coupang' },
  { name: 'Plaid', token: 'plaid' },
  { name: 'Blend', token: 'blend' },
  { name: 'Betterment', token: 'betterment' },
  { name: 'Benchling', token: 'benchling' },
  { name: 'Grammarly', token: 'grammarly' },
  { name: 'Notion', token: 'notion' },
  { name: 'Gusto', token: 'gusto' },
  { name: 'Oscar Health', token: 'oscar' },
  { name: 'Lyft', token: 'lyft' },
  { name: 'Everlaw', token: 'everlaw' },
  { name: 'Redfin', token: 'redfin' },
  { name: 'Wealthfront', token: 'wealthfront' },
  { name: 'Turo', token: 'turo' },
  { name: 'TrueLayer', token: 'truelayer' },
  { name: 'Checkr', token: 'checkr' },
  { name: 'Nuro', token: 'nuro' },
  { name: 'Instabase', token: 'instabase' }
];

function JobBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(companies[0].token);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = (token) => {
    setLoading(true);
    fetch(`https://boards-api.greenhouse.io/v1/boards/${token}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setJobs([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs(selectedCompany);
  }, [selectedCompany]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobboard-page">
      <Navbar />
      <div className="jobboard-container">
        <h2 className="jobboard-title">Browse Internships by Company</h2>

        <div className="dropdown-container">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            onChange={(e) => setSelectedCompany(e.target.value)}
            value={selectedCompany}
          >
            {filteredCompanies.map((company) => (
              <option key={company.token} value={company.token}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="loading-text">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="loading-text">No jobs found.</p>
        ) : (
          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job.id} className="job-item">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-location">{job.location?.name}</p>
                <p className="job-type">
                  {
                    job.metadata?.find(
                      (meta) => meta.name === 'Workplace Type'
                    )?.value || 'N/A'
                  }
                </p>
                <a
                  href={job.absolute_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="job-link"
                >
                  View & Apply
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JobBoard;
