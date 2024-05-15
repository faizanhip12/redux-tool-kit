import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Customer from './pages/Customer/index';
import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard/index'

function App() {
  return (
    <BrowserRouter>
      <Dashboard /> {/* Render the Dashboard component */}
      <Routes>
        <Route path="/inbox" element={<Customer />} /> {/* Define route for Inbox */}
        {/* <Route path="/starred" element={<Starred />} /> Define route for Starred */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
