import React from 'react';
import '../InternshipTracker.css';

function AddInternshipForm({ formData, onChange, onSubmit, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Internship</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={onChange}
            required
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={onChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInternshipForm;
