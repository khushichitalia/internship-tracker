import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AddInternshipForm from './components/AddInternshipForm';
import './InternshipTracker.css';
import { db, auth } from './FireBase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

function InternshipTracker() {
  const [internships, setInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: '',
    deadline: ''
  });
  const [hasAutoAdded, setHasAutoAdded] = useState(false);

  const location = useLocation();
  const autofillInternship = location.state?.autofillInternship;

  const fetchInternships = async () => {
    const userID = auth.currentUser?.uid;
    if (!userID) return;

    const internshipsRef = collection(db, 'users', userID, 'internships');
    const snapshot = await getDocs(internshipsRef);

    const internshipsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setInternships(internshipsData);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  useEffect(() => {
    if (!autofillInternship) return;
  
    const key = `${autofillInternship.company}-${autofillInternship.role}`;
  
    // ✅ Immediately mark as added to prevent duplicate trigger
    if (sessionStorage.getItem(key)) {
      console.log('Already added in this session');
      return;
    }
    sessionStorage.setItem(key, 'true');
  
    const addPrefilledInternship = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error('User not logged in');
  
        const userInternshipsRef = collection(db, 'users', userId, 'internships');
  
        // Optional: Double-check from database side
        const snapshot = await getDocs(userInternshipsRef);
        const alreadyExists = snapshot.docs.some((doc) => {
          const data = doc.data();
          return (
            data.company === autofillInternship.company &&
            data.role === autofillInternship.role
          );
        });
  
        if (!alreadyExists) {
          await addDoc(userInternshipsRef, autofillInternship);
          fetchInternships();
          console.log('Auto-added internship:', autofillInternship);
        } else {
          console.log('Firestore already has this internship.');
        }
  
        window.history.replaceState({}, document.title);
      } catch (err) {
        console.error('Error auto-adding internship:', err);
      }
    };
  
    addPrefilledInternship();
  }, [autofillInternship]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not logged in');

      const userInternshipsRef = collection(db, 'users', userId, 'internships');
      await addDoc(userInternshipsRef, formData);

      setFormData({ company: '', role: '', status: '', deadline: '' });
      setShowModal(false);
      fetchInternships();
    } catch (err) {
      console.error('Error adding internship', err);
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
                  <button className="action-btn">Edit</button>
                  <button className="action-btn danger">Delete</button>
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
      </div>
    </div>
  );
}

export default InternshipTracker;
