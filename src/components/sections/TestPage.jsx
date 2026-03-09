import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import UserMenu from '../user/UserMenu';
import tkLogo from '../../assets/images/tk26.png';
import useRegisteredEvents from '../../hooks/useRegisteredEvents';
import '../../styles/Home.css';

const TestPage = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { events: registeredEvents, loading } = useRegisteredEvents();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sciFiBtnStyle = {
    fontFamily: 'Orbitron, monospace',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#00ff88',
    background: 'rgba(0,0,0,0.18)',
    border: '2px solid #00ff8855',
    borderRadius: 8,
    padding: '0.7em 0',
    textAlign: 'center',
    letterSpacing: 2,
    boxShadow: '0 0 4px #00ff8822',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s, border 0.2s',
    position: 'relative',
    overflow: 'hidden',
    outline: 'none',
    margin: 0,
    minWidth: 160,
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      <UserMenu />
      
      <section id="registered-events" ref={ref} style={{
        marginLeft: isMobile ? '0' : '280px',
        flex: 1,
        minHeight: '100vh',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
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

        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          <style>
            {`
              @keyframes glow {
                0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
                50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
              }
              @media (max-width: 768px) {
                .mascot-image {
                  display: none !important;
                }
              }
            `}
          </style>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem', marginTop: '5rem', padding: '0 2rem', paddingBottom: '120px', minHeight: '60vh', flexDirection: 'column' }}>
            <h2 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
              My Registered Events
            </h2>

            {loading && (
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Loading events...</p>
            )}

            {!loading && registeredEvents.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>No registered events yet</p>
            )}

            {!loading && registeredEvents.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 300px))', gap: '2rem', padding: '0 2rem', paddingBottom: '120px', justifyContent: 'center', width: '100%' }}>
                {registeredEvents.map((event, index) => (
                  <a href="#" key={event.id} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,255,136,0.2)',
                        border: '1px solid rgba(0,255,136,0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: `${index * 0.1}s`,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,255,136,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,255,136,0.2)';
                      }}
                    >
                      <div style={{ height: '200px', overflow: 'hidden', flex: 'none' }}>
                        <img 
                          src={event.image || 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647792/5_i0dcqp.png'} 
                          alt={event.name} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      </div>
                      
                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: '1.2rem', fontWeight: 700, margin: 0, marginBottom: '10px' }}>
                          {event.name}
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem', flex: 1 }}>
                          {event.description || 'Event details'}
                        </p>
                        
                        <button 
                          style={{
                            ...sciFiBtnStyle,
                            minWidth: 90,
                            minHeight: 32,
                            fontSize: '0.9rem',
                            background: 'rgba(0,255,136,0.1)',
                            color: '#00ff88',
                            border: '1px solid #00ff88',
                            textDecoration: 'none',
                            padding: '0.5rem 1rem',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            width: '100%'
                          }}
                        >
                          Take Test
                        </button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestPage;
