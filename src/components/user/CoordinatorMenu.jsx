import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClock, faCertificate, faUserCircle, faCog, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const CoordinatorMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('coordinatortoken');
        localStorage.removeItem('coordinator');
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate('/coordinator-login');
        });
      }
    });
  };

  const menuItems = [
    { icon: faHome, label: 'Home', path: '/coordinator/dashboard' },
    { icon: faCalendarAlt, label: 'Events', path: '/coordinator/events' },
    { icon: faClock, label: 'Schedules', path: '/coordinator/schedules' },
    { icon: faCertificate, label: 'Certifications', path: '/coordinator/certifications' },
    { icon: faUserCircle, label: 'Profile', path: '/coordinator/profile' },
  ];

  const handleNavClick = (path) => {
    setActiveItem(path);
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .mobile-toggle { display: block !important; }
            .sidebar { transform: translateX(${isOpen ? '0' : '-100%'}) !important; }
            .hamburger-only { display: ${isOpen ? 'none' : 'block'} !important; }
            .close-only { display: ${isOpen ? 'block' : 'none'} !important; }
          }
        `}
      </style>
      
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mobile-toggle hamburger-only"
        style={{
          display: 'none',
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 2000,
          padding: '12px',
          background: '#141223',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
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
          className="mobile-toggle"
        />
      )}

      <div className="sidebar" style={{ width: '280px', background: '#141223', padding: '30px 0', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 1000, transition: 'transform 0.3s' }}>
        <div style={{ padding: '0 25px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>Coordinator</h1>
            <p style={{ fontSize: '0.95rem', opacity: 0.7, marginTop: '5px', color: '#fff' }}>Menu</p>
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '5px'
              }}
              className="mobile-toggle close-only"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 15px' }}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item.path)}
              style={{
                padding: '16px 20px',
                background: location.pathname === item.path ? '#FFD700' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: location.pathname === item.path ? '#2d3748' : '#fff',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) e.currentTarget.style.background = 'transparent';
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={{ fontSize: '1.2rem' }} />
              <span>{item.label}</span>
            </button>
          ))}

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', margin: '20px 0', paddingTop: '20px' }}>
            {/* <button
              onClick={() => handleNavClick('/coordinator/settings')}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: location.pathname === '/coordinator/settings' ? '#FFD700' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: location.pathname === '/coordinator/settings' ? '#2d3748' : '#fff',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.2s',
                marginBottom: '8px'
              }}
              onMouseOver={(e) => {
                if (location.pathname !== '/coordinator/settings') e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
              }}
              onMouseOut={(e) => {
                if (location.pathname !== '/coordinator/settings') e.currentTarget.style.background = 'transparent';
              }}
            >
              <FontAwesomeIcon icon={faCog} style={{ fontSize: '1.2rem' }} />
              <span>Settings</span>
            </button> */}

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,0,0,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '1.2rem' }} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default CoordinatorMenu;
