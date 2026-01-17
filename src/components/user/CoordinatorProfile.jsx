import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';
import tkLogo from '../../assets/images/tk26.png';

const CoordinatorProfile = () => {
  const [coordinator, setCoordinator] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    
    fetchCoordinatorProfile();
  }, [navigate]);

  const fetchCoordinatorProfile = async () => {
    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setCoordinator(data);
      } else {
        // Fallback to localStorage if API fails
        const coordinatorData = localStorage.getItem('coordinator');
        if (coordinatorData) {
          setCoordinator(JSON.parse(coordinatorData));
        }
      }
    } catch (err) {
      console.error('Error fetching coordinator profile:', err);
      // Fallback to localStorage
      const coordinatorData = localStorage.getItem('coordinator');
      if (coordinatorData) {
        setCoordinator(JSON.parse(coordinatorData));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <CoordinatorMenu />
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(102, 126, 234, 0.3)', borderTop: '6px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!coordinator) return null;

  // Generate unique QR data for this coordinator
  const qrData = JSON.stringify({
    id: coordinator.id,
    name: coordinator.name,
    email: coordinator.email,
    mobile: coordinator.mobile,
    eventName: coordinator?.events ? coordinator.events.join(', ') : coordinator?.eventName,
    role: 'coordinator',
    timestamp: Date.now()
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1 }} className="profile-content">
        <style>
          {`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes shimmer {
              0% { background-position: -200px 0; }
              100% { background-position: calc(200px + 100%) 0; }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(0,234,255,0.3), 0 0 40px rgba(0,234,255,0.1); }
              50% { box-shadow: 0 0 30px rgba(0,234,255,0.5), 0 0 60px rgba(0,234,255,0.2); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .mobile-padding {
              padding: 0;
            }
            @media (max-width: 768px) {
              .mobile-padding { padding: 15px !important; }
              .profile-content { margin-left: 0 !important; padding: 0 !important; padding-top: 80px !important; }
              .details-qr-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
              .qr-section { padding-top: 0 !important; order: 2; }
              .details-section { order: 1; }
              .profile-card { padding: 25px !important; border-radius: 20px !important; }
            }
          `}
        </style>
        
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', padding: '40px', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="mobile-padding">
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
          {/* Animated background elements */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(0,234,255,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', top: '60%', right: '10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite reverse' }}></div>
          <div style={{ position: 'absolute', bottom: '20%', left: '15%', width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(240,147,251,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 7s ease-in-out infinite' }}></div>
          
          {/* Profile Card */}
          <div className="profile-card" style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(30px)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,234,255,0.15), 0 8px 32px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
            position: 'relative',
            border: '2px solid rgba(0,234,255,0.2)',
            maxWidth: '900px',
            width: '100%',
            overflow: 'hidden',
            animation: 'glow 4s ease-in-out infinite'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Profile Section */}
              <div style={{ background: '#000', backdropFilter: 'blur(20px)', padding: '30px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', marginBottom: '30px', border: '1px solid rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
                {/* Corner Pins */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#C0C0C0', borderRadius: '50%' }}></div>
                {/* Details and QR Grid */}
                <div className="details-qr-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 2px 1fr', 
                  gap: '15px', 
                  alignItems: 'start' 
                }}>
                  {/* Left Side - Profile Details */}
                  <div className="details-section" style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#000', padding: '20px', borderRadius: '15px' }}>
                    {/* Avatar with name and ID */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#000',
                        color: '#ffff00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        border: '3px solid #ffff00'
                      }}>
                        {coordinator?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', margin: '0', color: '#87CEEB', fontWeight: 'bold' }}>{coordinator?.name}</h2>
                        <p style={{ fontSize: '1rem', color: '#87CEEB', margin: '0', fontWeight: '500' }}>COORD-{coordinator?.id}</p>
                      </div>
                    </div>
                    
                    {/* Horizontal Line */}
                    <hr style={{ border: 'none', height: '2px', background: 'linear-gradient(90deg, #87CEEB, transparent)', margin: '10px 0', borderRadius: '1px' }} />
                    
                    {/* Event Name */}
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', margin: '0' }}>TRI-COD 2K26</p>
                    </div>
                    
                    {/* Email */}
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', margin: '0', wordBreak: 'break-word' }}>{coordinator?.email}</p>
                    </div>
                    
                    {/* Assigned Events */}
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', margin: '0' }}>
                        {coordinator?.events ? coordinator.events.join(', ') : coordinator?.eventName}
                      </p>
                    </div>
                    
                    {/* Mobile */}
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '1.1rem', color: '#87CEEB', fontWeight: '600', margin: '0' }}>{coordinator?.mobile}</p>
                    </div>
                  </div>
                  
                  {/* Vertical Line */}
                  <div style={{ width: '2px', background: '#C0C0C0', height: '100%', minHeight: '400px' }}></div>
                  
                  {/* Right Side - QR Code */}
                  <div className="qr-section" style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '300px',
                    paddingTop: '250px',
                    padding: '20px'
                  }}>
                    <h3 style={{ color: '#87CEEB', marginBottom: '25px', fontSize: '1.3rem', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>QR Code</h3>
                    <div className="qr-wrapper" style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', 
                      padding: '25px', 
                      borderRadius: '20px', 
                      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.2), 0 5px 15px rgba(0,0,0,0.1)',
                      border: '2px solid rgba(102, 126, 234, 0.1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        animation: 'shimmer 2s infinite'
                      }}></div>
                      <QRCodeSVG 
                        className="qr-code"
                        value={qrData}
                        size={160}
                        level="H"
                        includeMargin={false}
                        style={{ position: 'relative', zIndex: 1 }}
                      />
                    </div>
                    <p style={{ 
                      marginTop: '15px', 
                      fontSize: '0.85rem', 
                      color: '#87CEEB', 
                      textAlign: 'center',
                      opacity: 0.8,
                      fontWeight: '500'
                    }}>
                      ✨ Coordinator Access
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorProfile;
