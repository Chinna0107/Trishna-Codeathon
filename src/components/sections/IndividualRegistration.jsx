import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import tkLogo from '../../assets/images/tk logo.png';
import BottomNavBar from './BottomNavBar';

const IndividualRegistration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    event: eventId || '',
    eventName: '',
  });

  const eventsList = [
    { id: 'project-expo', name: 'Project Expo' },
    { id: 'web-design', name: 'Web Design' },
    { id: 'hackathon', name: 'Hackathon' },
    { id: 'nextcode', name: 'NextCode' },
    { id: 'rube-cube', name: 'Rube a Cube' },
    { id: 'poster-design', name: 'Poster Design' },
    { id: 'cook-without-food', name: 'Cook Without Food' },
    { id: 'robo-race', name: 'Robo Race' },
    { id: 'over-drive', name: 'Over Drive' },
    { id: 'full-stack', name: 'Full Stack' },
    { id: 'gen-ai', name: 'Gen AI' },
    { id: 'gitt-github', name: 'Gitt & Github' },
    { id: 'iot', name: 'IOT' },
  ];

  useEffect(() => {
    if (eventId) {
      const selectedEvent = eventsList.find(e => e.id === eventId);
      setFormData(prev => ({
        ...prev,
        event: eventId,
        eventName: selectedEvent?.name || ''
      }));
    }
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Individual Registration:', formData);
    Swal.fire({
      icon: 'success',
      title: 'Registration Submitted!',
      text: 'Your registration has been submitted successfully.',
      confirmButtonColor: '#00eaff'
    }).then(() => {
      navigate('/');
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid #00eaff55',
    borderRadius: 6,
    color: '#00eaff',
    fontFamily: 'Orbitron, monospace',
    fontSize: '1rem',
    outline: 'none',
  };

  return (
    <section style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
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
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '5rem auto' }}>
        <button onClick={() => navigate('/events')} style={{
          color: '#00eaff',
          background: 'transparent',
          border: '1px solid #00eaff55',
          padding: '0.5rem 1rem',
          borderRadius: 6,
          cursor: 'pointer',
          marginBottom: '2rem',
          fontFamily: 'Orbitron, monospace',
        }}>
          ← Back
        </button>
        
        <h1 style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          Individual Registration
        </h1>
        {formData.eventName && <p style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center', fontWeight: 600 }}>Event: {formData.eventName}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={inputStyle}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="College Name"
            value={formData.college}
            onChange={(e) => setFormData({...formData, college: e.target.value})}
            style={inputStyle}
            required
          />
          
          <button type="submit" style={{
            padding: '1rem',
            background: 'linear-gradient(90deg, #00eaff 0%, #0057ff 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: '1.1rem',
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '1rem',
          }}>
            Submit Registration
          </button>
        </form>
      </div>
      
      <BottomNavBar />
    </section>
  );
};

export default IndividualRegistration;
