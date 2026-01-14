import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import tkLogo from '../../assets/images/tk logo.png'
import BottomNavBar from './BottomNavBar'

const coordinators = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Event Coordinator",
    department: "Computer Science",
    email: "alex@tricod.com",
    phone: "+91 9876543210",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Technical Lead",
    department: "Information Technology",
    email: "sarah@tricod.com",
    phone: "+91 9876543211",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Raj Patel",
    role: "Robotics Coordinator",
    department: "Mechanical Engineering",
    email: "raj@tricod.com",
    phone: "+91 9876543212",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Design Head",
    department: "Computer Science",
    email: "emily@tricod.com",
    phone: "+91 9876543213",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Michael Kumar",
    role: "Logistics Manager",
    department: "Electronics",
    email: "michael@tricod.com",
    phone: "+91 9876543214",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Marketing Lead",
    department: "Information Technology",
    email: "priya@tricod.com",
    phone: "+91 9876543215",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face"
  }
]

function Coordinators() {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      padding: '50px 20px',
      position: 'relative'
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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '60px', position: 'relative' }}
        >
          <button
            onClick={() => navigate('/events')}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              padding: '12px 24px',
              background: 'rgba(0,234,255,0.1)',
              color: '#00eaff',
              border: '1px solid #00eaff55',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'Orbitron, monospace',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0,234,255,0.2)';
              e.target.style.boxShadow = '0 0 20px rgba(0,234,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0,234,255,0.1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ← Back
          </button>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#00eaff',
            textShadow: '0 0 20px rgba(0,234,255,0.5)',
            marginBottom: '20px',
            fontFamily: 'Orbitron, monospace'
          }}>
            🎯 Meet Our Team
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#00eaff',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'Orbitron, monospace',
            opacity: 0.8
          }}>
            The brilliant minds behind TechnoKriti 2K25
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {coordinators.map((coordinator, index) => (
            <motion.div
              key={coordinator.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(coordinator.id)}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                background: 'rgba(0,234,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
                border: '1px solid #00eaff33',
                boxShadow: hoveredCard === coordinator.id 
                  ? '0 20px 40px rgba(0,234,255,0.3)' 
                  : '0 10px 30px rgba(0,234,255,0.1)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  overflow: 'hidden',
                  border: '4px solid #00eaff55',
                  boxShadow: '0 10px 30px rgba(0,234,255,0.3)'
                }}
              >
                <img
                  src={coordinator.image}
                  alt={coordinator.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#00eaff',
                marginBottom: '8px',
                textShadow: '0 0 10px rgba(0,234,255,0.5)',
                fontFamily: 'Orbitron, monospace'
              }}>
                {coordinator.name}
              </h3>

              <div style={{
                background: 'linear-gradient(45deg, #00eaff, #667eea)',
                padding: '6px 16px',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                <span style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  {coordinator.role}
                </span>
              </div>

              <p style={{
                color: '#00eaff',
                fontSize: '1rem',
                marginBottom: '15px',
                opacity: 0.9
              }}>
                📚 {coordinator.department}
              </p>

              <div style={{
                background: 'rgba(0,234,255,0.05)',
                borderRadius: '15px',
                padding: '15px',
                marginTop: '20px',
                border: '1px solid #00eaff22'
              }}>
                <div style={{
                  color: '#00eaff',
                  fontSize: '0.9rem',
                  marginBottom: '8px',
                  opacity: 0.9
                }}>
                  📧 {coordinator.email}
                </div>
                <div style={{
                  color: '#00eaff',
                  fontSize: '0.9rem',
                  opacity: 0.9
                }}>
                  📱 {coordinator.phone}
                </div>
              </div>

              {hoveredCard === coordinator.id && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '1.5rem',
                  animation: 'pulse 2s infinite'
                }}>
                  ✨
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '40px',
            background: 'rgba(0,234,255,0.08)',
            borderRadius: '20px',
            border: '1px solid #00eaff33'
          }}
        >
          <h3 style={{
            color: '#00eaff',
            fontSize: '1.8rem',
            marginBottom: '15px',
            fontFamily: 'Orbitron, monospace'
          }}>
            Ready to Join TechnoKriti 2K25? 🚀
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/events')}
            style={{
              padding: '15px 40px',
              background: 'linear-gradient(45deg, #00eaff, #667eea)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'Orbitron, monospace'
            }}
          >
            Explore Events 🎯
          </motion.button>
        </motion.div>
      </div>
      
      <BottomNavBar />
    </div>
  )
}

export default Coordinators
