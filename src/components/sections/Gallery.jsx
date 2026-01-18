import React from 'react';
import tkLogo from '../../assets/images/tk26.png';
import BottomNavBar from './BottomNavBar';

const Gallery = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>


      {/* TK Logo */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10
      }}>
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

      {/* Main Content */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '60px 40px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.2)',
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px',
        overflow: 'hidden'
      }}>
        {/* Corner Pins */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        
        <div style={{
          fontSize: '4rem',
          marginBottom: '20px'
        }}>
          📸
        </div>
        
        <h1 style={{
          fontSize: '2.5rem',
          color: '#00eaff',
          marginBottom: '15px',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Coming Soon
        </h1>
        
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          We're working hard to bring you an amazing gallery experience with event photos and memories!
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

      <style>
        {`
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
            50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
          }
        `}
      </style>

      <BottomNavBar />
    </div>
  );
};

export default Gallery;