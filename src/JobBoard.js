// JobBoard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
];

function JobBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(companies[0].token);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
                  {job.metadata?.find((meta) => meta.name === 'Workplace Type')?.value || 'N/A'}
                </p>
                  <button
                  className="job-link"
                  onClick={() => {
                    window.open(job.absolute_url, '_blank');

                    navigate('/home', {
                      state: {
                        autofillInternship: {
                          company: job.company_name || selectedCompany,
                          role: job.title,
                          status: 'Applied',
                          deadline: ''
                        }
                      }
                    });
                  }}
                >
                  View & Apply
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JobBoard;
