// router.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/sections/Hero';
import AboutPage from './components/sections/AboutPage';
import Events from './components/sections/Events';
import LoginPage from './components/sections/Login'; // Changed import from Login to LoginPage
import Dashboard from './components/user/Dashboard';
import AdminDashboard from './components/user/AdminDashboard';
import Playground from './components/games/Playground'; // Import Playground component
import RegistrationChoices from './components/sections/RegistrationChoices';
import IndividualRegistration from './components/sections/IndividualRegistration';
import TeamRegistration from './components/sections/TeamRegistration';
import Schedule from './components/sections/Schedules'; // Import Schedule component
import Coordinators from './components/sections/Coordinators'; // Import Coordinators 
import Location from './components/sections/Location';
import Contact from './components/sections/Contact';

const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<LoginPage />} /> // Changed component from Login to LoginPage
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboardWrapper />} />
      <Route path="/playground" element={<Playground />} /> // Added route for Playground page
      <Route path="/register" element={<RegistrationChoices />} />
      <Route path="/register/:eventId" element={<RegistrationChoices />} />
      <Route path="/register/individual/:eventId" element={<IndividualRegistration />} />
      <Route path="/register/team" element={<TeamRegistration />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path='/coordinators' element={<Coordinators />} />
      <Route path="/location" element={<Location />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='*' element={<Hero />} />
    </Routes>
  </HashRouter>
);

// Wrapper to pass state from navigation to AdminDashboard
function AdminDashboardWrapper() {
  // Just render AdminDashboard, do not require navigation state
  return <AdminDashboard />;
}

export default Router;
