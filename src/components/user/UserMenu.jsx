import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faUser, faClipboardList, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const UserMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('You have been successfully logged out.', {
        position: "top-right",
        autoClose: 1500
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  const menuItems = [
    { icon: faHome, label: 'Home', path: '/home' },
    { icon: faCalendarAlt, label: 'Events', path: '/my-events' },
    { icon: faClipboardList, label: 'Take test', path: '/test' },
    { icon: faUser, label: 'Profile', path: '/profile' },
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @media (max-width: 768px) {
            .mobile-toggle { display: block !important; }
            .sidebar { 
              transform: translateX(${isOpen ? '0' : '-100%'}) !important;
              animation: ${isOpen ? 'slideIn 0.3s ease-out' : 'none'};
              box-shadow: ${isOpen ? '5px 0 15px rgba(0,0,0,0.3)' : 'none'};
            }
            .hamburger-only { display: ${isOpen ? 'none' : 'block'} !important; }
            .close-only { display: ${isOpen ? 'block' : 'none'} !important; }
            .overlay { display: ${isOpen ? 'block' : 'none'} !important; }
            .menu-item {
              padding: 18px 20px !important;
              font-size: 1.1rem !important;
            }
            .menu-header {
              padding: 0 20px !important;
              margin-bottom: 30px !important;
            }
          }
          @media (max-width: 480px) {
            .sidebar { width: 85vw !important; }
            .menu-item { padding: 20px !important; }
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
          padding: '15px',
          background: 'linear-gradient(135deg, #1c1c1a 0%, #161615 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(10, 10, 10, 0.4)',
          transition: 'all 0.3s ease',
          animation: 'bounce 2s infinite'
        }}
        onTouchStart={(e) => {
          e.target.style.transform = 'scale(0.95)';
        }}
        onTouchEnd={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 999,
            display: 'none',
            animation: 'fadeIn 0.3s ease-out'
          }}
        />
      )}

      <div className="sidebar" style={{ 
        width: '280px', 
        background: 'linear-gradient(180deg, #141223 0%, #1a1635 100%)', 
        padding: '0', 
        position: 'fixed', 
        height: '100vh', 
        overflowY: 'auto', 
        zIndex: 1000, 
        transition: 'transform 0.3s ease-out',
        borderRight: '3px solid rgba(255, 215, 0, 0.3)'
      }}>
        <div className="menu-header" style={{ padding: '30px 25px 0 25px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#FFD700', textShadow: '0 0 10px rgba(255, 215, 0, 0.3)' }}>Participant</h1>
            <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '5px', color: '#fff' }}>Dashboard Menu</p>
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="mobile-toggle close-only"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1.3rem',
                cursor: 'pointer',
                padding: '8px 10px',
                transition: 'all 0.3s ease'
              }}
              onTouchStart={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onTouchEnd={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 15px 30px 15px' }}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item.path)}
              className="menu-item"
              style={{
                padding: '16px 20px',
                background: location.pathname === item.path 
                  ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: location.pathname === item.path 
                  ? '2px solid rgba(255, 215, 0, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: location.pathname === item.path ? '#2d3748' : '#fff',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: location.pathname === item.path 
                  ? '0 4px 15px rgba(255, 215, 0, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
                transform: location.pathname === item.path ? 'translateX(5px)' : 'translateX(0)'
              }}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateX(3px)';
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
              onTouchStart={(e) => {
                e.target.style.transform = 'scale(0.98)';
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = location.pathname === item.path ? 'translateX(5px)' : 'translateX(0)';
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={{ fontSize: '1.2rem' }} />
              <span>{item.label}</span>
            </button>
          ))}

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', margin: '20px 0', paddingTop: '20px' }}>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default UserMenu;