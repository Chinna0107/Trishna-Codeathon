import React from 'react';
import UserMenu from '../user/UserMenu';

const TestPage = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <UserMenu />
      <div style={{ marginLeft: '280px', flex: 1, padding: '40px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="dashboard-wrapper">
        <style>
          {`
            @media (max-width: 768px) {
              .dashboard-wrapper { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
            }
          `}
        </style>
        
        <div style={{ 
          textAlign: 'center', 
          background: '#fff', 
          padding: '60px 40px', 
          borderRadius: '20px', 
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚧</div>
          <h1 style={{ fontSize: '2.5rem', color: '#2d3748', marginBottom: '15px', fontWeight: 'bold' }}>
            Coming Soon
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#718096', marginBottom: '30px', lineHeight: 1.6 }}>
            We're working hard to bring you an amazing test experience. Stay tuned for updates!
          </p>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '15px 30px', 
            borderRadius: '12px', 
            color: '#fff', 
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            📅 Feature Under Development
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;