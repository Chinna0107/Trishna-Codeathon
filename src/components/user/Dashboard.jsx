import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import '../../styles/user/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (userData) {
      setParticipant(JSON.parse(userData));
    }
  }, [navigate]);

  if (!participant) return null;

  const qrData = JSON.stringify({
    id: participant.id || participant._id,
    email: participant.email,
    name: participant.name,
    timestamp: Date.now()
  });
  return (
    <div className="dashboard-bg">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">TK</div>
        <nav className="sidebar-nav">
          <a className="sidebar-link active" href="#"><span className="sidebar-icon home"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon events"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon profile"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon notifications"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon settings"></span></a>
        </nav>
      </aside>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="dashboard-logo">TRISHNA 2K25</div>
          <div className="dashboard-user">Welcome, {participant.name}</div>
        </header>
        <main className="dashboard-main">
          <section className="dashboard-welcome">
            <h1>Welcome to your Dashboard</h1>
            <p>Track your registrations, events, and updates here. Explore all features and manage your profile easily.</p>
          </section>
          <section style={{ background: '#fff', padding: '30px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>Your QR Code</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '12px', display: 'inline-block' }}>
                  <QRCodeSVG value={qrData} size={200} level="H" includeMargin={true} />
                </div>
                <p style={{ marginTop: '15px', color: '#718096', fontSize: '0.9rem' }}>Show this QR code for attendance</p>
              </div>
              <div>
                <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '12px' }}>
                  <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Participant Details</h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#718096' }}>Name</p>
                      <p style={{ margin: '3px 0 0 0', fontSize: '1rem', color: '#2d3748', fontWeight: '600' }}>{participant.name}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#718096' }}>Email</p>
                      <p style={{ margin: '3px 0 0 0', fontSize: '1rem', color: '#2d3748', fontWeight: '600' }}>{participant.email}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#718096' }}>Participant ID</p>
                      <p style={{ margin: '3px 0 0 0', fontSize: '1rem', color: '#2d3748', fontWeight: '600' }}>PART-{participant.id || participant._id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="dashboard-cards">
            <div className="dashboard-card">
              <h2>My Events</h2>
              <p>View and manage your registered events.</p>
            </div>
            <div className="dashboard-card">
              <h2>Profile</h2>
              <p>Update your personal information and preferences.</p>
            </div>
            <div className="dashboard-card">
              <h2>Notifications</h2>
              <p>Stay up to date with the latest announcements.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
