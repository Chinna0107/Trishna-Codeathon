import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const ParticipantEvents = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchRegistrations(JSON.parse(userData).email);
  }, [navigate]);

  const fetchRegistrations = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.BASE_URL}/api/participants/registrations?email=${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        console.error('Failed to fetch registrations:', res.status);
        setRegistrations([]);
        return;
      }
      
      const data = await res.json();
      setRegistrations(data.registrations || data);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <div>Loading your events...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 'bold' }}>My Registered Events</h1>
          <button
            onClick={() => navigate('/home')}
            style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.2)', border: '1px solid #fff', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ← Back to Home
          </button>
        </div>

        {registrations.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.95)', padding: '60px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📋</div>
            <h2 style={{ color: '#2d3748', fontSize: '1.8rem', marginBottom: '10px' }}>No Events Registered</h2>
            <p style={{ color: '#718096', marginBottom: '30px' }}>You haven't registered for any events yet.</p>
            <button
              onClick={() => navigate('/events')}
              style={{ padding: '12px 30px', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {registrations.map((reg, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.95)', padding: '25px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                  <h3 style={{ color: '#2d3748', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{reg.eventName || 'Event'}</h3>
                  <span style={{ padding: '5px 12px', background: reg.registrationType === 'Team' ? '#667eea' : '#48bb78', color: '#fff', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {reg.registrationType || 'Individual'}
                  </span>
                </div>
                
                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '3px' }}>Registration Date</div>
                  <div style={{ color: '#2d3748', fontWeight: '600' }}>{new Date(reg.createdAt || Date.now()).toLocaleDateString()}</div>
                </div>

                {reg.teamName && (
                  <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '3px' }}>Team Name</div>
                    <div style={{ color: '#2d3748', fontWeight: '600' }}>{reg.teamName}</div>
                  </div>
                )}

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '3px' }}>Status</div>
                  <div style={{ color: '#48bb78', fontWeight: '600' }}>✓ Registered</div>
                </div>

                {reg.transactionId && (
                  <div style={{ marginTop: '15px', padding: '10px', background: '#f7fafc', borderRadius: '8px' }}>
                    <div style={{ color: '#718096', fontSize: '0.75rem', marginBottom: '3px' }}>Transaction ID</div>
                    <div style={{ color: '#2d3748', fontSize: '0.9rem', fontFamily: 'monospace' }}>{reg.transactionId}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantEvents;
