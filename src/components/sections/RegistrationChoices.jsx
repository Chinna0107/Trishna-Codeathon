import { Link, useParams, Navigate } from 'react-router-dom';
import tkLogo from '../../assets/images/tk logo.png';
import BottomNavBar from './BottomNavBar';

const RegistrationChoices = () => {
  const { eventId } = useParams();
  
  if (eventId) {
    return <Navigate to={`/register/individual/${eventId}`} replace />;
  }
  
  return (
    <section style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
      
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 700 }}>
          Choose Registration Type
        </h1>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/register/individual" style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#00eaff',
            background: 'rgba(0,0,0,0.18)',
            border: '2px solid #00eaff55',
            borderRadius: 8,
            padding: '2rem 3rem',
            textDecoration: 'none',
            transition: 'all 0.3s',
            minWidth: 250,
            boxShadow: '0 0 20px rgba(0,234,255,0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0,234,255,0.18)';
            e.target.style.boxShadow = '0 0 30px rgba(0,234,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.18)';
            e.target.style.boxShadow = '0 0 20px rgba(0,234,255,0.3)';
          }}>
            Individual
          </Link>
          
          <Link to="/register/team" style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#00eaff',
            background: 'rgba(0,0,0,0.18)',
            border: '2px solid #00eaff55',
            borderRadius: 8,
            padding: '2rem 3rem',
            textDecoration: 'none',
            transition: 'all 0.3s',
            minWidth: 250,
            boxShadow: '0 0 20px rgba(0,234,255,0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0,234,255,0.18)';
            e.target.style.boxShadow = '0 0 30px rgba(0,234,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.18)';
            e.target.style.boxShadow = '0 0 20px rgba(0,234,255,0.3)';
          }}>
            Team
          </Link>
        </div>
      </div>
      
      <BottomNavBar />
    </section>
  );
};

export default RegistrationChoices;
