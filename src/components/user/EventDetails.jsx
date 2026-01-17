import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';
import Swal from 'sweetalert2';

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [stats, setStats] = useState({
    totalParticipants: 0,
    attended: 0,
    absent: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventStats();
  }, [eventName]);

  const fetchEventStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/event-stats/${eventName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setStats({
          totalParticipants: data.totalParticipants || 0,
          attended: data.attended || 0,
          absent: data.absent || 0
        });
      }
    } catch (err) {
      console.error('Error fetching event stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px' }} className="event-details-content">
        <style>
          {`
            @media (max-width: 768px) {
              .event-details-content { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px' }}>Event Details</h1>
          
          {/* Main Card */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              {/* Left Side - Image and Event Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ width: '200px', height: '200px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)' }}>
                  🎯
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#2d3748', margin: 0, fontWeight: 'bold', textAlign: 'center' }}>{eventName}</h2>
              </div>
              
              {/* Right Side - Data Buttons */}
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <button
                  onClick={() => navigate(`/coordinator/registered-data/${eventName}`)}
                  style={{
                    padding: '12px',
                    background: '#C0C0C0',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#000',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  📋 Registered Data
                </button>
                
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'Attendance',
                      text: 'What would you like to do?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#667eea',
                      cancelButtonColor: '#48bb78',
                      confirmButtonText: 'Take Attendance',
                      cancelButtonText: 'View Attendance'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(`/coordinator/take-attendance/${eventName}`);
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        navigate(`/coordinator/view-attendance/${eventName}`);
                      }
                    });
                  }}
                  style={{
                    padding: '12px',
                    background: '#FFD700',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#000',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  ✅ Attendance
                </button>
                
                <button
                  onClick={() => navigate(`/coordinator/evaluation/${eventName}`)}
                  style={{
                    padding: '12px',
                    background: '#C0C0C0',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#000',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  📊 Evaluation
                </button>
                
                <button
                  onClick={() => navigate(`/coordinator/winners/${eventName}`)}
                  style={{
                    padding: '12px',
                    background: '#FFD700',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#000',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  🏆 Winners Data
                </button>
              </div>
            </div>
          </div>
          
          {/* Live Status */}
          <div>
            <h2 style={{ color: '#2d3748', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px' }}>Live Status</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              <div style={{ background: '#48bb78', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)', textAlign: 'center', border: '3px solid #38a169' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>👥</div>
                {loading ? (
                  <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '10px auto' }}></div>
                ) : (
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>{stats.totalParticipants}</h3>
                )}
                <p style={{ color: '#fff', margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>Total Participants</p>
              </div>
              
              <div style={{ background: '#48bb78', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)', textAlign: 'center', border: '3px solid #38a169' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>✅</div>
                {loading ? (
                  <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '10px auto' }}></div>
                ) : (
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>{stats.attended}</h3>
                )}
                <p style={{ color: '#fff', margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>Attended</p>
              </div>
              
              <div style={{ background: '#48bb78', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)', textAlign: 'center', border: '3px solid #38a169' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>❌</div>
                {loading ? (
                  <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '10px auto' }}></div>
                ) : (
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>{stats.absent}</h3>
                )}
                <p style={{ color: '#fff', margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>Absent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
