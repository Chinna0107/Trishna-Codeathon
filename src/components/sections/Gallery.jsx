import React from 'react';
import tkLogo from '../../assets/images/tk26.png';
import BottomNavBar from './BottomNavBar';

const Gallery = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      {/* Blue grid overlay */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundImage: `repeating-linear-gradient(90deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px)`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'center',
      }} />

      {/* TK Logo */}
      <div style={{
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 101
      }}>
        <img 
          src={tkLogo} 
          alt="TK Logo" 
          style={{ 
            width: 54, 
            height: 54,
            filter: 'drop-shadow(0 0 8px rgba(0,234,255,0.6)) brightness(1.1)'
          }} 
        />
      </div>

      {/* Main Content */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,234,255,0.2)',
        border: '1px solid rgba(0,234,255,0.3)',
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px'
      }}>
        <h1 style={{
          color: '#00eaff',
          fontFamily: 'Orbitron, monospace',
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(0,234,255,0.5)'
        }}>
          Gallery
        </h1>
        
        <div style={{
          fontSize: '6rem',
          marginBottom: '2rem'
        }}>
          📸
        </div>
        
        <h2 style={{
          color: '#00eaff',
          fontFamily: 'Orbitron, monospace',
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          Updates Soon
        </h2>
        
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          We're working hard to bring you an amazing gallery experience. 
          Check back soon for event photos, memories, and highlights from TRISHNA 2K25!
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px'
        }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#00eaff',
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>

      <BottomNavBar />
    </div>
  );
};

export default Gallery;