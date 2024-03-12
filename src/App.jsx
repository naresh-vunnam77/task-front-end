import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import Home from './pages/Home';
import CompletedTasks from './pages/CompletedTasks';

function App() {
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null;

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={ isAuthenticated ? <Navigate to="/" /> : <LoginForm /> }
          />
          <Route
            path="/signup"
            element={ isAuthenticated ? <Navigate to="/" /> : <SignUpForm /> }
          />
          <Route
            path="/"
            element={ isAuthenticated ? <Home /> : <Navigate to="/login" /> }
          />
          <Route
            path="/completed-tasks"
            element={ isAuthenticated ? <CompletedTasks /> : <Navigate to="/login" /> }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
