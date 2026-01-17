import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';

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
            @media (max-width: 768px) {
              .profile-content { margin-left: 0 !important; padding-top: 80px !important; }
              .details-qr-grid { grid-template-columns: 1fr !important; }
              .qr-section { padding-top: 20px !important; order: 2; }
              .details-section { order: 1; }
            }
          `}
        </style>
    <>
      <style>
        {`
          @media print {
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
            body * {
              visibility: hidden;
            }
            #id-card-print, #id-card-print * {
              visibility: visible;
            }
            #id-card-print {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 90mm;
              max-width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    <div style={{ minHeight: '100vh', background: '#fff', padding: '40px' }}>
      <div style={{ width: '100%' }}>
        {/* Back Button */}
        {/* <button
          onClick={() => navigate('/coordinator/dashboard')}
          className="no-print"
          style={{
            marginBottom: '20px',
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Back to Dashboard
        </button> */}

        {/* ID Card */}
        <div id="id-card-print" style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '25px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          position: 'relative',
          border: '2px solid #87CEEB',
          width: '100%'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '2.5rem', color: '#4682B4', margin: '0 0 10px 0', fontWeight: 'bold' }}>TRI-COD 2K26</h1>
              <p style={{ fontSize: '1.2rem', color: '#87CEEB', margin: 0 }}>Coordinator ID Card</p>
            </div>

            {/* Profile Section */}
            <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', marginBottom: '30px' }}>
              {/* Details and QR Grid - Left details, Right QR */}
              <div className="details-qr-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr', 
                gap: '30px', 
                alignItems: 'start' 
              }}>
                {/* Left Side - Coordinator Details */}
                <div className="details-section" style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      margin: '0 auto 15px',
                      boxShadow: '0 8px 25px rgba(70, 130, 180, 0.3)'
                    }}>
                      {coordinator?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 style={{ fontSize: '2rem', margin: '0 0 5px 0', color: '#87CEEB', fontWeight: 'bold' }}>{coordinator?.name}</h2>
                    <p style={{ fontSize: '1.1rem', color: '#4682B4', margin: 0, fontWeight: '600' }}>🎯 Event Coordinator</p>
                  </div>
                  
                  <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', border: '2px solid #87CEEB' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#4682B4', opacity: 0.8, marginBottom: '5px' }}>📧 Email Address</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#87CEEB', fontWeight: '600', wordBreak: 'break-word' }}>{coordinator?.email}</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', border: '2px solid #87CEEB' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#4682B4', opacity: 0.8, marginBottom: '5px' }}>📱 Mobile Number</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#87CEEB', fontWeight: '600' }}>{coordinator?.mobile}</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', border: '2px solid #87CEEB' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#4682B4', opacity: 0.8, marginBottom: '5px' }}>🎪 Assigned Events</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#87CEEB', fontWeight: '600' }}>
                      {coordinator?.events ? coordinator.events.join(', ') : coordinator?.eventName}
                    </p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', border: '2px solid #87CEEB' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#4682B4', opacity: 0.8, marginBottom: '5px' }}>🔖 Coordinator ID</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#87CEEB', fontWeight: '600' }}>COORD-{coordinator?.id}</p>
                  </div>
                </div>
                
                {/* Right Side - QR Code */}
                <div className="qr-section" style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                  paddingTop: '250px'
                }}>
                  <h3 style={{ color: '#4682B4', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>QR Code</h3>
                  <div style={{ 
                    background: '#fff', 
                    padding: '15px', 
                    borderRadius: '15px', 
                    boxShadow: '0 8px 25px rgba(70, 130, 180, 0.3)',
                    border: '3px solid #87CEEB'
                  }}>
                    <QRCodeSVG 
                      value={qrData}
                      size={150}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="no-print"
              style={{
                width: '100%',
                padding: '18px',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '15px',
                color: '#f5576c',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.3s',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
              onMouseOver={(e) => e.target.style.background = '#fff'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.9)'}
            >
              ⬇️ Download ID Card
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
      </div>
    </div>
  );
};

export default CoordinatorProfile;
