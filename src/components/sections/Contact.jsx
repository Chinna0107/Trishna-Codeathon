import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import tkLogo from '../../assets/images/tk26.png'
import BottomNavBar from './BottomNavBar'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [hoveredField, setHoveredField] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const isMobile = window.innerWidth < 768

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    const whatsappMessage = `Hello! I'm ${formData.name}\n\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/918179860935?text=${encodedMessage}`
    
    setSubmitted(true)
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
      setLoading(false)
    }, 500)
  }

  const contacts = [
    { name: 'Hemanth', phone: '8179860935', ws: 'https://wa.me/918179860935' },
    { name: 'Jagadeesh', phone: '9177067341', ws: 'https://wa.me/919177067341' }
  ]

  const allCards = [
    ...contacts,
    { Icon: FaEnvelope, title: 'Email', text: 'codeathon2k26@gmail.com', link: 'mailto:codeathon2k26@gmail.com', isContact: false }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      padding: isMobile ? '30px 16px 180px' : '100px 60px 120px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        position: 'absolute',
        top: isMobile ? '-30%' : '-50%',
        right: isMobile ? '-20%' : '-10%',
        width: isMobile ? '300px' : '500px',
        height: isMobile ? '300px' : '500px',
        background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 20s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '-30%' : '-20%',
        left: isMobile ? '-15%' : '-5%',
        width: isMobile ? '250px' : '400px',
        height: isMobile ? '250px' : '400px',
        background: 'radial-gradient(circle, rgba(0,234,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 25s ease-in-out infinite reverse'
      }} />

      <img src={tkLogo} alt="Logo" style={{ position: 'absolute', top: '15px', left: '16px', height: '30px', zIndex: 10 }} />

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(30px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        input:focus, textarea:focus { outline: none; }
        @media (max-width: 768px) {
          input, textarea { font-size: 16px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1500px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '50px' : '80px', marginTop: isMobile ? '30px' : '20px' }}>
          <h1 style={{
            fontSize: isMobile ? '1.8rem' : '4rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00ff88 0%, #00eaff 50%, #667eea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: isMobile ? '15px' : '20px',
            letterSpacing: '-1px',
            lineHeight: '1.2'
          }}>
            Let's Connect
          </h1>
          <div style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, #00ff88, #00eaff)',
            margin: isMobile ? '15px auto 20px' : '20px auto 30px',
            borderRadius: '2px'
          }} />
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1.2rem',
            color: '#a0a0b0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Have questions about Codeathon 2K26? We're here to help!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'stretch',
          minHeight: '600px'
        }}>
          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '18px' : '24px' }}>
              {[
                { name: 'name', label: 'Full Name', type: 'text', icon: FaPhone },
                { name: 'email', label: 'Email Address', type: 'email', icon: FaEnvelope },
                { name: 'phone', label: 'Phone (Optional)', type: 'tel', icon: FaPhone },
                { name: 'subject', label: 'Subject', type: 'text', icon: FaMapMarkerAlt }
              ].map((field, idx) => {
                const IconComponent = field.icon
                return (
                  <div key={field.name} style={{ position: 'relative', animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <IconComponent style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#00ff88' }} />
                      <label style={{
                        color: '#a0a0b0',
                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {field.label}
                      </label>
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setHoveredField(field.name)}
                      onBlur={() => setHoveredField(null)}
                      placeholder={field.label}
                      required={field.name !== 'phone'}
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: isMobile ? '14px 14px' : '16px 18px',
                        background: hoveredField === field.name ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
                        border: `2px solid ${hoveredField === field.name ? '#00ff88' : 'rgba(0,255,136,0.15)'}`,
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: isMobile ? '1rem' : '1rem',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: hoveredField === field.name ? '0 0 30px rgba(0,255,136,0.2)' : 'none',
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? 'not-allowed' : 'text'
                      }}
                    />
                  </div>
                )
              })}

              <div style={{ position: 'relative', animation: 'slideUp 0.6s ease-out 0.4s both' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaEnvelope style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#00ff88' }} />
                  <label style={{
                    color: '#a0a0b0',
                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Message
                  </label>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setHoveredField('message')}
                  onBlur={() => setHoveredField(null)}
                  placeholder="Tell us about your inquiry..."
                  rows={isMobile ? "4" : "6"}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: isMobile ? '14px 14px' : '16px 18px',
                    background: hoveredField === 'message' ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${hoveredField === 'message' ? '#00ff88' : 'rgba(0,255,136,0.15)'}`,
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: isMobile ? '1rem' : '1rem',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: hoveredField === 'message' ? '0 0 30px rgba(0,255,136,0.2)' : 'none',
                    fontFamily: 'inherit',
                    resize: 'none',
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? 'not-allowed' : 'text'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: isMobile ? '14px 32px' : '16px 40px',
                  background: loading ? 'rgba(0,255,136,0.5)' : 'linear-gradient(135deg, #00ff88 0%, #00eaff 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 10px 40px rgba(0,255,136,0.3)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  marginTop: '10px',
                  animation: 'slideUp 0.6s ease-out 0.5s both',
                  width: isMobile ? '100%' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile && !loading) {
                    e.target.style.transform = 'translateY(-4px)'
                    e.target.style.boxShadow = '0 20px 60px rgba(0,255,136,0.5)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile && !loading) {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 10px 40px rgba(0,255,136,0.3)'
                  }
                }}
              >
                {loading && <div style={{ width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.3)', borderTop: '2px solid #000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
                {loading ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '30px' : '40px', padding: isMobile ? '0' : '20px', height: '100%' }}>
            <div style={{
              display: 'flex',
              gap: isMobile ? '6px' : '10px',
              justifyContent: 'center',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              overflowX: isMobile ? 'auto' : 'visible'
            }}>
              {allCards.map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  padding: isMobile ? '10px 12px' : '14px 16px',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`,
                  minWidth: isMobile ? '120px' : '140px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                }} onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }
                }} onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }
                }}>
                  {item.isContact !== false ? (
                    <>
                      <h3 style={{ color: '#00ff88', fontWeight: '700', marginBottom: '8px', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                        {item.name}
                      </h3>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '8px' }}>
                        <a href={`tel:${item.phone}`} style={{
                          padding: '4px 8px',
                          background: 'rgba(0,255,136,0.2)',
                          border: '1px solid #00ff88',
                          borderRadius: '4px',
                          color: '#00ff88',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '3px',
                          fontWeight: '600',
                          fontSize: '0.65rem',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }} onMouseEnter={(e) => {
                          e.target.style.background = '#00ff88'
                          e.target.style.color = '#000'
                        }} onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(0,255,136,0.2)'
                          e.target.style.color = '#00ff88'
                        }}>
                          <FaPhone size={10} /> Call
                        </a>
                        <a href={item.ws} target="_blank" rel="noopener noreferrer" style={{
                          padding: '4px 8px',
                          background: 'rgba(52,211,153,0.2)',
                          border: '1px solid #34d399',
                          borderRadius: '4px',
                          color: '#34d399',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '3px',
                          fontWeight: '600',
                          fontSize: '0.65rem',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }} onMouseEnter={(e) => {
                          e.target.style.background = '#34d399'
                          e.target.style.color = '#000'
                        }} onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(52,211,153,0.2)'
                          e.target.style.color = '#34d399'
                        }}>
                          <FaWhatsapp size={10} /> WA
                        </a>
                      </div>
                      <p style={{ color: '#a0a0b0', fontSize: '0.7rem', margin: 0 }}>
                        {item.phone}
                      </p>
                    </>
                  ) : (
                    <a href={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <item.Icon style={{ fontSize: '1.2rem', marginBottom: '6px', color: item.title === 'Email' ? '#00eaff' : '#667eea' }} />
                      <h3 style={{ color: item.title === 'Email' ? '#00eaff' : '#667eea', fontWeight: '700', marginBottom: '4px', fontSize: '0.8rem' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: '#a0a0b0', fontSize: '0.65rem', margin: 0 }}>
                        {item.text}
                      </p>
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: isMobile ? '14px' : '16px',
              overflow: 'hidden',
              flex: 1,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              position: 'relative',
              animation: 'slideUp 0.6s ease-out 0.3s both'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3840.7701234567!2d79.4969104!3d13.6638794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sAnnamacharya%20Institute%20of%20Technology%20%26%20Sciences!2s13.6638742,79.4994853!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 'none', filter: 'invert(0.9) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  )
}

export default Contact
