import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CoordinatorSchedule = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    
    // Mock schedule data
    const mockSchedules = [
      {
        eventName: 'Tech Quiz',
        category: 'Technical',
        date: 'January 20, 2025',
        time: '10:00 AM - 12:00 PM',
        venue: 'Main Auditorium'
      },
      {
        eventName: 'Code Sprint',
        category: 'Technical',
        date: 'January 21, 2025',
        time: '2:00 PM - 5:00 PM',
        venue: 'Computer Lab 1'
      },
      {
        eventName: 'Web Design',
        category: 'Technical',
        date: 'January 22, 2025',
        time: '9:00 AM - 1:00 PM',
        venue: 'Design Studio'
      }
    ];
    
    setTimeout(() => {
      setSchedules(mockSchedules);
      setLoading(false);
    }, 500);
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255,255,255,0.3)', borderTop: '6px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#424242', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading schedules...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', padding: 'clamp(10px, 3vw, 20px)' }}>
      {/* Navigation Bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.9)', padding: '15px 20px', borderRadius: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => navigate('/coordinator/dashboard')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🏠 Home</button>
        <button onClick={() => navigate('/coordinator/events')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>📅 Events</button>
        <button onClick={() => navigate('/coordinator/schedules')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🕐 Schedules</button>
        <button onClick={() => navigate('/coordinator/profile')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>👤 Profile</button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(15px, 4vw, 30px)', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ color: '#37474f', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '5px' }}>Event Schedules</h1>
            <p style={{ color: '#546e7a', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>View all event timings</p>
          </div>
          <button onClick={() => navigate('/coordinator/dashboard')} style={{ padding: 'clamp(8px 16px, 2vw, 12px 24px)', background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(255,255,255,0.8)', borderRadius: '10px', color: '#37474f', fontWeight: 'bold', cursor: 'pointer', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            ← Back
          </button>
        </div>

        {schedules.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {schedules.map((schedule, idx) => (
              <div key={idx} style={{ background: '#fff', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
                  <div style={{ fontSize: '2.5rem' }}>📅</div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ color: '#37474f', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', margin: '0 0 5px 0', fontWeight: 'bold' }}>{schedule.eventName}</h2>
                    <p style={{ color: '#718096', fontSize: 'clamp(0.85rem, 2vw, 1rem)', margin: 0 }}>{schedule.category}</p>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
                  <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '10px' }}>
                    <p style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '5px' }}>📆 Date</p>
                    <p style={{ color: '#2d3748', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{schedule.date}</p>
                  </div>
                  <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '10px' }}>
                    <p style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '5px' }}>🕐 Time</p>
                    <p style={{ color: '#2d3748', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{schedule.time}</p>
                  </div>
                  <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '10px' }}>
                    <p style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '5px' }}>📍 Venue</p>
                    <p style={{ color: '#2d3748', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{schedule.venue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#fff', padding: '60px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📅</div>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Schedules Available</h3>
            <p style={{ color: '#718096' }}>Event schedules will appear here once they are published.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinatorSchedule;
