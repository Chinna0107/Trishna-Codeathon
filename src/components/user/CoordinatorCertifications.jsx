import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CoordinatorCertifications = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', padding: 'clamp(10px, 3vw, 20px)' }}>
      {/* Navigation Bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.9)', padding: '15px 20px', borderRadius: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => navigate('/coordinator/dashboard')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🏠 Home</button>
        <button onClick={() => navigate('/coordinator/events')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>📅 Events</button>
        <button onClick={() => navigate('/coordinator/schedules')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🕐 Schedules</button>
        <button onClick={() => navigate('/coordinator/profile')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>👤 Profile</button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(15px, 4vw, 30px)', flexWrap: 'wrap', gap: '10px' }}>
          <h1 style={{ color: '#37474f', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 'bold' }}>Certifications</h1>
          <button onClick={() => navigate('/coordinator/dashboard')} style={{ padding: 'clamp(8px 16px, 2vw, 12px 24px)', background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(255,255,255,0.8)', borderRadius: '10px', color: '#37474f', fontWeight: 'bold', cursor: 'pointer', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            ← Back
          </button>
        </div>

        <div style={{ background: '#fff', padding: 'clamp(40px, 8vw, 80px)', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ color: '#37474f', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '15px', fontWeight: 'bold' }}>Coming Soon!</h2>
          <p style={{ color: '#718096', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '10px' }}>The certification management feature is under development.</p>
          <p style={{ color: '#718096', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Stay tuned for updates! 🚀</p>
          
          <div style={{ marginTop: '40px', padding: '30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '15px' }}>
            <p style={{ color: '#fff', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', margin: 0, fontWeight: '500' }}>
              💡 This page will allow you to generate and manage participant certificates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorCertifications;
