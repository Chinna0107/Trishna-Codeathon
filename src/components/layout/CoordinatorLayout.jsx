import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faCalendarAlt, faClock, faCertificate, faUserCircle, faCog, faSignOutAlt, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

const CoordinatorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('coordinatortoken');
    localStorage.removeItem('coordinator');
    navigate('/coordinator-login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Mobile Header */}
      <div style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 1001,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }} className="mobile-header">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
        </button>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0 15px' }}>Coordinator</h1>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            display: 'none'
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(0)',
        transition: 'transform 0.3s ease'
      }} className="sidebar">
        <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Coordinator</h1>
          {isActive('/coordinator/dashboard') && (
            <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: '5px 0 0 0' }}>Dashboard</p>
          )}
        </div>

        <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <button
                onClick={() => {
                  navigate('/coordinator/dashboard');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  background: isActive('/coordinator/dashboard') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  fontSize: '1rem',
                  transition: 'background 0.3s'
                }}
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate('/coordinator/events');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  background: isActive('/coordinator/events') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  fontSize: '1rem',
                  transition: 'background 0.3s'
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate('/coordinator/schedules');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  background: isActive('/coordinator/schedules') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  fontSize: '1rem',
                  transition: 'background 0.3s'
                }}
              >
                <FontAwesomeIcon icon={faClock} />
                <span>Schedules</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate('/coordinator/certifications');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  background: isActive('/coordinator/certifications') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  fontSize: '1rem',
                  transition: 'background 0.3s'
                }}
              >
                <FontAwesomeIcon icon={faCertificate} />
                <span>Certifications</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate('/coordinator/profile');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  background: isActive('/coordinator/profile') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  fontSize: '1rem',
                  transition: 'background 0.3s'
                }}
              >
                <FontAwesomeIcon icon={faUserCircle} />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0' }}>
          <button
            onClick={() => {
              navigate('/coordinator/settings');
              setSidebarOpen(false);
            }}
            style={{
              width: '100%',
              padding: '15px 20px',
              background: isActive('/coordinator/settings') ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: 'none',
              color: '#fff',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              fontSize: '1rem',
              transition: 'background 0.3s'
            }}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </button>
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            style={{
              width: '100%',
              padding: '15px 20px',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              fontSize: '1rem',
              transition: 'background 0.3s'
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '250px', flex: 1, minHeight: '100vh' }} className="main-content">
        {children}
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .mobile-header {
              display: flex !important;
            }
            .sidebar {
              transform: ${sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
            }
            .sidebar-overlay {
              display: block !important;
            }
            .main-content {
              margin-left: 0 !important;
              padding-top: 60px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CoordinatorLayout;
