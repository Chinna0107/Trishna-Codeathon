import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';

const RegisteredData = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    fetchParticipants();
  }, [eventName, navigate]);

  const printPage = () => {
    window.print();
  };

  const exportToCSV = () => {
    const headers = ['S.No', 'Name', 'Email', 'Roll No', 'Year', 'Branch', 'College', 'Mobile'];
    const csvContent = [
      headers.join(','),
      ...participants.map((participant, idx) => [
        idx + 1,
        `"${participant.name}"`,
        `"${participant.email}"`,
        `"${participant.rollno || participant.rollNo || participant.roll_no || 'N/A'}"`,
        `"${participant.year || 'N/A'}"`,
        `"${participant.branch || 'N/A'}"`,
        `"${participant.college}"`,
        `"${participant.mobile || participant.phone || 'N/A'}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventName}_participants.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/participants/${eventName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setParticipants(data);
      }
    } catch (err) {
      console.error('Error fetching participants:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <CoordinatorMenu />
        <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(102, 126, 234, 0.3)', borderTop: '6px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading participants...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px' }} className="registered-data-content">
        <style>
          {`
            @media (max-width: 768px) {
              .registered-data-content { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @media print {
              .no-print { display: none !important; }
              .registered-data-content { margin-left: 0 !important; padding: 20px !important; }
              body { background: white !important; }
              table { border: 1px solid #000 !important; }
              th, td { border: 1px solid #000 !important; }
            }
          `}
        </style>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px' }}>
            📋 Registered Data - {eventName}
          </h1>

          {participants.length === 0 ? (
            <div style={{ background: '#fff', padding: '60px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👥</div>
              <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Participants Found</h3>
              <p style={{ color: '#718096' }}>No participants registered for this event yet.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#2d3748', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                  Registered Participants ({participants.length})
                </h2>
                <div style={{ display: 'flex', gap: '10px' }} className="no-print">
                  <button
                    onClick={printPage}
                    style={{
                      padding: '8px 16px',
                      background: '#f56565',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🖨️ Print
                  </button>
                  <button
                    onClick={exportToCSV}
                    style={{
                      padding: '8px 16px',
                      background: '#48bb78',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    📊 Excel
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>S.No</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>Email</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>Roll No</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>Year</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>Branch</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>College</th>
                      <th style={{ padding: '15px', textAlign: 'left', color: '#2d3748', fontWeight: 'bold' }}>Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant, idx) => (
                      <tr key={participant.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '15px', color: '#4a5568' }}>{idx + 1}</td>
                        <td style={{ padding: '15px', color: '#2d3748', fontWeight: '600' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              fontWeight: 'bold'
                            }}>
                              {participant.name?.charAt(0).toUpperCase()}
                            </div>
                            {participant.name}
                          </div>
                        </td>
                        <td style={{ padding: '15px', color: '#4a5568' }}>{participant.email}</td>
                        <td style={{ padding: '15px', color: '#4a5568' }}>{participant.rollno || participant.rollNo || participant.roll_no || 'N/A'}</td>
                        <td style={{ padding: '15px', color: '#4a5568' }}>{participant.year || 'N/A'}</td>
                        <td style={{ padding: '15px', color: '#4a5568' }}>{participant.branch || 'N/A'}</td>
                        <td style={{ padding: '15px', color: '#4a5568' }}>{participant.college}</td>
                        <td style={{ padding: '15px', color: '#4a5568' }}>{participant.mobile || participant.phone || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredData;