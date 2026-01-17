import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import config from '../../config';

const UserEvents = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchRegisteredEvents(JSON.parse(userData));
  }, [navigate]);

  const fetchRegisteredEvents = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.BASE_URL}/api/participants/registrations?email=${userData.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setRegisteredEvents(data.registrations || data || []);
    } catch (err) {
      console.error('Error fetching registered events:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <UserMenu />
      <div style={{ marginLeft: '280px', flex: 1, padding: '40px', background: '#000', minHeight: '100vh' }} className="dashboard-wrapper">
        <style>
          {`
            @media (max-width: 768px) {
              .dashboard-wrapper { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
            }
          `}
        </style>
        
        <h2 style={{ fontSize: '2.5rem', color: '#00eaff', marginBottom: '10px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>My Events 📅</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '30px' }}>
          {loading ? 'Loading your events...' : `You have registered for ${registeredEvents.length} events`}
        </p>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '4px solid #e2e8f0',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>
              {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
          </div>
        ) : registeredEvents.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {registeredEvents.map((event, idx) => (
              <div key={idx} style={{ 
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))', 
                backdropFilter: 'blur(25px)',
                padding: '30px', 
                borderRadius: '20px', 
                boxShadow: '0 12px 40px rgba(0,234,255,0.15), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                border: '1px solid rgba(0,234,255,0.3)',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,234,255,0.25), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,234,255,0.15), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
              }}
              >
                {/* Enhanced corner pins with glow */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #00eaff, #0099cc)', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,234,255,0.8), 0 0 16px rgba(0,234,255,0.4)' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #00eaff, #0099cc)', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,234,255,0.8), 0 0 16px rgba(0,234,255,0.4)' }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #00eaff, #0099cc)', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,234,255,0.8), 0 0 16px rgba(0,234,255,0.4)' }} />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #00eaff, #0099cc)', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,234,255,0.8), 0 0 16px rgba(0,234,255,0.4)' }} />
                <div style={{ 
                  position: 'absolute',
                  top: '15px',
                  left: '20px',
                  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                  color: '#1a202c',
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: '900',
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
                  border: '2px solid #fff',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {idx + 1}
                </div>
                
                <div style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#00eaff', marginBottom: '12px', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,234,255,0.5), 0 2px 4px rgba(0,0,0,0.3)', letterSpacing: '0.5px' }}>
                    {event.eventName || event.event_name || 'Event'}
                  </h3>
                  
                  <div style={{ marginBottom: '15px' }}>
                    {/* <span style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem', 
                      color: 'rgba(255,255,255,0.9)',
                      fontWeight: '500'
                    }}>
                      📂 {event.category || 'General'}
                    </span> */}
                  </div>

                  {event.teamName && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Team:</strong> <span style={{ color: '#00eaff' }}>{event.teamName}</span>
                    </div>
                  )}

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Registration Type:</strong> <span style={{ color: '#00eaff' }}>{event.teamName ? 'Team' : 'Individual'}</span>
                  </div>

                  {event.registrationDate && (
                    <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                      Registered on: {new Date(event.registrationDate).toLocaleDateString()}
                    </div>
                  )}

                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(0,234,255,0.25), rgba(0,234,255,0.1))', 
                    padding: '12px 16px', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(0,234,255,0.5)',
                    textAlign: 'center',
                    boxShadow: '0 4px 16px rgba(0,234,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}>
                    <span style={{ color: '#00eaff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      ✓ Successfully Registered
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '12px', left: '12px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #ff4444, #cc0000)', borderRadius: '50%', boxShadow: '0 0 6px rgba(255,68,68,0.6)' }} />
            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #ff4444, #cc0000)', borderRadius: '50%', boxShadow: '0 0 6px rgba(255,68,68,0.6)' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #ff4444, #cc0000)', borderRadius: '50%', boxShadow: '0 0 6px rgba(255,68,68,0.6)' }} />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '8px', height: '8px', background: 'linear-gradient(45deg, #ff4444, #cc0000)', borderRadius: '50%', boxShadow: '0 0 6px rgba(255,68,68,0.6)' }} />
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', color: '#00eaff', marginBottom: '15px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              No Events Registered Yet
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px', fontSize: '1rem' }}>
              Start your journey by registering for exciting events and competitions!
            </p>
            <button 
              onClick={() => navigate('/events')} 
              style={{ 
                padding: '15px 30px', 
                background: '#667eea', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                fontSize: '1rem', 
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#5a67d8';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#667eea';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🚀 Browse Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEvents;