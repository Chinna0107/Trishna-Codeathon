import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import tkLogo from '../../assets/images/tk26.png';
import BottomNavBar from './BottomNavBar';

const Schedule = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Schedule will be updated soon with time & dates';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>

      
      {/* Enhanced TK Logo top left */}
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
      
      <style>
        {`
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
            50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
          }
        `}
      </style>
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '20px',
        padding: '60px 40px',
        maxWidth: '600px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        overflow: 'hidden'
      }}>
        {/* Corner Pins */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#ff0000', borderRadius: '50%' }}></div>
        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>
          <FaCalendarAlt style={{ color: '#00eaff' }} />
        </div>
        <h1 style={{
          color: '#00eaff',
          fontFamily: 'Orbitron, monospace',
          fontSize: '2.5rem',
          marginBottom: '15px',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Coming Soon
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontFamily: 'Orbitron, monospace',
          fontSize: '1.1rem',
          marginBottom: '30px',
          lineHeight: '1.6',
          minHeight: '60px'
        }}>
          {typedText}<span style={{ animation: 'blink 1s infinite' }}>|</span>
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '15px 30px',
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FaClock size={20} />
          📅 Feature Under Development
        </div>
      </div>
      
      <BottomNavBar />
    </section>
  );
};

export default Schedule;
