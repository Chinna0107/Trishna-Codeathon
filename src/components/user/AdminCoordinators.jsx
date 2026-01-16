import React, { useState, useEffect } from 'react';
import config from '../../config';
import Swal from 'sweetalert2';

const AdminCoordinators = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    category1: '',
    event1: '',
    category2: '',
    event2: '',
    role: 'coordinator'
  });

  useEffect(() => {
    fetchCoordinators();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('admintoken');
      const res = await fetch(`${config.BASE_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchCoordinators = async () => {
    try {
      const token = localStorage.getItem('admintoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCoordinators(data);
      }
    } catch (err) {
      console.error('Error fetching coordinators:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear event selection when category changes
    if (name === 'category1') {
      setFormData(prev => ({ ...prev, category1: value, event1: '' }));
    } else if (name === 'category2') {
      setFormData(prev => ({ ...prev, category2: value, event2: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getFilteredEvents = (category) => {
    const eventsByCategory = {
      'Technical': [
        'Project Expo',
        'Circuitron',
        'Presentation',
        'Tech Quiz',
        'Poster Design',
        'Web designing',
        'Coding / Problem Solving',
        'Debugging',
        'Hackathon',
        'Algorithm Building / Writing'
      ],
      'Non-Technical': [
        'Rube a Cube',
        'Cook without fire',
        'Crossword and sudoku',
        'Fun Tech (mind games)'
      ],
      'Robotics': [
        'Line Tracer',
        'Over drive',
        'Robo vehicle race'
      ]
    };
    
    return eventsByCategory[category] || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admintoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Coordinator Added!',
          text: 'Coordinator has been added successfully.',
          confirmButtonColor: '#667eea'
        });
        setFormData({ name: '', email: '', password: '', mobile: '', category1: '', event1: '', category2: '', event2: '', role: 'coordinator' });
        setShowForm(false);
        fetchCoordinators();
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: data.message || 'Failed to add coordinator.',
          confirmButtonColor: '#667eea'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to connect to server.',
        confirmButtonColor: '#667eea'
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Coordinator?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#667eea',
      confirmButtonText: 'Yes, delete'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('admintoken');
        const res = await fetch(`${config.BASE_URL}/api/coordinators/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          Swal.fire('Deleted!', 'Coordinator has been deleted.', 'success');
          fetchCoordinators();
        }
      } catch (err) {
        Swal.fire('Error', 'Failed to delete coordinator.', 'error');
      }
    }
  };

  return (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>👥 Coordinator Management</h2>
          <p style={{ color: '#718096', fontSize: '1.1rem' }}>Manage event coordinators and their assignments</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '14px 28px',
            background: showForm ? 'linear-gradient(135deg, #f56565, #e53e3e)' : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1.05rem',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {showForm ? '✕ Cancel' : '➕ Add Coordinator'}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          marginBottom: '40px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>✨</div>
            <h3 style={{ fontSize: '1.8rem', color: '#2d3748', margin: 0 }}>Add New Coordinator</h3>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: '600', fontSize: '0.9rem' }}>👤 Full Name</label>
              <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '1rem',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: '600', fontSize: '0.9rem' }}>📧 Email</label>
              <input
              type="email"
              name="email"
              placeholder="coordinator@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '1rem',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: '600', fontSize: '0.9rem' }}>🔒 Password</label>
              <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '1rem',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: '600', fontSize: '0.9rem' }}>📱 Mobile</label>
              <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '1rem',
                width: '100%',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            </div>
            </div>
            {/* Event 1 */}
            <div style={{ padding: '25px', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)', borderRadius: '15px', border: '2px solid #c7d2fe' }}>
              <h4 style={{ marginBottom: '20px', color: '#4c1d95', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span> Event 1 (Required)
              </h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                <select
                  name="category1"
                  value={formData.category1}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                >
                  <option value="">Select Category 1</option>
                  <option value="Technical">Technical</option>
                  <option value="Non-Technical">Non-Technical</option>
                  <option value="Robotics">Robotics</option>
                </select>
                <select
                  name="event1"
                  value={formData.event1}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.category1}
                  style={{
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: formData.category1 ? '#fff' : '#f7fafc',
                    cursor: formData.category1 ? 'pointer' : 'not-allowed'
                  }}
                >
                  <option value="">Select Event 1</option>
                  {getFilteredEvents(formData.category1).map((eventName, idx) => (
                    <option key={idx} value={eventName}>
                      {eventName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event 2 */}
            <div style={{ padding: '25px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '15px', border: '2px solid #fbbf24' }}>
              <h4 style={{ marginBottom: '20px', color: '#78350f', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🌟</span> Event 2 (Optional)
              </h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                <select
                  name="category2"
                  value={formData.category2}
                  onChange={handleInputChange}
                  style={{
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                >
                  <option value="">Select Category 2</option>
                  <option value="Technical">Technical</option>
                  <option value="Non-Technical">Non-Technical</option>
                  <option value="Robotics">Robotics</option>
                </select>
                <select
                  name="event2"
                  value={formData.event2}
                  onChange={handleInputChange}
                  disabled={!formData.category2}
                  style={{
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: formData.category2 ? '#fff' : '#f7fafc',
                    cursor: formData.category2 ? 'pointer' : 'not-allowed'
                  }}
                >
                  <option value="">Select Event 2</option>
                  {getFilteredEvents(formData.category2).map((eventName, idx) => (
                    <option key={idx} value={eventName}>
                      {eventName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              ✅ Add Coordinator
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>Loading...</div>
      ) : coordinators.length === 0 ? (
        <div style={{
          background: '#fff',
          padding: '60px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👥</div>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Coordinators Yet</h3>
          <p style={{ color: '#718096' }}>Add your first coordinator to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '25px' }}>
          {coordinators.map((coordinator) => (
            <div
              key={coordinator.id}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
                padding: '25px',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.4rem', color: '#2d3748', marginBottom: '12px', fontWeight: 'bold' }}>{coordinator.name}</h4>
                <p style={{ color: '#718096', marginBottom: '6px', fontSize: '0.95rem' }}>📧 {coordinator.email}</p>
                <p style={{ color: '#718096', marginBottom: '15px', fontSize: '0.95rem' }}>📱 {coordinator.mobile}</p>
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #e2e8f0' }}>
                  {coordinator.category1 && coordinator.event1 && (
                    <div style={{ 
                      padding: '10px 15px', 
                      background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)', 
                      borderRadius: '10px', 
                      marginBottom: '8px',
                      border: '1px solid #c7d2fe'
                    }}>
                      <p style={{ color: '#4c1d95', fontWeight: 'bold', margin: 0, fontSize: '0.95rem' }}>📂 {coordinator.category1}</p>
                      <p style={{ color: '#5b21b6', margin: '4px 0 0 0', fontSize: '1.05rem', fontWeight: '600' }}>🎯 {coordinator.event1}</p>
                    </div>
                  )}
                  {coordinator.category2 && coordinator.event2 && (
                    <div style={{ 
                      padding: '10px 15px', 
                      background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
                      borderRadius: '10px',
                      border: '1px solid #fbbf24'
                    }}>
                      <p style={{ color: '#78350f', fontWeight: 'bold', margin: 0, fontSize: '0.95rem' }}>📂 {coordinator.category2}</p>
                      <p style={{ color: '#92400e', margin: '4px 0 0 0', fontSize: '1.05rem', fontWeight: '600' }}>🎯 {coordinator.event2}</p>
                    </div>
                  )}
                </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(coordinator.id)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #f56565, #e53e3e)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                🗑️ Delete Coordinator
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminCoordinators;
