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
      <div style={{ marginLeft: '280px', flex: 1, padding: '40px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }} className="dashboard-wrapper">
        <style>
          {`
            @media (max-width: 768px) {
              .dashboard-wrapper { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
            }
          `}
        </style>
        
        <h2 style={{ fontSize: '2.5rem', color: '#2d3748', marginBottom: '10px', fontWeight: 'bold' }}>My Events 📅</h2>
        <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '30px' }}>
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
                background: '#fff', 
                padding: '25px', 
                borderRadius: '15px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '3px solid #FFD700',
                position: 'relative',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ 
                  position: 'absolute',
                  top: '-12px',
                  left: '20px',
                  background: '#FFD700',
                  color: '#2d3748',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {idx + 1}
                </div>
                
                <div style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#2d3748', marginBottom: '10px', fontWeight: 'bold' }}>
                    {event.eventName || event.event_name || 'Event'}
                  </h3>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{ 
                      background: '#e2e8f0', 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem', 
                      color: '#4a5568',
                      fontWeight: '500'
                    }}>
                      📂 {event.category || 'General'}
                    </span>
                  </div>

                  {event.teamName && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ color: '#4a5568' }}>Team:</strong> {event.teamName}
                    </div>
                  )}

                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: '#4a5568' }}>Registration Type:</strong> {event.teamName ? 'Team' : 'Individual'}
                  </div>

                  {event.registrationDate && (
                    <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#718096' }}>
                      Registered on: {new Date(event.registrationDate).toLocaleDateString()}
                    </div>
                  )}

                  <div style={{ 
                    background: '#f0fff4', 
                    padding: '10px', 
                    borderRadius: '8px', 
                    border: '1px solid #9ae6b4',
                    textAlign: 'center'
                  }}>
                    <span style={{ color: '#22543d', fontWeight: 'bold', fontSize: '0.9rem' }}>
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
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', color: '#2d3748', marginBottom: '15px', fontWeight: 'bold' }}>
              No Events Registered Yet
            </h3>
            <p style={{ color: '#718096', marginBottom: '30px', fontSize: '1rem' }}>
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