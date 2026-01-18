import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../config';
import TrishnaLogo from '../../assets/images/tk26.png';

const AdminWinnersData = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [winners, setWinners] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    if (!adminToken) {
      navigate('/admin-home');
      return;
    }
    fetchEvents();
    fetchWinners();
  }, [navigate, eventName]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('admintoken');
      const res = await fetch(`${config.BASE_URL}/api/admin/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchWinners = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admintoken');
      const url = eventName 
        ? `${config.BASE_URL}/api/admin/winners/${eventName}`
        : `${config.BASE_URL}/api/admin/winners`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setWinners(data);
      }
    } catch (err) {
      console.error('Error fetching winners:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: '6px solid rgba(102, 126, 234, 0.3)', borderTop: '6px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading winners...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)', backgroundSize: '400% 400%', animation: 'gradientShift 8s ease infinite', padding: '40px', position: 'relative', minHeight: '100vh' }} className="admin-winners-content">
        {/* Animated Balloons Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                fontSize: '2rem',
                animation: `balloon${i % 3} ${6 + i % 4}s ease-in-out infinite`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              🎈
            </div>
          ))}
        </div>
        
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes balloon0 {
              0%, 100% { transform: translateY(100vh) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            @keyframes balloon1 {
              0%, 100% { transform: translateY(100vh) translateX(0px) rotate(0deg); }
              50% { transform: translateY(-20px) translateX(30px) rotate(-180deg); }
            }
            @keyframes balloon2 {
              0%, 100% { transform: translateY(100vh) translateX(0px) rotate(0deg); }
              50% { transform: translateY(-20px) translateX(-30px) rotate(180deg); }
            }
            @keyframes cardSlideIn {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes rankPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            @keyframes scoreGlow {
              0%, 100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
              50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
            }
            .admin-winners-card {
              animation: cardSlideIn 0.6s ease-out;
              animation-delay: calc(var(--index) * 0.1s);
              transition: all 0.3s ease;
            }
            .admin-winners-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            }
            .admin-winners-rank {
              animation: rankPulse 2s ease-in-out infinite;
            }
            .admin-score-badge {
              animation: scoreGlow 3s ease-in-out infinite;
            }
            @media (max-width: 768px) {
              .admin-winners-content { padding: 20px !important; }
              .admin-winners-card { flex-direction: column !important; text-align: center !important; padding: 15px !important; }
              .admin-winners-rank { margin-bottom: 15px !important; }
              .admin-winners-content h1 { font-size: 1.8rem !important; }
              .admin-winners-content h2 { font-size: 1.3rem !important; }
            }
          `}
        </style>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Logo in top right corner */}
          <div style={{ position: 'absolute', top: '-20px', right: '0', zIndex: 10 }}>
            <img 
              src={TrishnaLogo} 
              alt="Trishna Logo" 
              style={{ 
                height: '50px', 
                width: 'auto', 
                objectFit: 'contain'
              }} 
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <button
              onClick={() => navigate('/admin/dashboard')}
              style={{
                padding: '10px',
                background: '#fff',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ←
            </button>
            <h1 style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>🏆 Winners Data{eventName ? ` - ${eventName}` : ''}</h1>
          </div>

          {/* Events Menu Bar */}
          <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px', padding: '20px' }}>
            <h3 style={{ color: '#2d3748', margin: '0 0 15px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>Select Event:</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/admin/winners')}
                style={{
                  padding: '8px 16px',
                  background: !eventName ? '#ffd700' : '#f7fafc',
                  color: !eventName ? '#000' : '#2d3748',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                All Events
              </button>
              {events.map((event) => (
                <button
                  key={event.id || event.name}
                  onClick={() => navigate(`/admin/winners/${event.name}`)}
                  style={{
                    padding: '8px 16px',
                    background: eventName && decodeURIComponent(eventName) === event.name ? '#ffd700' : '#f7fafc',
                    color: eventName && decodeURIComponent(eventName) === event.name ? '#000' : '#2d3748',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s'
                  }}
                >
                  {event.name}
                </button>
              ))}
            </div>
          </div>

          {winners.length === 0 ? (
            <div style={{ background: '#fff', padding: '60px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏆</div>
              <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Winners Found</h3>
              <p style={{ color: '#718096' }}>No winners have been declared yet.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ color: '#2d3748', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                  🏆 Winners List ({winners.length}){eventName ? ` - ${eventName}` : ''}
                </h2>
              </div>

              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {winners.map((winner, idx) => (
                  <div 
                    key={winner.id || idx}
                    style={{ 
                      padding: '20px', 
                      borderBottom: idx < winners.length - 1 ? '1px solid #f7fafc' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      background: winner.position <= 3 ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                      '--index': idx
                    }}
                    className="admin-winners-card"
                  >
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: winner.position === 1 ? '#ffd700' : winner.position === 2 ? '#c0c0c0' : winner.position === 3 ? '#cd7f32' : '#667eea',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }} className="admin-winners-rank">
                      {getRankIcon(winner.position)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        <h3 style={{ color: '#2d3748', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                          {winner.name}
                        </h3>
                      </div>
                      <p style={{ color: '#718096', margin: 0, fontSize: '0.9rem' }}>
                        {winner.email} • {winner.eventName}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        padding: '8px 16px',
                        background: winner.position === 1 ? '#ffd700' : winner.position === 2 ? '#c0c0c0' : winner.position === 3 ? '#cd7f32' : '#667eea',
                        borderRadius: '20px',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        marginBottom: '5px'
                      }} className={winner.position <= 3 ? 'admin-score-badge' : ''}>
                        Score: {winner.score}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                        Position: {winner.position}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminWinnersData;