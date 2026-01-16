import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';

const CoordinatorDashboard = () => {
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
      const res = await fetch(`${config.BASE_URL}/api/coordinators/my-event`, {
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

  return coordinator ? (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, padding: '40px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }} className="dashboard-wrapper">
        <style>
          {`
            @media (max-width: 768px) {
              .dashboard-wrapper { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
            }
          `}
        </style>
        <h2 style={{ fontSize: '2.5rem', color: '#2d3748', marginBottom: '10px', fontWeight: 'bold' }}>Welcome Back! 👋</h2>
        <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '30px' }}>Hello {coordinator?.name}, manage your event efficiently</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
          {/* Events Count Card */}
          <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '1rem', color: '#2d3748', marginBottom: '12px', fontWeight: 'bold' }}>📅 My Events</h3>
            
            {assignedEvents.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                {assignedEvents.map((event, idx) => (
                  <div key={idx} style={{ background: '#f7fafc', padding: '10px', borderRadius: '6px', textAlign: 'center', borderTop: '2px solid #FFD700' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '5px' }}>{idx + 1}</div>
                    <h4 style={{ fontSize: '0.85rem', color: '#2d3748', margin: '0 0 3px 0', fontWeight: 'bold' }}>{event.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#718096', margin: 0 }}>📂 {event.category}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ID Card */}
          <div style={{ background: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '1rem', color: '#2d3748', marginBottom: '12px', fontWeight: 'bold' }}>🆔 ID Card</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {coordinator?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', margin: '0 0 2px 0', color: '#2d3748', fontWeight: 'bold' }}>{coordinator?.name}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#718096' }}>Event Coordinator</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              <button
                onClick={() => navigate('/coordinator/profile')}
                style={{
                  padding: '6px 12px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  color: '#FFD700',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                 View
              </button>
              <div style={{ width: '1px', height: '20px', background: '#e2e8f0' }}></div>
              <button
                onClick={() => navigate('/coordinator/profile')}
                style={{
                  padding: '6px 12px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  color: '#FFD700',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                 Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CoordinatorDashboard;
