import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import tkLogo from '../../assets/images/tk logo.png'
import BottomNavBar from './BottomNavBar'

function Contact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: "We'll get back to you soon.",
      confirmButtonColor: '#00eaff'
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const subjects = [
    { value: 'registration', label: '📝 Registration Query' },
    { value: 'technical', label: '💻 Technical Support' },
    { value: 'sponsorship', label: '🤝 Sponsorship' },
    { value: 'general', label: '❓ General Inquiry' },
    { value: 'media', label: '📺 Media & Press' },
    { value: 'volunteer', label: '🙋 Volunteer Opportunity' }
  ]

  const contactInfo = [
    { 
      icon: '📧', 
      title: 'Email', 
      info: 'tri-cod@gmail.com', 
      desc: 'Send us an email anytime',
      action: () => window.open('mailto:tri-cod@gmail.com')
    },
    { 
      icon: '📱', 
      title: 'Phone', 
      info: '+91 8179860935', 
      desc: 'Call us during office hours',
      action: () => window.open('tel:+918179860935')
    },
    { 
      icon: '📍', 
      title: 'Address', 
      info: 'AITS, Tirupati', 
      desc: 'Annamacharya Institute of Technology & Sciences',
      action: () => window.open('https://maps.google.com/?q=AITS+Tirupati')
    },
    { 
      icon: '🕒', 
      title: 'College Hours', 
      info: '9:30 AM - 5:00 PM', 
      desc: 'Monday to Saturday'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      padding: '50px 20px',
      position: 'relative',
      overflow: 'hidden'
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
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .contact-card {
          transition: all 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .form-input {
          transition: all 0.3s ease;
        }
        .form-input:focus {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(255,255,255,0.3);
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
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
              fontFamily: 'Orbitron, monospace'
            }}
          >
            ← Back
          </button>

          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: '#00eaff',
              textShadow: '0 0 20px rgba(0,234,255,0.5)',
              marginBottom: '20px',
              fontFamily: 'Orbitron, monospace'
            }}
          >
            📞 Get In Touch
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '1.2rem',
              color: '#00eaff',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontFamily: 'Orbitron, monospace',
              opacity: 0.8
            }}
          >
            Have questions about TechnoKriti 2K25? We're here to help!
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
          gap: '50px',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="contact-card"
            style={{
              background: 'rgba(0,234,255,0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '50px',
              border: '1px solid #00eaff33',
              boxShadow: '0 15px 35px rgba(0,234,255,0.1)'
            }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                color: '#00eaff',
                fontSize: '2.5rem',
                marginBottom: '30px',
                textAlign: 'center',
                textShadow: '0 0 10px rgba(0,234,255,0.5)',
                fontFamily: 'Orbitron, monospace'
              }}
            >
              📝 Send Us a Message
            </motion.h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{
                    padding: '18px',
                    borderRadius: '15px',
                    border: '2px solid transparent',
                    outline: 'none',
                    fontSize: '1.1rem',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#333',
                    fontWeight: '500'
                  }}
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    padding: '18px',
                    borderRadius: '15px',
                    border: '2px solid transparent',
                    outline: 'none',
                    fontSize: '1.1rem',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#333',
                    fontWeight: '500'
                  }}
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                style={{
                  padding: '18px',
                  borderRadius: '15px',
                  border: '2px solid transparent',
                  outline: 'none',
                  fontSize: '1.1rem',
                  background: 'rgba(255,255,255,0.95)',
                  color: '#333',
                  fontWeight: '500'
                }}
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
                style={{
                  padding: '18px',
                  borderRadius: '15px',
                  border: '2px solid transparent',
                  outline: 'none',
                  fontSize: '1.1rem',
                  background: 'rgba(255,255,255,0.95)',
                  color: '#333',
                  fontWeight: '500'
                }}
              >
                <option value="">Select Subject *</option>
                {subjects.map(subject => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="form-input"
                style={{
                  padding: '18px',
                  borderRadius: '15px',
                  border: '2px solid transparent',
                  outline: 'none',
                  fontSize: '1.1rem',
                  background: 'rgba(255,255,255,0.95)',
                  color: '#333',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  fontWeight: '500'
                }}
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                style={{
                  padding: '20px 40px',
                  background: isSubmitting 
                    ? 'linear-gradient(45deg, #ccc, #999)' 
                    : 'linear-gradient(45deg, #00eaff, #667eea)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 25px rgba(0,234,255,0.2)',
                  fontFamily: 'Orbitron, monospace',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #fff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Sending...
                  </span>
                ) : (
                  'Send Message 🚀'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{ display: 'grid', gap: '20px' }}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="contact-card"
                onClick={contact.action}
                style={{
                  background: 'rgba(0,234,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '30px',
                  border: '1px solid #00eaff33',
                  boxShadow: '0 10px 30px rgba(0,234,255,0.1)',
                  cursor: contact.action ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '25px'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${index * 0.5}s`
                }}>
                  {contact.icon}
                </div>
                <div>
                  <h3 style={{
                    color: '#00eaff',
                    fontSize: '1.4rem',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    fontFamily: 'Orbitron, monospace'
                  }}>
                    {contact.title}
                  </h3>
                  <p style={{
                    color: '#00eaff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>
                    {contact.info}
                  </p>
                  <p style={{
                    color: '#00eaff',
                    fontSize: '1rem',
                    margin: 0,
                    lineHeight: '1.4',
                    opacity: 0.8
                  }}>
                    {contact.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: '60px',
            background: 'rgba(0,234,255,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid #00eaff33',
            textAlign: 'center'
          }}
        >
          <h3 style={{
            color: '#00eaff',
            fontSize: '2.5rem',
            marginBottom: '30px',
            fontFamily: 'Orbitron, monospace'
          }}>
            🗺️ Find Us
          </h3>
          <div style={{
            background: 'rgba(0,234,255,0.05)',
            borderRadius: '20px',
            padding: '40px',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            color: '#00eaff',
            border: '1px solid #00eaff22'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📍</div>
            <strong style={{ fontFamily: 'Orbitron, monospace' }}>Interactive Map Coming Soon</strong>
            <p style={{ marginTop: '15px', fontSize: '1.1rem', opacity: 0.8, fontFamily: 'Orbitron, monospace' }}>
              AITS Campus, Tirupati, Andhra Pradesh<br/>
              Annamacharya Institute of Technology & Sciences
            </p>
          </div>
        </motion.div>
      </div>
      
      <BottomNavBar />
    </div>
  )
}

export default Contact
