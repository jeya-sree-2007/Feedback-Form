// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Login';
import Dashboard from '../Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login Page (Default) */}
        <Route path="/" element={<Login />} />

        {/* Route for the FeedbackHub */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;