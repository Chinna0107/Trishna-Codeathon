import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/api';

const AdminUsers = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await authFetch('/api/admin/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchRegistrations = async (eventId) => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/admin/registrations/event/${eventId}`);
      const data = await res.json();
      setRegistrations(data);
      setSelectedEvent(eventId);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#00eaff', marginBottom: '20px' }}>Event Registrations</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        {events.map(event => (
          <button
            key={event.id}
            onClick={() => fetchRegistrations(event.eventId || event.id)}
            style={{
              padding: '15px',
              background: selectedEvent === (event.eventId || event.id) ? '#00eaff33' : 'rgba(0,234,255,0.1)',
              border: '1px solid #00eaff',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {event.name}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: '#00eaff' }}>Loading registrations...</p>}

      {!loading && selectedEvent && (
        <div>
          <h3 style={{ color: '#00eaff', marginBottom: '15px' }}>
            Registrations ({registrations.length})
          </h3>
          
          {registrations.length === 0 ? (
            <p style={{ color: '#fff' }}>No registrations found for this event.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,234,255,0.05)', borderRadius: '8px' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,234,255,0.2)', color: '#00eaff' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Mobile</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>College</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Type</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Team</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, idx) => (
                    <tr key={idx} style={{ color: '#fff', borderBottom: '1px solid #00eaff22' }}>
                      <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.name || reg.teamLeaderName}</td>
                      <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.email || reg.teamLeaderEmail}</td>
                      <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.mobile || reg.teamLeaderMobile}</td>
                      <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.college}</td>
                      <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.registrationType || 'Individual'}</td>
                      <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.teamName || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
