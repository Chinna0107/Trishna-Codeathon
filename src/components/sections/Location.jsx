import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaDirections } from 'react-icons/fa';
import tkLogo from '../../assets/images/tk26.png';
import BottomNavBar from './BottomNavBar';

function Location() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Find Us Here';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const locationInfo = {
    name: ' Tri-Cod 2K26',
    address: 'Annamacharya Institute of Technology & Sciences, Tirupati',
    city: 'Tirupathi, Andhra Pradesh',
    pincode: '517520',
    phone: '+91 81798 60935',
    email: 'codeathon2k26@gmail.com',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6334!2d78.486671!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjIiTiA3OMKwMjknMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890'
  };

  return (
    <section style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1rem',
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
      
      {/* Enhanced TK Logo top left */}
      <div className="logo-container" style={{
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
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          @media (max-width: 768px) {
            .logo-container {
              top: 10px !important;
              left: 10px !important;
            }
          }
        `}
      </style>
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
        <h1 style={{ 
          color: '#00eaff', 
          fontFamily: 'Orbitron, monospace', 
          fontSize: '2.5rem', 
          textAlign: 'center', 
          marginBottom: '3rem',
          minHeight: '60px'
        }}>
          {typedText}<span style={{ animation: 'blink 1s infinite' }}>|</span>
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{
            background: 'rgba(0,234,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '2px solid #00eaff33',
            borderRadius: '20px',
            padding: '2rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,234,255,0.12)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,234,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,234,255,0.08)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
              <FaMapMarkerAlt style={{ color: '#00eaff', fontSize: '2rem' }} />
              <h3 style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', margin: 0 }}>Address</h3>
            </div>
            <p style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '1rem', lineHeight: '1.6', opacity: 0.8, margin: 0 }}>
              {locationInfo.name}<br />
              {locationInfo.address}<br />
              {locationInfo.city}<br />
              PIN: {locationInfo.pincode}
            </p>
          </div>

          <div style={{
            background: 'rgba(0,234,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '2px solid #00eaff33',
            borderRadius: '20px',
            padding: '2rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,234,255,0.12)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,234,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,234,255,0.08)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
              <FaPhone style={{ color: '#00eaff', fontSize: '2rem' }} />
              <h3 style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', margin: 0 }}>Contact</h3>
            </div>
            <div style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '1rem', opacity: 0.8 }}>
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaPhone size={16} />
                <a href={`tel:${locationInfo.phone}`} style={{ color: '#00eaff', textDecoration: 'none' }}>{locationInfo.phone}</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaEnvelope size={16} />
                <a href={`mailto:${locationInfo.email}`} style={{ color: '#00eaff', textDecoration: 'none' }}>{locationInfo.email}</a>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(0,234,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '2px solid #00eaff33',
            borderRadius: '20px',
            padding: '2rem',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,234,255,0.12)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,234,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,234,255,0.08)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationInfo.address + ', ' + locationInfo.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                padding: '1.5rem',
                background: 'linear-gradient(45deg, #00eaff, #667eea)',
                borderRadius: '12px',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,234,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaDirections size={24} />
              Get Directions
            </a>
          </div>
        </div>

        <div style={{
          background: 'rgba(0,234,255,0.08)',
          backdropFilter: 'blur(10px)',
          border: '2px solid #00eaff33',
          borderRadius: '20px',
          padding: '2rem',
          overflow: 'hidden'
        }}>
          <h3 style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Campus Map
          </h3>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
            <iframe
              src={locationInfo.mapUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
                borderRadius: '12px'
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Campus Location"
            />
          </div>
        </div>
      </div>
      
      <BottomNavBar />
    </section>
  );
}

export default Location;
