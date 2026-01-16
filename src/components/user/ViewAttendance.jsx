import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../config';
import Swal from 'sweetalert2';

const ViewAttendance = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/attendance/${eventName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setAttendance(data.attendance || []);
      } else if (res.status === 404) {
        console.log('Attendance endpoint not found, using empty data');
        setAttendance([]);
      } else {
        throw new Error('Failed to fetch attendance');
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const headers = ['S.No', 'Participant Name', 'Participant ID', 'Time'];
    const rows = attendance.map((record, idx) => [
      idx + 1,
      record.participantName,
      record.participantId,
      new Date(record.timestamp).toLocaleString()
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventName}_attendance.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255,255,255,0.3)', borderTop: '6px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#424242', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading attendance...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)', padding: 'clamp(10px, 3vw, 20px)' }}>
      {/* Navigation Bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.9)', padding: '15px 20px', borderRadius: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => navigate('/coordinator/dashboard')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🏠 Home</button>
        <button onClick={() => navigate('/coordinator/events')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>📅 Events</button>
        <button onClick={() => navigate('/coordinator/schedules')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>🕐 Schedules</button>
        <button onClick={() => navigate('/coordinator/profile')} style={{ padding: '10px 20px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>👤 Profile</button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(15px, 4vw, 30px)', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ color: '#37474f', fontSize: 'clamp(1.2rem, 4vw, 2rem)', fontWeight: 'bold', marginBottom: '5px' }}>Attendance - {eventName}</h1>
            <p style={{ color: '#546e7a', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Total Present: {attendance.length}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={handlePrintPDF} style={{ padding: 'clamp(8px 16px, 2vw, 12px 24px)', background: '#4CAF50', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
              📄 Print PDF
            </button>
            <button onClick={handleExportExcel} style={{ padding: 'clamp(8px 16px, 2vw, 12px 24px)', background: '#2196F3', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
              📊 Export Excel
            </button>
            <button onClick={() => navigate('/coordinator/events')} style={{ padding: 'clamp(8px 16px, 2vw, 12px 24px)', background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(255,255,255,0.8)', borderRadius: '10px', color: '#37474f', fontWeight: 'bold', cursor: 'pointer', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
              ← Back
            </button>
          </div>
        </div>

        <div style={{ background: '#fff', padding: 'clamp(15px, 4vw, 30px)', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
          {attendance.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#f7fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: 'clamp(10px, 2vw, 15px)', textAlign: 'left', color: '#37474f', fontWeight: 'bold', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>S.No</th>
                  <th style={{ padding: 'clamp(10px, 2vw, 15px)', textAlign: 'left', color: '#37474f', fontWeight: 'bold', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Participant Name</th>
                  <th style={{ padding: 'clamp(10px, 2vw, 15px)', textAlign: 'left', color: '#37474f', fontWeight: 'bold', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Participant ID</th>
                  <th style={{ padding: 'clamp(10px, 2vw, 15px)', textAlign: 'left', color: '#37474f', fontWeight: 'bold', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: 'clamp(10px, 2vw, 15px)', color: '#4a5568', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>{idx + 1}</td>
                    <td style={{ padding: 'clamp(10px, 2vw, 15px)', color: '#2d3748', fontWeight: '500', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>{record.participantName}</td>
                    <td style={{ padding: 'clamp(10px, 2vw, 15px)', color: '#4a5568', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>{record.participantId}</td>
                    <td style={{ padding: 'clamp(10px, 2vw, 15px)', color: '#4a5568', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>{new Date(record.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📋</div>
              <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Attendance Records</h3>
              <p style={{ color: '#718096' }}>No participants have been marked present yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
