import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import Swal from 'sweetalert2';
import CoordinatorMenu from './CoordinatorMenu';
import tkLogo from '../../assets/images/tk26.png';

const CoordinatorEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    
    fetchEventData(coordinatorToken);
  }, [navigate]);

  const fetchEventData = async (token) => {
    try {
      const myEventRes = await fetch(`${config.BASE_URL}/api/coordinators/my-event`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!myEventRes.ok) {
        throw new Error('Failed to fetch coordinator events');
      }
      
      const data = await myEventRes.json();
      const assignedEvents = [];
      
      if (data.event1) {
        assignedEvents.push({
          name: data.event1,
          category: data.category1
        });
      }
      
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

  const categories = ['All', ...new Set(events.map(e => e.category))];
  
  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <CoordinatorMenu />
        <div style={{ marginLeft: '280px', flex: 1, background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="events-content">
          <style>
            {`
              @media (max-width: 768px) {
                .events-content { margin-left: 0 !important; padding-top: 80px !important; }
              }
            `}
          </style>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255, 255, 255, 0.3)', borderTop: '6px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading events...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: '#000', padding: '40px', position: 'relative' }} className="events-content">
        <style>
          {`
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
              50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
            }
            @media (max-width: 768px) {
              .events-content { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
            }
          `}
        </style>
        
        {/* Logo in top right corner */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
          <img 
            src={tkLogo} 
            alt="TK26 Logo" 
            style={{ 
              height: '35px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }} 
          />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>My Events</h1>
          <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '20px' }}>Manage your assigned events</p>

          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="🔍 Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Category Menu */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === category ? '#FFD700' : '#fff',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  color: selectedCategory === category ? '#2d3748' : '#718096',
                  fontWeight: selectedCategory === category ? 'bold' : '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.background = '#f7fafc';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.background = '#fff';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredEvents.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {filteredEvents.map((event, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', padding: '20px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ width: '100%', height: '150px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)' }}>
                    {idx === 0 ? '🎯' : '🌟'}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      onClick={() => navigate(`/coordinator/event-details/${event.name}`)}
                      style={{
                        padding: '8px 16px',
                        background: '#fff',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        color: '#FFD700',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s',
                        flexShrink: 0
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      📂 Open
                    </button>
                    
                    <h2 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, fontWeight: 'bold', flex: 1 }}>{event.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(20px)', 
              padding: '60px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ color: '#fff', marginBottom: '10px' }}>No Events Found</h3>
              <p style={{ color: '#ccc' }}>Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorEvents;
