import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import tkLogo from '../../assets/images/tk logo.png';
import { useNavigate } from 'react-router-dom';
// import BottomNavBar from '../sections/BottomNavBar';

const Schedule = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Schedule will be updated soon with time & dates';
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    if (!adminToken) {
      navigate('/login');
      return;
    }
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
  }, [navigate]);

  return (
    <section style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `repeating-linear-gradient(90deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px)`,
        backgroundSize: '80px 80px',
      }} />
      
      <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 18, left: 18, width: 54, height: 54, zIndex: 101 }} />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(0,234,255,0.08)',
        backdropFilter: 'blur(10px)',
        border: '2px solid #00eaff55',
        borderRadius: '20px',
        padding: '4rem 3rem',
        maxWidth: '600px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,234,255,0.2)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>
          <FaCalendarAlt style={{ color: '#00eaff' }} />
        </div>
        <h1 style={{
          color: '#00eaff',
          fontFamily: 'Orbitron, monospace',
          fontSize: '1.8rem',
          marginBottom: '2rem',
          minHeight: '60px',
          lineHeight: '1.5'
        }}>
          {typedText}<span style={{ animation: 'blink 1s infinite' }}>|</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#00eaff', opacity: 0.7 }}>
          <FaClock size={20} />
          <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', margin: 0 }}>Stay tuned for updates!</p>
        </div>
      </div>
      
      {/* <BottomNavBar /> */}
    </section>
  );
};

export default Schedule;
