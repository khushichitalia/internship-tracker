import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './JobBoard.css';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://boards-api.greenhouse.io/v1/boards/airbnb/jobs')
      .then((res) => res.json())
      .then((data) => {
        console.log("Job data:", data); // ✅ See what data we get
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="jobboard-page">
      <Navbar />
      <div className="jobboard-container">
        <h2 className="jobboard-title">Available Internships</h2>
        {loading ? (
          <p className="loading-text">Loading jobs...</p>
        ) : (
          <ul className="job-list">
            {jobs.length === 0 ? (
              <p className="loading-text">No jobs found.</p>
            ) : (
              jobs.map((job) => (
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
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JobBoard;
