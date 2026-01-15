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
    eventName: '',
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setFormData({ name: '', email: '', password: '', mobile: '', eventName: '', role: 'coordinator' });
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
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748' }}>Coordinator Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add Coordinator'}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>Add New Coordinator</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              style={{
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            <select
              name="eventName"
              value={formData.eventName}
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
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.name}>
                  {event.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              style={{
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Add Coordinator
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
        <div style={{ display: 'grid', gap: '20px' }}>
          {coordinators.map((coordinator) => (
            <div
              key={coordinator.id}
              style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.3rem', color: '#2d3748', marginBottom: '8px' }}>{coordinator.name}</h4>
                <p style={{ color: '#718096', marginBottom: '4px' }}>📧 {coordinator.email}</p>
                <p style={{ color: '#718096', marginBottom: '4px' }}>📱 {coordinator.mobile}</p>
                <p style={{ color: '#667eea', fontWeight: 'bold' }}>🎯 {coordinator.event_name}</p>
              </div>
              <button
                onClick={() => handleDelete(coordinator.id)}
                style={{
                  padding: '10px 20px',
                  background: '#f56565',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCoordinators;
