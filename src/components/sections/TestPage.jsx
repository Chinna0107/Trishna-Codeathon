import React from 'react';
import UserMenu from '../user/UserMenu';
import tkLogo from '../../assets/images/tk26.png';

const TestPage = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <UserMenu />
      <div style={{ marginLeft: '280px', flex: 1, padding: '40px', background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} className="dashboard-wrapper">
        <style>
          {`
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
              50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
            }
            @media (max-width: 768px) {
              .dashboard-wrapper { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
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
        
        <div style={{ 
          textAlign: 'center', 
          background: 'rgba(255,255,255,0.1)', 
          backdropFilter: 'blur(20px)',
          padding: '60px 40px', 
          borderRadius: '20px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.2)',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Corner Pins */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚧</div>
          <h1 style={{ fontSize: '2.5rem', color: '#00eaff', marginBottom: '15px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Coming Soon
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '30px', lineHeight: 1.6 }}>
            We're working hard to bring you an amazing test experience. Stay tuned for updates!
          </p>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '15px 30px', 
            borderRadius: '12px', 
            color: '#fff', 
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            📅 Feature Under Development
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;