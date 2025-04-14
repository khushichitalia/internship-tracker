import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from './FireBase'; 
import Navbar from './components/Navbar';
import AddInternshipForm from './components/AddInternshipForm'; 
import './InternshipTracker.css';

function InternshipTracker() {
  const [internships, setInternships] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: '',
    deadline: ''
  });
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchInternships = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const internshipsRef = collection(db, 'users', userId, 'internships');
    const snapshot = await getDocs(internshipsRef);
    const internshipsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setInternships(internshipsData);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not logged in");

      const internshipsRef = collection(db, 'users', userId, 'internships');
      await addDoc(internshipsRef, formData);
      setShowModal(false);
      setFormData({ company: '', role: '', status: '', deadline: '' });
      fetchInternships();
    } catch (err) {
      console.error('Error adding internship:', err);
    }
  };

  const handleDelete = async (internshipId) => {
    try {
      const userId = auth.currentUser.uid;
      await deleteDoc(doc(db, 'users', userId, 'internships', internshipId));
      fetchInternships();
    } catch (error) {
      console.error("Error deleting internship:", error);
    }
  };

  const handleEditClick = (internship) => {
    setEditData(internship);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      const internshipRef = doc(db, 'users', userId, 'internships', editData.id);
      await updateDoc(internshipRef, {
        company: editData.company,
        role: editData.role,
        status: editData.status,
        deadline: editData.deadline
      });
      setShowEditModal(false);
      setEditData(null);
      fetchInternships();
    } catch (error) {
      console.error("Error updating internship:", error);
    }
  };

  return (
    <div className="tracker-container">
      <Navbar />

      <div className="content">
        <h2 className="title">Your Internships</h2>
        <table className="internship-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((item) => (
              <tr key={item.id}>
                <td>{item.company}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td>{item.deadline}</td>
                <td>
                  <button className="action-btn" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="action-btn danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <button onClick={() => setShowModal(true)} className="add-internship">
          Add Internship
        </button>

        {showModal && (
          <AddInternshipForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={() => setShowModal(false)}
          />
        )}

        {showEditModal && editData && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Edit Internship</h3>
              <form onSubmit={handleEditSubmit}>
                <input 
                  type="text" 
                  name="company"
                  placeholder="Company" 
                  value={editData.company} 
                  onChange={handleEditChange}
                  required 
                />
                <input 
                  type="text" 
                  name="role" 
                  placeholder="Role" 
                  value={editData.role} 
                  onChange={handleEditChange}
                  required 
                />
                <input 
                  type="text" 
                  name="status" 
                  placeholder="Status" 
                  value={editData.status} 
                  onChange={handleEditChange}
                  required 
                />
                <input 
                  type="date" 
                  name="deadline" 
                  value={editData.deadline} 
                  onChange={handleEditChange}
                  required 
                />
                <div className="modal-buttons">
                  <button type="submit" className="submit-btn">Update</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InternshipTracker;
