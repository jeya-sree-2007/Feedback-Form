// src/Login.jsx
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Added for navigation
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import confetti from 'canvas-confetti';
import { auth } from './config/firebase'; // Adjust path if needed (e.g. '../config/firebase')
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; // <--- Importing the specific CSS

export default function Login() {
  const navigate = useNavigate(); // <--- Hook for navigation
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [displayUser, setDisplayUser] = useState("User");

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? null : "Invalid email format";
  };

  const validatePassword = (pw) => {
    if (pw.length < 8) return "Password must be 8+ chars";
    if (!/[A-Z]/.test(pw)) return "Missing capital letter";
    if (!/[0-9]/.test(pw)) return "Missing number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw)) return "Missing special symbol";
    return null;
  };

  const handleSubmit = async (e) => { // <--- Mark as async
    e.preventDefault();
    
    // Reset errors
    let newErrors = { email: "", password: "" };
    let isValid = true;

    // 1. Basic Validation (Keep this to save API calls)
    const emailErr = validateEmail(email);
    if (emailErr) { newErrors.email = emailErr; isValid = false; }

    const passErr = validatePassword(password);
    if (passErr) { newErrors.password = passErr; isValid = false; }

    setErrors(newErrors);

    if (!isValid) return;

    // 2. REAL FIREBASE LOGIN
    try {
      // This sends the data to Google/Firebase to check
      await signInWithEmailAndPassword(auth, email, password);
      
      // If code reaches here, login was successful!
      const formattedName = name.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
      setDisplayUser(formattedName); // Use the name typed in the box for the welcome message
      triggerSuccess();

    } catch (error) {
      console.error("Login Error:", error.code);
      
      // Handle Firebase Errors
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrors(prev => ({ ...prev, password: "Incorrect Email or Password" }));
        setPassword(""); 
      } else if (error.code === 'auth/too-many-requests') {
        setErrors(prev => ({ ...prev, password: "Too many failed attempts. Try again later." }));
      } else {
        setErrors(prev => ({ ...prev, password: "Login failed. Please try again." }));
      }
    }
  };

  const triggerSuccess = () => {
    setShowModal(true);
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  // Function to handle moving to the next page
  const handleEnterDashboard = () => {
      navigate('/dashboard'); // <--- Redirects to the FeedbackHub
  };

  return (
    <div className="login-body"> {/* Wrapper to apply dark background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2 },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 }
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 1 } },
              push: { particles_nb: 4 }
            }
          },
          retina_detect: true
        }}
        style={{ position: "absolute", zIndex: 1 }}
      />

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input 
              type="text" placeholder="Full Name" autoComplete="off"
              value={name} onChange={(e) => setName(e.target.value)}
              required id="name"
            />
            <span className="bar"></span>
          </div>

          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <i className="fas fa-envelope"></i>
            <input 
              type="email" placeholder="Email Address" autoComplete="off"
              value={email} onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({...prev, email: ""}));
              }}
              required 
            />
            <span className="bar"></span>
            <p className="error-text">{errors.email}</p>
          </div>

          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <i className="fas fa-lock"></i>
            <input 
              type="password" placeholder="Password" 
              value={password} onChange={(e) => {
                setPassword(e.target.value);
                setErrors(prev => ({...prev, password: ""}));
              }}
              required 
            />
            <span className="bar"></span>
            <p className="error-text">{errors.password}</p>
          </div>

          <button type="submit" id="loginBtn">
            <span>Login</span>
            <div className="liquid"></div>
          </button>
        </form>
      </div>

      <div className={showModal ? "login-modal active" : "login-modal"}>
        <div className="login-modal-content">
          <div className="icon-box">
            <i className="fas fa-check"></i>
          </div>
          <h3>Access Granted!</h3>
          <p>Welcome back, <span>{displayUser}</span>.</p>
          <button className="close-btn" onClick={handleEnterDashboard}>Enter Dashboard</button>
        </div>
      </div>
    </div>
  );
}