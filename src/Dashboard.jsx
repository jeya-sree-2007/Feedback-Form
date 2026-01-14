import React, { useState, useEffect } from 'react';
import './styles/App.css'; // Updated path
import { db } from './config/firebase'; // Updated path
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore';

function Dashboard() { 
  // --- STATE MANAGEMENT ---
  const [reviews, setReviews] = useState([]); // List of user's reviews
  const [stats, setStats] = useState({ avg: "0.0", count: 0 }); // Global stats
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 0 });
  const [editId, setEditId] = useState(null); // ID of item being edited
  const [userUid, setUserUid] = useState(''); // Unique Device ID

  // Modals
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // --- 1. INITIAL SETUP (Device ID & Particles) ---
  useEffect(() => {
    // A. Handle Device ID
    let storedUid = localStorage.getItem("user_device_id");
    if (!storedUid) {
      storedUid = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
      localStorage.setItem("user_device_id", storedUid);
    }
    setUserUid(storedUid);

    // B. Initialize Particles (using window object because it's from CDN)
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        "particles": { "number": { "value": 80 }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3 }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 2 } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "repulse": { "distance": 100, "duration": 0.4 } } }, "retina_detect": true
      });
    }
  }, []);

  // --- 2. LISTENERS (Read Data) ---
  useEffect(() => {
    if (!userUid) return;

    const collectionRef = collection(db, 'reviews');

    // A. PRIVATE LISTENER: Only fetch current user's reviews for the list
    const q = query(collectionRef, where("uid", "==", userUid));
    const unsubscribeList = onSnapshot(q, (snapshot) => {
      const userReviews = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      // Sort by date (newest first)
      userReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      setReviews(userReviews);
    });

    // B. PUBLIC STATS LISTENER: Fetch ALL reviews for average
    const unsubscribeStats = onSnapshot(collectionRef, (snapshot) => {
      let total = 0;
      let count = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.rating) {
          total += data.rating;
          count++;
        }
      });
      const avg = count > 0 ? (total / count).toFixed(1) : "0.0";
      setStats({ avg, count });
    });

    return () => {
      unsubscribeList();
      unsubscribeStats();
    };
  }, [userUid]);

  // --- 3. HELPER FUNCTIONS ---
  
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Capitalize first letter logic
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setFormData(prev => ({ ...prev, [name]: capitalized }));
  };

  // Handle Rating Click
  const handleRatingChange = (val) => {
    setFormData(prev => ({ ...prev, rating: parseInt(val) }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) return alert("Please select a star rating!");

    try {
      if (editId) {
        // Update
        const docRef = doc(db, 'reviews', editId);
        await updateDoc(docRef, {
          name: formData.name,
          rating: formData.rating,
          comment: formData.comment
        });
        setSuccessMsg("Feedback Updated!");
      } else {
        // Create
        await addDoc(collection(db, 'reviews'), {
          name: formData.name,
          rating: formData.rating,
          comment: formData.comment,
          date: new Date().toISOString(),
          uid: userUid
        });
        setFormData({ name: '', comment: '', rating: 0 });
        setSuccessMsg("Feedback Submitted!");
      }
      
      // Reset
      setFormData({ name: '', comment: '', rating: 0 });
      setEditId(null);
      setShowSuccess(true);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Start Editing
  const handleEdit = (item) => {
    setFormData({ name: item.name, comment: item.comment, rating: item.rating });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Flow
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const executeDelete = async () => {
    if (deleteId) {
      await deleteDoc(doc(db, 'reviews', deleteId));
      if (editId === deleteId) {
        setFormData({ name: '', comment: '', rating: 0 });
        setEditId(null);
      }
      setShowDelete(false);
      setDeleteId(null);
    }
  };

  // Render Stars Helper
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`${i <= rating ? 'fas' : 'far'} fa-star`} style={i <= rating ? {color: '#fbbf24'} : {}}></i>
      );
    }
    return stars;
  };

  // Render Average Stars Helper
  const renderAvgStars = () => {
    const avgNum = parseFloat(stats.avg);
    const fullStars = Math.floor(avgNum);
    const stars = [];
    for(let i=0; i<fullStars; i++) stars.push(<i key={`full-${i}`} className="fas fa-star" style={{color:'#fbbf24'}}></i>);
    if(avgNum % 1 >= 0.5) stars.push(<i key="half" className="fas fa-star-half-alt" style={{color:'#fbbf24'}}></i>);
    return stars;
  };

  return (
    <div className="App">
      <div id="particles-js"></div>

      <div className="container">
        
        <header>
          <div className="logo">
            <i className="fas fa-comments"></i> Feedback<span>Hub</span>
          </div>
        </header>

        {/* STATS DISPLAY */}
        <div className="stats-container">
          <div className="stats-card">
            <span className="big-rating">{stats.avg}</span>
            <div className="stars-display">
              {renderAvgStars()}
            </div>
            <p>Average Rating</p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="glass-panel form-section">
          <h2>{editId ? "Edit Feedback" : "Submit Feedback"}</h2>
          <form onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label htmlFor="user-name">Your Name</label>
              <input 
                type="text" 
                id="user-name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="Enter your full name" 
              />
            </div>

            <div className="rating-group">
              <label>Rating</label>
              <div className="star-rating">
                {[5, 4, 3, 2, 1].map((num) => (
                  <React.Fragment key={num}>
                    <input 
                      type="radio" 
                      name="rating" 
                      id={`star${num}`} 
                      value={num}
                      checked={formData.rating === num}
                      onChange={() => handleRatingChange(num)}
                    />
                    <label htmlFor={`star${num}`} className="fas fa-star"></label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="user-comment">Your Experience</label>
              <textarea 
                id="user-comment" 
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required 
                placeholder="Write your feedback here..."
              ></textarea>
            </div>

            <button type="submit" id="submit-btn">
              {editId ? "Update Feedback" : "Post Feedback"} <i className={`fas ${editId ? 'fa-sync-alt' : 'fa-paper-plane'}`}></i>
            </button>
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="list-section">
          <div id="feedback-list" className="feedback-grid">
            {reviews.length === 0 ? (
              <p style={{textAlign:'center', color:'rgba(255,255,255,0.5)'}}>You haven't submitted any feedback yet.</p>
            ) : (
              reviews.map(item => (
                <div className="feedback-card" key={item.id}>
                  <div className="feedback-header">
                    <div className="user-info">
                      <h4>{item.name}</h4>
                      <span style={{fontSize:'0.8rem', color:'#94a3b8'}}>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="feedback-actions">
                      <i className="fas fa-edit" onClick={() => handleEdit(item)}></i>
                      <i className="fas fa-trash" onClick={() => confirmDelete(item.id)}></i>
                    </div>
                  </div>
                  <div className="stars">
                    {renderStars(item.rating)}
                  </div>
                  <p style={{marginTop:'10px', color:'#e2e8f0'}}>{item.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* SUCCESS MODAL */}
      <div id="success-modal" className={`modal-overlay ${showSuccess ? '' : 'hidden'}`}>
        <div className="modal-content glass-panel">
          <div className="icon-box"><i className="fas fa-check"></i></div>
          <h3>Success!</h3>
          <p>{successMsg}</p>
          <button onClick={() => setShowSuccess(false)} className="modal-btn">Awesome</button>
        </div>
      </div>

      {/* DELETE MODAL */}
      <div id="delete-modal" className={`modal-overlay ${showDelete ? '' : 'hidden'}`}>
        <div className="modal-content glass-panel">
          <div className="icon-box" style={{background: '#ff7675', boxShadow: '0 0 15px rgba(255, 118, 117, 0.5)'}}>
            <i className="fas fa-trash-alt"></i>
          </div>
          <h3>Are you sure?</h3>
          <p>Do you really want to delete this review? This process cannot be undone.</p>
          
          <div className="modal-actions">
            <button onClick={() => setShowDelete(false)} className="btn-cancel">Cancel</button>
            <button onClick={executeDelete} className="btn-confirm-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;