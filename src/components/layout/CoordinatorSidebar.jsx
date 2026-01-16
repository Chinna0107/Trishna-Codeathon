import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClock, faCertificate, faUserCircle, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const CoordinatorSidebar = ({ activePage, onNavClick, onLogout }) => {
  return (
    <div style={{
      width: '250px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Coordinator</h1>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: '5px 0 0 0' }}>Dashboard</p>
      </div>

      <nav style={{ flex: 1, padding: '20px 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <button
              onClick={() => onNavClick('home')}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: activePage === 'home' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
              onClick={() => onNavClick('events')}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: activePage === 'events' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
              onClick={() => onNavClick('schedules')}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: activePage === 'schedules' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
              onClick={() => onNavClick('certifications')}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: activePage === 'certifications' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
              onClick={() => onNavClick('profile')}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: activePage === 'profile' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
          onClick={() => onNavClick('settings')}
          style={{
            width: '100%',
            padding: '15px 20px',
            background: activePage === 'settings' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
          onClick={onLogout}
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
  );
};

export default CoordinatorSidebar;
