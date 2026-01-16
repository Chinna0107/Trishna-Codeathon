import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import Swal from 'sweetalert2';

const CoordinatorEvents = () => {
  const navigate = useNavigate();
  const [coordinator, setCoordinator] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    const coordinatorData = localStorage.getItem('coordinator');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    
    if (coordinatorData) {
      const data = JSON.parse(coordinatorData);
      setCoordinator(data);
      fetchEventData(null, coordinatorToken);
    }
  }, [navigate]);

  const fetchEventData = async (eventName, token) => {
    try {
      const myEventRes = await fetch(`${config.BASE_URL}/api/coordinators/my-event`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!myEventRes.ok) {
        throw new Error('Failed to fetch coordinator events');
      }
      
      const data = await myEventRes.json();
      const assignedEvents = [];
      
      // Add event1 if exists
      if (data.event1) {
        assignedEvents.push({
          name: data.event1,
          category: data.category1
        });
      }
      
      // Add event2 if exists
      if (data.event2) {
        assignedEvents.push({
          name: data.event2,
          category: data.category2
        });
      }
      
      setEvents(assignedEvents);
    } catch (err) {
      console.error('Error fetching event data:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load event data',
        confirmButtonColor: '#667eea'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-150px', right: '-150px', width: '400px', height: '400px', background: 'rgba(192,192,192,0.3)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '8px solid rgba(255,255,255,0.3)',
            borderTop: '8px solid #fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#424242', fontSize: '1.2rem', fontWeight: 'bold' }}>Loading event data...</p>
          <style>
            {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
          </style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', 
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: 'rgba(192,192,192,0.3)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
      
      {/* Navigation Bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.9)', padding: '15px 20px', borderRadius: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => navigate('/coordinator/dashboard')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🏠 Home</button>
        <button onClick={() => navigate('/coordinator/events')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>📅 Events</button>
        <button onClick={() => navigate('/coordinator/schedules')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🕐 Schedules</button>
        <button onClick={() => navigate('/coordinator/profile')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>👤 Profile</button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ color: '#37474f', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '10px' }}>My Events</h1>
            <p style={{ color: '#546e7a', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>Your assigned events</p>
          </div>
          <button
            onClick={() => navigate('/coordinator/dashboard')}
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.6)',
              border: '2px solid rgba(255,255,255,0.8)',
              borderRadius: '10px',
              color: '#37474f',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)'
            }}
          >
            ← Back
          </button>
        </div>

        {events.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '25px' }}>
            {events.map((event, idx) => (
              <div key={idx} style={{
                background: idx === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: 'clamp(20px, 5vw, 40px)',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
                position: 'relative',
                overflow: 'visible'
              }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginRight: '15px' }}>{idx === 0 ? '🎯' : '🌟'}</div>
                    <div>
                      <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', color: 'rgba(255,255,255,0.8)', marginBottom: '5px' }}>Event {idx + 1}</div>
                      <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', color: '#fff', margin: 0, fontWeight: 'bold' }}>{event.name}</h2>
                    </div>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: 'clamp(15px, 4vw, 25px)', borderRadius: '15px', backdropFilter: 'blur(10px)', marginBottom: '20px' }}>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', marginBottom: '8px' }}>📂 Category</p>
                      <p style={{ color: '#fff', fontWeight: 'bold', fontSize: 'clamp(1rem, 3vw, 1.3rem)', margin: 0 }}>{event.category}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                      onClick={() => navigate(`/coordinator/take-attendance/${event.name}`)}
                      style={{
                        flex: 1,
                        padding: 'clamp(12px, 3vw, 15px)',
                        background: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#667eea',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      📸 Take Attendance
                    </button>
                    <button
                      onClick={() => navigate(`/coordinator/view-attendance/${event.name}`)}
                      style={{
                        flex: 1,
                        padding: 'clamp(12px, 3vw, 15px)',
                        background: 'rgba(255,255,255,0.25)',
                        border: '2px solid rgba(255,255,255,0.8)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      👁️ View Attendance
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '60px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚫</div>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Event Assigned</h3>
            <p style={{ color: '#718096' }}>You don't have any event assigned yet. Please contact the admin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinatorEvents;
