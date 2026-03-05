import React, { useState, useMemo } from "react";
import tkLogo from '../../assets/images/tk26.png';
import BottomNavBar from './BottomNavBar';

const schedule = {
  day1: [
    { time: "09:30 AM", event: "Inauguration", category: "ceremony", duration: "1 hour", icon: "🎉", desc: "Opening ceremony & welcome address", venue: "Main Auditorium" },
    { time: "10:30 AM ", event: "Web Development", category: "development", duration: "24 hours", icon: "🌐", desc: "Build responsive websites", venue: "Lab A" },
    { time: "10:30 AM ", event: "Hackathon", category: "development", duration: "24 hours", icon: "💻", desc: "24-hour coding marathon", venue: "Lab B & C" },
    { time: "10.30 AM ", event: "Crack The Code", category: "development", duration: "4 hours", icon: "🧠", desc: "Test your technical knowledge", venue: "Seminar Hall" },
  ],
  day2: [
    { time: "09:30 AM", event: "Tech Quiz", category: "competitive", duration: "5 hours", icon: "🧠", desc: "Test your technical knowledge", venue: "Seminar Hall" },
    { time: "09.30 AM ", event: "Circuitron", category: "competitive", duration: "5 hours", icon: "⚡", desc: "Electronics & circuit design", venue: "Lab D" },
    { time: "09:30 AM ", event: "Presentation", category: "competitive", duration: "1.5 hours", icon: "🎤", desc: "Showcase your projects", venue: "Main Auditorium" },
    { time: "05:30 PM", event: "Closing Ceremony", category: "ceremony", duration: "1 hour", icon: "🏆", desc: "Prize distribution & awards", venue: "Main Auditorium" },
  ]
};

function Schedules() {
  const [activeDay, setActiveDay] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredLegend, setHoveredLegend] = useState(null);

  const getColor = (category) => {
    if (category === "development") return "#00ff88";
    if (category === "competitive") return "#00ccff";
    return "#ffaa00";
  };

  const getGradient = (category) => {
    if (category === "development") return "linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05))";
    if (category === "competitive") return "linear-gradient(135deg, rgba(0,204,255,0.15), rgba(0,204,255,0.05))";
    return "linear-gradient(135deg, rgba(255,170,0,0.15), rgba(255,170,0,0.05))";
  };

  const EventCard = ({ item, idx, isMobile }) => (
    <div
      key={idx}
      style={{
        display: "flex",
        gap: isMobile ? "15px" : "25px",
        marginBottom: isMobile ? "25px" : "35px",
        animation: `slideIn 0.6s ease-out ${idx * 0.1}s both`
      }}
      onMouseEnter={() => !isMobile && setHoveredCard(idx)}
      onMouseLeave={() => !isMobile && setHoveredCard(null)}
    >
      {/* Timeline dot and line */}
      <div style={{ position: "relative", width: isMobile ? "40px" : "60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {idx < (activeDay === 1 ? schedule.day1.length - 1 : schedule.day2.length - 1) && (
          <div style={{
            position: "absolute",
            top: isMobile ? "35px" : "50px",
            left: "50%",
            width: "3px",
            height: isMobile ? "calc(100% + 25px)" : "calc(100% + 35px)",
            background: `linear-gradient(180deg, ${getColor(item.category)}, ${getColor(item.category)}40)`,
            transform: "translateX(-50%)",
            zIndex: 0
          }} />
        )}
        
        <div style={{
          width: isMobile ? "24px" : "32px",
          height: isMobile ? "24px" : "32px",
          background: getColor(item.category),
          borderRadius: "50%",
          border: "4px solid #000",
          boxShadow: `0 0 20px ${getColor(item.category)}, inset 0 0 10px rgba(255,255,255,0.3)`,
          zIndex: 2,
          transition: "all 0.3s ease",
          transform: hoveredCard === idx ? "scale(1.3)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isMobile ? "0.8rem" : "1rem"
        }}>
          {item.icon}
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
        style={{
          flex: 1,
          background: getGradient(item.category),
          border: `2px solid ${getColor(item.category)}`,
          borderRadius: isMobile ? "10px" : "14px",
          padding: isMobile ? "16px 18px" : "24px 28px",
          backdropFilter: "blur(15px)",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          cursor: "pointer",
          transform: hoveredCard === idx ? "translateX(15px) scale(1.03)" : "translateX(0)",
          boxShadow: hoveredCard === idx 
            ? `0 15px 40px ${getColor(item.category)}50, inset 0 1px 0 rgba(255,255,255,0.2)` 
            : `0 8px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
          position: "relative",
          overflow: "hidden",
          maxHeight: expandedCard === idx ? "500px" : "auto"
        }}>
        {hoveredCard === idx && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${getColor(item.category)}10, transparent)`,
            pointerEvents: "none"
          }} />
        )}

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Time */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px"
          }}>
            <span style={{
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              animation: hoveredCard === idx ? "pulse 0.6s ease-in-out" : "none"
            }}>
              {item.icon}
            </span>
            <p style={{
              color: getColor(item.category),
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              margin: 0,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              ⏰ {item.time}
            </p>
          </div>

          {/* Event title */}
          <h3 style={{
            color: "#fff",
            fontSize: isMobile ? "1.2rem" : "1.5rem",
            margin: "8px 0",
            fontFamily: "Orbitron, monospace",
            fontWeight: "bold",
            letterSpacing: "0.5px"
          }}>
            {item.event}
          </h3>

          {/* Description */}
          <p style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            margin: "8px 0",
            lineHeight: "1.4"
          }}>
            {item.desc}
          </p>

          {/* Expanded content */}
          {expandedCard === idx && (
            <div style={{
              marginTop: "15px",
              paddingTop: "15px",
              borderTop: `1px solid ${getColor(item.category)}30`,
              animation: "slideIn 0.3s ease-out"
            }}>
              <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
                <span style={{ color: getColor(item.category), fontWeight: "bold" }}>📍 Venue:</span>
                <span style={{ color: "rgba(255,255,255,0.8)" }}>{item.venue}</span>
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <span style={{ color: getColor(item.category), fontWeight: "bold" }}>👥 Participants:</span>
                <span style={{ color: "rgba(255,255,255,0.8)" }}>Limited Seats</span>
              </div>
            </div>
          )}

          {/* Footer info */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: `1px solid ${getColor(item.category)}30`
          }}>
            <span style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: isMobile ? "0.75rem" : "0.85rem"
            }}>
              ⏱️ {item.duration}
            </span>
            <span style={{
              background: getColor(item.category),
              color: "#000",
              padding: isMobile ? "5px 10px" : "6px 12px",
              borderRadius: "20px",
              fontSize: isMobile ? "0.7rem" : "0.8rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {item.category === "development" ? "🔧 Dev" : item.category === "competitive" ? "🏆 Comp" : "🎉 Event"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const isMobile = window.innerWidth < 768;
  const currentEvents = activeDay === 1 ? schedule.day1 : schedule.day2;

  const memoizedEventCards = useMemo(() => {
    return currentEvents.map((item, idx) => (
      <EventCard key={idx} item={item} idx={idx} isMobile={isMobile} />
    ));
  }, [activeDay, isMobile]);

  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      padding: isMobile ? '40px 20px 180px' : '60px 50px 120px',
      fontFamily: 'Orbitron, monospace',
      color: '#fff',
      position: 'relative',
      overflow: 'auto'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 50%, rgba(0,255,136,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,204,255,0.08) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      {/* TK Logo */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
        <img src={tkLogo} alt="TK26 Logo" style={{ height: '35px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2)', animation: 'glow 2s ease-in-out infinite alternate' }} />
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
          50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px', marginTop: '40px', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: isMobile ? '2.2rem' : '3.8rem', color: '#00ff88', textShadow: '0 0 40px rgba(0,255,136,0.7)', marginBottom: '15px', fontWeight: 'bold', letterSpacing: '3px' }}>
          📅 CODEATHON 2K26
        </h1>
        <p style={{ fontSize: isMobile ? '1rem' : '1.4rem', color: '#00ff88', opacity: 0.85, marginBottom: '8px', fontWeight: '600' }}>Event Schedule & Timeline</p>
        <p style={{ fontSize: isMobile ? '0.9rem' : '1.1rem', color: '#00ccff', opacity: 0.75 }}>24th - 25th March 2026 | AITS, Tirupati</p>
      </div>

      {/* Scrolling Notice Banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(255,170,0,0.15), rgba(255,170,0,0.05))',
        border: '2px solid rgba(255,170,0,0.3)',
        borderRadius: '10px',
        padding: isMobile ? '12px 15px' : '15px 20px',
        marginBottom: isMobile ? '30px' : '50px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'flex',
          gap: '50px',
          animation: 'scroll 40s linear infinite'
        }}>
          <p style={{
            color: '#ffaa00',
            fontSize: isMobile ? '0.85rem' : '0.95rem',
            margin: 0,
            fontWeight: '600',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            ⚠️ Notice: The schedule timings may change according to the events and will notify the schedules if any changes done. Team CODEATHON 2K26.
          </p>
          <p style={{
            color: '#ffaa00',
            fontSize: isMobile ? '0.85rem' : '0.95rem',
            margin: 0,
            fontWeight: '600',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            ⚠️ Notice: The schedule timings may change according to the events and will notify the schedules if any changes done. Team CODEATHON 2K26
          </p>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Day Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '12px' : '25px', marginBottom: isMobile ? '35px' : '55px', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
        {[1, 2].map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            style={{
              padding: isMobile ? '11px 22px' : '14px 35px',
              background: activeDay === day ? 'linear-gradient(135deg, #00ff88, #00cc66)' : 'rgba(0,255,136,0.1)',
              border: `2px solid ${activeDay === day ? '#00ff88' : 'rgba(0,255,136,0.3)'}`,
              color: activeDay === day ? '#000' : '#00ff88',
              borderRadius: '10px',
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontFamily: 'Orbitron, monospace',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              boxShadow: activeDay === day ? '0 0 25px rgba(0,255,136,0.6)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeDay !== day) {
                e.target.style.background = 'rgba(0,255,136,0.2)';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeDay !== day) {
                e.target.style.background = 'rgba(0,255,136,0.1)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            Day {day} - March {23 + day}
          </button>
        ))}
      </div>

      {/* Timeline Container */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {memoizedEventCards}
      </div>

      {/* Stats Section */}
      <div style={{
        marginTop: isMobile ? '60px' : '100px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? '15px' : '25px',
        maxWidth: '1000px',
        margin: isMobile ? '60px auto 0' : '100px auto 0',
        position: 'relative',
        zIndex: 1
      }}>
        {[
          { label: 'Total Events', value: '6', icon: '🎯' },
          { label: 'Total Hours', value: '48', icon: '⏱️' },
          { label: 'Registrations', value: 'On going', icon: '👥' },
          { label: 'Prizes', value: 'Surprise gifts', icon: '🏆' }
        ].map((stat, idx) => (
          <div key={idx} 
            onMouseEnter={() => !isMobile && setHoveredStat(idx)}
            onMouseLeave={() => !isMobile && setHoveredStat(null)}
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,204,255,0.05))',
              border: '2px solid rgba(0,255,136,0.25)',
              borderRadius: '12px',
              padding: isMobile ? '15px' : '20px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${idx * 0.2}s`,
              transition: 'all 0.3s ease',
              transform: hoveredStat === idx ? 'scale(1.08) translateY(-8px)' : 'scale(1)',
              boxShadow: hoveredStat === idx ? '0 20px 50px rgba(0,255,136,0.4)' : '0 8px 20px rgba(0,0,0,0.3)',
              cursor: 'pointer'
            }}>
            <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '8px', transition: 'transform 0.3s ease', transform: hoveredStat === idx ? 'scale(1.2) rotate(10deg)' : 'scale(1)' }}>{stat.icon}</div>
            <p style={{ color: '#00ff88', fontWeight: 'bold', fontSize: isMobile ? '1.2rem' : '1.5rem', margin: '0 0 5px 0', transition: 'color 0.3s ease', color: hoveredStat === idx ? '#00ffaa' : '#00ff88' }}>{stat.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? '0.8rem' : '0.9rem', margin: 0 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      {/* Removed legend section */}

      <BottomNavBar />
    </div>
  );
}

export default Schedules;
