import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import UserMenu from '../user/UserMenu';
import config from '../../config';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ totalEvents: 0, myRegistrations: 0 });
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
    fetchStats(JSON.parse(userData));
  }, [navigate]);

  const fetchStats = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const [eventsRes, regsRes] = await Promise.all([
        fetch(`${config.BASE_URL}/api/events`),
        fetch(`${config.BASE_URL}/api/participants/registrations?email=${userData.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      const events = await eventsRes.json();
      const regs = await regsRes.json();
      const eventsData = regs.registrations || regs || [];
      setRegisteredEvents(eventsData.slice(0, 4)); // Show max 4 events
      setStats({
        totalEvents: 20,
        myRegistrations: eventsData.length || 0
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const qrData = JSON.stringify({
    id: user.id || user._id,
    email: user.email,
    name: user.name,
    timestamp: Date.now()
  });

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
        <h2 style={{ fontSize: '2.5rem', color: '#2d3748', marginBottom: '10px', fontWeight: 'bold' }}>Welcome Back! 👋</h2>
        <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '30px' }}>Hello {user?.name}, ready to explore amazing events?</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          {/* Stats Cards */}
          <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '3px solid #667eea' }}>
            <h3 style={{ fontSize: '1rem', color: '#2d3748', marginBottom: '12px', fontWeight: 'bold' }}>🎯 Available Events</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '5px' }}>{loading ? '...' : stats.totalEvents}</div>
            <p style={{ fontSize: '0.85rem', color: '#718096', margin: 0 }}>Total events to explore</p>
          </div>

          <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '3px solid #48bb78' }}>
            <h3 style={{ fontSize: '1rem', color: '#2d3748', marginBottom: '12px', fontWeight: 'bold' }}>✅ My Registrations</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#48bb78', marginBottom: '5px' }}>{loading ? '...' : stats.myRegistrations}</div>
            <p style={{ fontSize: '0.85rem', color: '#718096', margin: 0 }}>Events registered</p>
          </div>

          <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '3px solid #ed8936' }}>
            <h3 style={{ fontSize: '1rem', color: '#2d3748', marginBottom: '12px', fontWeight: 'bold' }}>🏫 College</h3>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ed8936', marginBottom: '5px' }}>{user.college ? '🎓' : '👤'}</div>
            <p style={{ fontSize: '0.85rem', color: '#718096', margin: 0 }}>{user.college || 'Participant'}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Enhanced Profile Card */}
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)', cursor: 'pointer', transition: 'all 0.3s', color: '#fff' }} onClick={() => navigate('/profile')} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(10px)',
                border: '3px solid rgba(255,255,255,0.3)',
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2rem', 
                fontWeight: 'bold',
                marginRight: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={{ fontSize: '1.6rem', margin: '0 0 8px 0', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>My Profile</h3>
                <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>Personal details & settings</p>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📧</span> {user.email}
                </p>
                <p style={{ margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📱</span> {user.mobile || 'Not provided'}
                </p>
                {user.college && (
                  <p style={{ margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🏫</span> {user.college}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🎯</span> {stats.myRegistrations} Events Registered
                </p>
              </div>
            </div>
            <button style={{ 
              background: 'rgba(255,255,255,0.2)', 
              color: '#fff', 
              border: '2px solid rgba(255,255,255,0.3)', 
              padding: '12px 24px', 
              borderRadius: '12px', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              width: '100%',
              fontSize: '1rem',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
              e.target.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.borderColor = 'rgba(255,255,255,0.3)';
            }}>
              View Full Profile →
            </button>
          </div>

          {/* Enhanced My Events Card */}
          <div style={{ background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(72, 187, 120, 0.3)', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', margin: '0 0 5px 0', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>📅 My Events</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{loading ? 'Loading...' : `${stats.myRegistrations} events registered`}</p>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '10px 15px', 
                borderRadius: '12px', 
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: 1 }}>{loading ? '...' : stats.myRegistrations}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>TOTAL</div>
              </div>
            </div>
            
            {loading ? (
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '25px', 
                borderRadius: '15px', 
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 15px'
                }}></div>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Loading your events...</p>
                <style>
                  {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
                </style>
              </div>
            ) : registeredEvents.length > 0 ? (
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '15px', 
                borderRadius: '15px', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                  {registeredEvents.map((event, idx) => (
                    <div key={idx} style={{ 
                      background: 'rgba(255,255,255,0.9)', 
                      padding: '12px', 
                      borderRadius: '10px', 
                      textAlign: 'center', 
                      color: '#2d3748',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: '2px solid #FFD700',
                      position: 'relative'
                    }}>
                      <div style={{ 
                        position: 'absolute',
                        top: '-8px',
                        left: '8px',
                        background: '#FFD700',
                        color: '#2d3748',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {idx + 1}
                      </div>
                      <h4 style={{ fontSize: '0.9rem', margin: '8px 0 5px 0', fontWeight: 'bold', lineHeight: 1.2 }}>
                        {event.eventName || event.event_name || 'Event'}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        {/* <span style={{ fontSize: '0.7rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '8px', color: '#4a5568' }}>
                          📂 {event.category || 'General'}
                        </span> */}
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#718096' }}>
                        ✓ Registered
                      </div>
                    </div>
                  ))}
                </div>
                
                {registeredEvents.length < stats.myRegistrations && (
                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '15px', 
                    padding: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '0.8rem'
                  }}>
                    +{stats.myRegistrations - registeredEvents.length} more events
                  </div>
                )}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '25px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.7 }}>🎯</div>
                <p style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: '500' }}>No events registered yet</p>
                <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', opacity: 0.8 }}>Start your journey by registering for exciting events!</p>
                <button 
                  onClick={() => navigate('/events')} 
                  style={{ 
                    padding: '12px 24px', 
                    background: 'rgba(255,255,255,0.2)', 
                    color: '#fff', 
                    border: '2px solid rgba(255,255,255,0.3)', 
                    borderRadius: '12px', 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.3)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.2)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                  }}
                >
                  🚀 Browse Events
                </button>
              </div>
            )}
          </div>

          {/* Enhanced QR Code Card */}
          <div style={{ background: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(159, 122, 234, 0.3)', color: '#fff', textAlign: 'center' }}>
            {/* <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📱</div> */}
            <h3 style={{ fontSize: '1.4rem', margin: '0 0 10px 0', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Your QR Code</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', opacity: 0.9 }}>Show this for attendance</p>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '20px', 
              borderRadius: '15px', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '15px'
            }}>
              <div style={{ 
                background: '#fff', 
                padding: '15px', 
                borderRadius: '12px', 
                marginBottom: '15px', 
                display: 'inline-block',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <QRCodeSVG 
                  value={qrData} 
                  size={140} 
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              {/* <div style={{ 
                fontSize: '0.9rem', 
                fontWeight: 'bold', 
                fontFamily: 'monospace', 
                letterSpacing: '1px',
                background: 'rgba(255,255,255,0.1)',
                padding: '8px 12px',
                borderRadius: '8px'
              }}>
                ID: PART-{user.id || user._id}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
