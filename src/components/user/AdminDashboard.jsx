import React, { useState, useRef, useEffect } from 'react';
import '../../styles/user/AdminDashboard.css';
import AdminEvents from './AdminEvents';
import AdminUsers from './AdminUsers';
import AdminSchedules from './AdminSchedules';
import AdminNotifications from './AdminNotifications';
import AdminProfile from './AdminProfile';
import AdminCoordinators from './AdminCoordinators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faCalendarAlt, faUsers, faUserTie, faBell, faCommentDots, faUserCircle, faSignOutAlt, faBars, faTimes, faClock, faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import TrishnaLogo from '../../assets/images/tk26.png';
import config from '../../config';

// Simple Modal Component (can be moved to its own file if preferred)
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`logout-modal-overlay ${isOpen ? 'active' : ''}`}> {/* Added active class toggle */}
      <div className="logout-modal-content">
        <h4>Logout Confirmation</h4>
        <p>Are you sure you want to logout?</p>
        <div className="logout-modal-actions">
          {/* Using sci-fi-button class for consistency if desired, or specific classes */}
          <button onClick={onConfirm} className="sci-fi-button confirm-logout-button">Yes, Logout</button>
          <button onClick={onClose} className="sci-fi-button cancel-logout-button">No, Cancel</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarWidth, setSidebarWidth] = useState(60);
  const [isResizing, setIsResizing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [events, setEvents] = useState([]);
  const [registrationStats, setRegistrationStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    if (!adminToken) {
      navigate('/login');
    } else {
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const adminToken = localStorage.getItem('admintoken');
      
      // Fetch events
      const eventsResponse = await fetch(`${config.BASE_URL}/api/events`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
        
        // Fetch registration stats for each event
        const stats = {};
        let totalRegistrations = 0;
        
        for (const event of eventsData) {
          try {
            const regResponse = await fetch(`${config.BASE_URL}/api/events/${event._id}/registrations`, {
              headers: { 'Authorization': `Bearer ${adminToken}` }
            });
            
            if (regResponse.ok) {
              const regData = await regResponse.json();
              const count = Array.isArray(regData) ? regData.length : regData.count || 0;
              stats[event._id] = count;
              totalRegistrations += count;
            } else {
              stats[event._id] = 0;
            }
          } catch (err) {
            stats[event._id] = 0;
          }
        }
        
        stats.total = totalRegistrations;
        setRegistrationStats(stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavClick = (page, event) => {
    event.preventDefault();
    setActivePage(page);
  };

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing && sidebarRef.current) {
        let newWidth = mouseMoveEvent.clientX;
        if (newWidth > 180 && newWidth < 500) { // Min 180px, Max 500px
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const handleLogoutRequest = () => {
    setShowLogoutModal(true); // Show the modal
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('admintoken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newCollapsedState);
    if (newCollapsedState) {
      // Collapsing
      setSidebarWidth(60);
    } else {
      // Expanding
      setSidebarWidth(250); // Set to default expanded width
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'events':
        return <AdminEvents />;
      case 'users':
        return <AdminUsers />;
      case 'schedules':
        return <AdminSchedules />;
      case 'notifications':
        return <AdminNotifications />;
      case 'profile':
        return <AdminProfile />;
      case 'coordinators':
        return <AdminCoordinators />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-welcome">
            {/* <h2>Admin Dashboard Overview</h2> */}
            <h2>Event Registration Statistics</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {/* Total Card - First Position */}
              <div style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 32px rgba(255,215,0,0.3)', border: '2px solid rgba(255,215,0,0.5)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }}></div>
                <h3 style={{ color: '#2d3748', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>🏆 Total Registrations</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
                  {registrationStats.total || 0}
                </div>
                <p style={{ color: '#2d3748', margin: 0, fontWeight: '600' }}>
                  All Events Combined
                </p>
              </div>
              
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#666', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#666', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#666', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#666', borderRadius: '50%' }}></div>
                    <h3 style={{ color: '#666', marginBottom: '15px', fontSize: '1.2rem' }}>Loading...</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>...</div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Registrations</p>
                  </div>
                ))
              ) : (
                events.map((event, index) => {
                  const colors = ['#00eaff', '#ff6b35', '#667eea', '#f093fb', '#48bb78'];
                  const icons = ['🎯', '🎨', '🤖', '🎤', '⚡'];
                  const color = colors[index % colors.length];
                  const icon = icons[index % icons.length];
                  const registrationCount = registrationStats[event._id] || 0;
                  
                  return (
                    <div key={event._id} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: color, borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: color, borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: color, borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: color, borderRadius: '50%' }}></div>
                      <h3 style={{ color: color, marginBottom: '15px', fontSize: '1.2rem' }}>{icon} {event.name}</h3>
                      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>{registrationCount}</div>
                      <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Registrations</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`admin-dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div
        ref={sidebarRef}
        className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
        style={{ width: `${isSidebarCollapsed ? 60 : sidebarWidth}px` }}
      >
        <div className="admin-sidebar-header">
          <button onClick={toggleSidebar} className="sidebar-toggle-button">
            <FontAwesomeIcon icon={isSidebarCollapsed ? faBars : faTimes} />
          </button>
        </div>
        <nav className="admin-nav">
          <ul>
            <li>
              <a href="#" onClick={(e) => handleNavClick('dashboard', e)} className={activePage === 'dashboard' ? 'active' : ''}>
                <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" /> <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('events', e)} className={activePage === 'events' ? 'active' : ''}>
                <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" /> <span className="nav-text">Events</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('users', e)} className={activePage === 'users' ? 'active' : ''}>
                <FontAwesomeIcon icon={faUsers} className="nav-icon" /> <span className="nav-text">Users</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('schedules', e)} className={activePage === 'schedules' ? 'active' : ''}>
                <FontAwesomeIcon icon={faClock} className="nav-icon" /> <span className="nav-text">Schedules</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('notifications', e)} className={activePage === 'notifications' ? 'active' : ''}>
                <FontAwesomeIcon icon={faBell} className="nav-icon" /> <span className="nav-text">Notifications</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('coordinators', e)} className={activePage === 'coordinators' ? 'active' : ''}>
                <FontAwesomeIcon icon={faUserTie} className="nav-icon" /> <span className="nav-text">Coordinators</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => navigate('/admin/winners')} className="">
                <FontAwesomeIcon icon={faTrophy} className="nav-icon" /> <span className="nav-text">Winners Data</span>
              </a>
            </li>
            
          </ul>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogoutRequest} className="sidebar-logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> <span className="nav-text">Logout</span>
          </button>
        </div>
            
        {!isSidebarCollapsed && (
          <div
            className="sidebar-resizer"
            onMouseDown={startResizing} // Attach onMouseDown to the resizer element
          />
        )}
        
        
               
      </div>

      <div className="admin-main-content" style={{ marginLeft: `${isSidebarCollapsed ? 60 : sidebarWidth}px` }}>
        <header className="admin-header">
          <div className="header-logo">
            <img src={TrishnaLogo} alt="Trishna Logo" /> 
          </div>
          <div className="header-title">
            <span>Admin Panel</span>
          </div>
          <div className="header-icons">
            <button className="icon-button" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className="icon-button" aria-label="Chat">
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
            <button className="icon-button" aria-label="Admin Profile" onClick={(e) => { e.preventDefault(); setActivePage('profile'); }}>
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
            
          </div>

        </header>
        <div className="admin-content-area">
          {renderContent()}
        </div>
        <footer className="admin-footer">
          <p>&copy; {new Date().getFullYear()} TRISHNA 2K25. All rights reserved.</p>
          
        </footer>
      </div>
      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default AdminDashboard;
