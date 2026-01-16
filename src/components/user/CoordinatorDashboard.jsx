import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faCalendarAlt, faClock, faCertificate, faUserCircle, faCog, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const CoordinatorDashboard = () => {
  const [activePage, setActivePage] = useState('home');
  const [coordinator, setCoordinator] = useState(null);
  const [assignedEvents, setAssignedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    const coordinatorData = localStorage.getItem('coordinator');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    
    if (coordinatorData) {
      setCoordinator(JSON.parse(coordinatorData));
      fetchAssignedEvents(coordinatorToken);
    }
  }, [navigate]);

  const fetchAssignedEvents = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/coordinators/my-event`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        const events = [];
        
        if (data.event1) {
          events.push({ name: data.event1, category: data.category1 });
        }
        if (data.event2) {
          events.push({ name: data.event2, category: data.category2 });
        }
        
        setAssignedEvents(events);
      }
    } catch (err) {
      console.error('Error fetching assigned events:', err);
    }
  };

  const handleNavClick = (page) => {
    setActivePage(page);
  };

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

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div style={{ padding: '40px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#2d3748', marginBottom: '10px', fontWeight: 'bold' }}>Welcome Back! 👋</h2>
            <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '40px' }}>Hello {coordinator?.name}, manage your event efficiently</p>
            
            {/* Cards Container - Side by Side */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              
              {/* Assigned Events Cards */}
              {assignedEvents.map((event, idx) => (
                <div key={idx} style={{ 
                  background: idx === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
                  padding: '40px', 
                  borderRadius: '20px', 
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)', 
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                  <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ fontSize: '3rem', marginRight: '15px' }}>{idx === 0 ? '🎯' : '🌟'}</div>
                      <h3 style={{ fontSize: '1.5rem', color: '#fff', margin: 0, fontWeight: 'bold' }}>Event {idx + 1}</h3>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '25px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
                      <h4 style={{ fontSize: '1.6rem', marginBottom: '10px', color: '#fff', fontWeight: 'bold' }}>{event.name}</h4>
                      <p style={{ opacity: 0.95, fontSize: '1.1rem', margin: 0, color: '#fff' }}>📂 {event.category}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* ID Card */}
              <div style={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
                padding: '40px', 
                borderRadius: '20px', 
                boxShadow: '0 20px 60px rgba(240, 147, 251, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                    <div style={{ fontSize: '3rem', marginRight: '15px' }}>🆔</div>
                    <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: 0, fontWeight: 'bold' }}>ID Card</h3>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.25)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)', 
                        color: '#f5576c', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '2rem', 
                        fontWeight: 'bold', 
                        marginRight: '20px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                      }}>
                        {coordinator?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.5rem', margin: 0, color: '#fff', fontWeight: 'bold' }}>{coordinator?.name}</h4>
                        <p style={{ margin: '5px 0 0 0', fontSize: '1rem', color: '#fff', opacity: 0.95 }}>🎯 Event Coordinator</p>
                      </div>
                    </div>
                    
                    <div style={{ borderTop: '2px solid rgba(255,255,255,0.3)', paddingTop: '20px', marginBottom: '20px' }}>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff', opacity: 0.8 }}>📧 Email</p>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.95rem', color: '#fff', fontWeight: '600' }}>{coordinator?.email}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff', opacity: 0.8 }}>📱 Mobile</p>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.95rem', color: '#fff', fontWeight: '600' }}>{coordinator?.mobile}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff', opacity: 0.8 }}>🔖 ID</p>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.95rem', color: '#fff', fontWeight: '600' }}>COORD-{coordinator?.id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => navigate('/coordinator/profile')}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'rgba(255,255,255,0.3)',
                          border: '2px solid rgba(255,255,255,0.5)',
                          borderRadius: '10px',
                          color: '#fff',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.4)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                      >
                        👁️ View
                      </button>
                      <button
                        onClick={() => alert('Download ID Card')}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'rgba(255,255,255,0.9)',
                          border: 'none',
                          borderRadius: '10px',
                          color: '#f5576c',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#fff'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.9)'}
                      >
                        ⬇️ Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'events':
        navigate('/coordinator/events');
        return null;
      case 'schedules':
        navigate('/coordinator/schedules');
        return null;
      case 'certifications':
        navigate('/coordinator/certifications');
        return null;
      case 'profile':
        navigate('/coordinator/profile');
        return null;
      case 'settings':
        return (
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: '#2d3748', marginBottom: '20px' }}>Settings</h2>
            <p style={{ color: '#718096' }}>Manage your account settings.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!coordinator) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7fafc' }}>
      {/* Left Sidebar */}
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
                onClick={() => handleNavClick('home')}
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
                onClick={() => handleNavClick('events')}
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
                onClick={() => handleNavClick('schedules')}
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
                onClick={() => handleNavClick('certifications')}
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
                onClick={() => handleNavClick('profile')}
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
            onClick={() => handleNavClick('settings')}
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
            onClick={handleLogout}
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
      <div style={{ flex: 1, background: '#f7fafc' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
