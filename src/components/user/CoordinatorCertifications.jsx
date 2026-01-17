import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoordinatorMenu from './CoordinatorMenu';
import tkLogo from '../../assets/images/tk26.png';

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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: '#000', padding: 'clamp(10px, 3vw, 20px)', position: 'relative' }} className="cert-content">
        <style>
          {`
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
              50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
            }
            @media (max-width: 768px) {
              .cert-content { margin-left: 0 !important; padding: 10px !important; padding-top: 80px !important; }
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(15px, 4vw, 30px)' }}>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 'bold' }}>Certifications</h1>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', padding: 'clamp(40px, 8vw, 80px)', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: '20px' }}>🏆</div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '15px', fontWeight: 'bold' }}>Coming Soon!</h2>
            <p style={{ color: '#ccc', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '10px' }}>The certification management feature is under development.</p>
            <p style={{ color: '#ccc', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Stay tuned for updates! 🚀</p>
            
            <div style={{ marginTop: '40px', padding: '30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '15px' }}>
              <p style={{ color: '#fff', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', margin: 0, fontWeight: '500' }}>
                💡 This page will allow you to generate and manage participant certificates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorCertifications;
