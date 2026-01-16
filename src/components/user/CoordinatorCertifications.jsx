import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoordinatorMenu from './CoordinatorMenu';

const CoordinatorCertifications = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', padding: 'clamp(10px, 3vw, 20px)' }} className="cert-content">
        <style>
          {`
            @media (max-width: 768px) {
              .cert-content { margin-left: 0 !important; padding: 10px !important; padding-top: 80px !important; }
            }
          `}
        </style>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(15px, 4vw, 30px)' }}>
            <h1 style={{ color: '#37474f', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 'bold' }}>Certifications</h1>
          </div>

          <div style={{ background: '#fff', padding: 'clamp(40px, 8vw, 80px)', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: '20px' }}>🏆</div>
            <h2 style={{ color: '#37474f', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '15px', fontWeight: 'bold' }}>Coming Soon!</h2>
            <p style={{ color: '#718096', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '10px' }}>The certification management feature is under development.</p>
            <p style={{ color: '#718096', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Stay tuned for updates! 🚀</p>
            
            <div style={{ marginTop: '40px', padding: '30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '15px' }}>
              <p style={{ color: '#fff', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', margin: 0, fontWeight: '500' }}>
                💡 This page will allow you to generate and manage participant certificates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorCertifications;
