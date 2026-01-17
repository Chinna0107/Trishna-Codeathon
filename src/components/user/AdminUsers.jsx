import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    if (!adminToken) {
      navigate('/login');
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const res = await authFetch('/api/admin/events');
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setEvents([]);
    }
  };

  const exportToExcel = async () => {
    try {
      const eventName = events.find(e => (e.eventId || e.id) === selectedEvent)?.name || 'Event';
      const res = await authFetch(`/api/admin/export/excel/${selectedEvent}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${eventName}_registrations.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting to Excel:', err);
    }
  };

  const exportToPDF = async () => {
    try {
      const eventName = events.find(e => (e.eventId || e.id) === selectedEvent)?.name || 'Event';
      const res = await authFetch(`/api/admin/export/pdf/${selectedEvent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: eventName,
          columns: [
            { key: 'sno', label: 'S.No', width: 30 },
            { key: 'name', label: 'Name', width: 80 },
            { key: 'email', label: 'Email', width: 120 },
            { key: 'rollNo', label: 'Roll No', width: 60 },
            { key: 'year', label: 'Year', width: 40 },
            { key: 'branch', label: 'Branch', width: 60 },
            { key: 'mobile', label: 'Mobile', width: 70 },
            { key: 'college', label: 'College', width: 80 },
            { key: 'role', label: 'Role', width: 50 }
          ],
          includeTeamMembers: true,
          format: 'professional',
          pageOrientation: 'landscape',
          wordWrap: false,
          textOverflow: 'ellipsis',
          singleLine: true,
          cellPadding: 4,
          headerStyle: {
            fillColor: '#4472C4',
            textColor: '#FFFFFF',
            fontStyle: 'bold'
          },
          alternateRowColors: true,
          showBorders: true,
          borderWidth: 1,
          borderColor: '#000000',
          cellBorders: {
            top: true,
            bottom: true,
            left: true,
            right: true
          },
          title: `${eventName} - Participant List`,
          subtitle: `Total Participants: ${registrations.length}`,
          footer: `Generated on ${new Date().toLocaleDateString()}`
        })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${eventName}_participants.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting to PDF:', err);
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
      <style>
        {`
          @media (max-width: 768px) {
            .admin-container { padding: 10px !important; }
            .events-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important; gap: 8px !important; }
            .event-btn { padding: 8px !important; font-size: 0.8rem !important; }
            .header-flex { flex-direction: column !important; align-items: flex-start !important; gap: 15px !important; }
            .export-btns { width: 100% !important; justify-content: center !important; }
            .table-wrap { font-size: 0.7rem !important; }
            .table-wrap th, .table-wrap td { padding: 6px 2px !important; min-width: 60px; }
            .main-title { font-size: 1.8rem !important; }
            .event-title { font-size: 1rem !important; }
          }
          @media (max-width: 480px) {
            .admin-container { padding: 5px !important; }
            .events-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) !important; gap: 5px !important; }
            .event-btn { padding: 6px !important; font-size: 0.7rem !important; }
            .table-wrap { font-size: 0.6rem !important; }
            .table-wrap th, .table-wrap td { padding: 4px 1px !important; min-width: 50px; }
            .export-btns button { padding: 6px 10px !important; font-size: 0.8rem !important; }
          }
        `}
      </style>
      <div className="admin-container">
      <h2 className="main-title" style={{ color: '#00eaff', marginBottom: '20px' }}>Event Registrations</h2>
      
      <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        {Array.isArray(events) && events.map(event => (
          <button
            key={event.id}
            onClick={() => fetchRegistrations(event.eventId || event.id)}
            className="event-btn"
            style={{
              padding: '15px',
              background: selectedEvent === (event.eventId || event.id) ? '#FFD700' : 'rgba(0,234,255,0.1)',
              border: selectedEvent === (event.eventId || event.id) ? '2px solid #FFD700' : '1px solid #00eaff',
              borderRadius: '8px',
              color: selectedEvent === (event.eventId || event.id) ? '#000' : '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontWeight: selectedEvent === (event.eventId || event.id) ? 'bold' : 'normal'
            }}
          >
            {event.name}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: '#00eaff' }}>Loading registrations...</p>}

      {!loading && selectedEvent && (
        <div>
          <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 className="event-title" style={{ margin: 0 }}>
              <span style={{ color: '#FFD700' }}>{events.find(e => (e.eventId || e.id) === selectedEvent)?.name}</span>
              <span style={{ color: '#00eaff' }}> - Registrations ({registrations.length})</span>
            </h3>
            <div className="export-btns" style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={exportToPDF}
                className="export-btn"
                style={{
                  padding: '8px 16px',
                  background: '#ff4444',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                📄 PDF
              </button>
              <button
                onClick={exportToExcel}
                className="export-btn"
                style={{
                  padding: '8px 16px',
                  background: '#4CAF50',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                📊 Excel
              </button>
            </div>
          </div>
          
          {registrations.length === 0 ? (
            <p style={{ color: '#fff' }}>No registrations found for this event.</p>
          ) : (
            <div className="table-wrap" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,234,255,0.05)', borderRadius: '8px' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,234,255,0.2)', color: '#00eaff' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Roll No</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Year</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Branch</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Mobile</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>College</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #00eaff55' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, idx) => {
                    const rows = [];
                    // Team leader row
                    rows.push(
                      <tr key={`${idx}-leader`} style={{ color: '#fff', borderBottom: '1px solid #00eaff22', background: reg.registrationType === 'Team' ? 'rgba(0,234,255,0.1)' : 'transparent' }}>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.name || reg.teamLeaderName}</td>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.email || reg.teamLeaderEmail}</td>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.rollNo || reg.teamLeaderRollNo || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.year || reg.teamLeaderYear || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.branch || reg.teamLeaderBranch || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.mobile || reg.teamLeaderMobile}</td>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.college}</td>
                        <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{reg.registrationType === 'Team' ? 'Leader' : 'Individual'}</td>
                      </tr>
                    );
                    // Team members rows
                    if (reg.members && reg.members.length > 0) {
                      reg.members.forEach((member, memberIdx) => {
                        rows.push(
                          <tr key={`${idx}-member-${memberIdx}`} style={{ color: '#fff', borderBottom: '1px solid #00eaff22' }}>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{member.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{member.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{member.rollNo || '-'}</td>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{member.year || '-'}</td>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{member.branch || '-'}</td>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{member.mobile}</td>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>{member.college}</td>
                            <td style={{ padding: '10px', border: '1px solid #00eaff22' }}>Member</td>
                          </tr>
                        );
                      });
                    }
                    return rows;
                  }).flat()}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminUsers;
