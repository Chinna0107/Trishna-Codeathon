import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const user = localStorage.getItem('user');
    
    if (!adminToken && (!user || JSON.parse(user).role !== 'admin')) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setAdmin(JSON.parse(user));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!admin) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.welcomeCard}>
        <h2 style={styles.welcomeText}>Welcome, {admin.name}!</h2>
        <p style={styles.roleText}>Administrator</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/admin/dashboard')}>
          <div style={styles.cardIcon}>👥</div>
          <h3 style={styles.cardTitle}>Manage Users</h3>
          <p style={styles.cardDesc}>View and manage all registered users</p>
        </div>

        <div style={styles.card} onClick={() => navigate('/events')}>
          <div style={styles.cardIcon}>🎯</div>
          <h3 style={styles.cardTitle}>Manage Events</h3>
          <p style={styles.cardDesc}>Create and manage events</p>
        </div>

        <div style={styles.card} onClick={() => navigate('/admin/dashboard')}>
          <div style={styles.cardIcon}>📊</div>
          <h3 style={styles.cardTitle}>Registrations</h3>
          <p style={styles.cardDesc}>View all event registrations</p>
        </div>

        <div style={styles.card} onClick={() => navigate('/admin/dashboard')}>
          <div style={styles.cardIcon}>⚙️</div>
          <h3 style={styles.cardTitle}>Settings</h3>
          <p style={styles.cardDesc}>Configure system settings</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)'
  },
  title: {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: '800',
    margin: 0
  },
  logoutBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  welcomeCard: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '20px',
    textAlign: 'center',
    marginBottom: '30px',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  welcomeText: {
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '0 0 10px 0'
  },
  roleText: {
    color: '#e0e0e0',
    fontSize: '1.2rem',
    margin: 0
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '15px'
  },
  cardTitle: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 10px 0'
  },
  cardDesc: {
    color: '#e0e0e0',
    fontSize: '1rem',
    margin: 0
  }
};

export default AdminHome;
