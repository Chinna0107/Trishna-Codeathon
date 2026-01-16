import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const CoordinatorProfile = () => {
  const [coordinator, setCoordinator] = useState(null);
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
    }
  }, [navigate]);

  const handleDownload = () => {
    window.print();
  };

  if (!coordinator) return null;

  // Generate unique QR data for this coordinator
  const qrData = JSON.stringify({
    id: coordinator.id,
    name: coordinator.name,
    email: coordinator.email,
    mobile: coordinator.mobile,
    eventName: coordinator.eventName,
    role: 'coordinator',
    timestamp: Date.now()
  });

  return (
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        {/* Back Button */}
        <button
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
        </button>

        {/* ID Card */}
        <div id="id-card-print" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '30px',
          borderRadius: '25px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '2.5rem', color: '#fff', margin: '0 0 10px 0', fontWeight: 'bold' }}>TRI-COD 2K26</h1>
              <p style={{ fontSize: '1.2rem', color: '#fff', opacity: 0.9, margin: 0 }}>Coordinator ID Card</p>
            </div>

            {/* Profile Section */}
            <div style={{ background: 'rgba(255,255,255,0.25)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)', marginBottom: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
                  color: '#f5576c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.3)'
                }}>
                  {coordinator?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{coordinator?.name}</h2>
                <p style={{ fontSize: '1.3rem', color: '#fff', opacity: 0.95, margin: 0 }}>🎯 Event Coordinator</p>
              </div>

              {/* Details and QR Grid - Responsive */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '15px', 
                alignItems: 'start' 
              }}>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.3)', padding: '15px', borderRadius: '10px' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff', opacity: 0.8, marginBottom: '5px' }}>📧 Email Address</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#fff', fontWeight: '600', wordBreak: 'break-word' }}>{coordinator?.email}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.3)', padding: '15px', borderRadius: '10px' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff', opacity: 0.8, marginBottom: '5px' }}>📱 Mobile Number</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#fff', fontWeight: '600' }}>{coordinator?.mobile}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.3)', padding: '15px', borderRadius: '10px' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff', opacity: 0.8, marginBottom: '5px' }}>🎪 Assigned Event</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#fff', fontWeight: '600' }}>{coordinator?.eventName}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.3)', padding: '15px', borderRadius: '10px' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff', opacity: 0.8, marginBottom: '5px' }}>🔖 Coordinator ID</p>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#fff', fontWeight: '600' }}>COORD-{coordinator?.id}</p>
                  </div>
                </div>
                
                {/* QR Code - Right on desktop, below on mobile */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: '140px'
                }}>
                  <div style={{ 
                    background: '#fff', 
                    padding: '10px', 
                    borderRadius: '10px', 
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)' 
                  }}>
                    <QRCodeSVG 
                      value={qrData}
                      size={120}
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
  );
};

export default CoordinatorProfile;
