// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; // Ensure this is imported
import store from './redux/store';
import './App.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/login';
import Signup from './components/auth/signup'; // Import the Signup component
import TaskList from './components/tasks/TaskList';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} /> {/* New Signup Route */}
              <Route 
                path="/tasks" 
                element={
                  <ProtectedRoute>
                    <TaskList />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/tasks" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;