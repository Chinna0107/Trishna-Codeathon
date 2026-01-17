import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';
import Swal from 'sweetalert2';

const MarkEvaluation = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [participants, setParticipants] = useState([]);
  const [selectedJury, setSelectedJury] = useState('');
  const [loading, setLoading] = useState(true);

  const juryMembers = [
    'Dr. Rajesh Kumar', 'Prof. Priya Sharma', 'Mr. Arjun Patel', 'Ms. Kavya Reddy', 'Dr. Suresh Nair',
    'Prof. Meera Singh', 'Mr. Vikram Gupta', 'Ms. Anita Joshi', 'Dr. Ramesh Iyer', 'Prof. Sunita Das',
    'Mr. Kiran Kumar', 'Ms. Deepika Rao', 'Dr. Ashok Verma', 'Prof. Ritu Agarwal', 'Mr. Sanjay Mehta',
    'Ms. Pooja Bansal', 'Dr. Manoj Tiwari', 'Prof. Neha Kapoor', 'Mr. Rohit Saxena', 'Ms. Shreya Pandey'
  ];

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    fetchParticipants();
  }, [eventName, navigate]);

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

  const handleParticipantClick = async (participant) => {
    if (participant.evaluated) {
      Swal.fire({
        icon: 'info',
        title: 'Already Evaluated',
        text: `${participant.name} has already been evaluated with score: ${participant.score}`,
        confirmButtonColor: '#667eea'
      });
      return;
    }

    if (!selectedJury) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Jury Member',
        text: 'Please select a jury member before evaluating participants',
        confirmButtonColor: '#667eea'
      });
      return;
    }

    const { value: score } = await Swal.fire({
      title: `Score for ${participant.name}`,
      html: `<p><strong>Jury Member:</strong> ${selectedJury}</p>`,
      input: 'number',
      inputLabel: 'Enter score (0-100)',
      inputPlaceholder: '0-100',
      inputAttributes: {
        min: 0,
        max: 100,
        step: 1
      },
      showCancelButton: true,
      confirmButtonText: 'Save Score',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#667eea',
      inputValidator: (value) => {
        if (!value || value < 0 || value > 100) {
          return 'Please enter a valid score between 0 and 100';
        }
      }
    });

    if (score) {
      const participantName = participant.name.replace(/\s+/g, '-').toLowerCase();
      navigate(`/coordinator/mark-evaluation/${eventName}/${participantName}`, { replace: true });
      await saveScore(participant.id, parseInt(score));
    }
  };

  const saveScore = async (participantId, score) => {
    // Show loading
    Swal.fire({
      title: 'Saving Score...',
      text: 'Please wait while we save the evaluation',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/add-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          participantId,
          score,
          eventName,
          juryMember: selectedJury
        })
      });

      if (res.ok) {
        // Update participant as evaluated
        setParticipants(prev => prev.map(p => 
          p.id === participantId ? { ...p, evaluated: true, score } : p
        ));
        
        Swal.fire({
          icon: 'success',
          title: 'Score Saved!',
          text: `Score ${score} saved successfully`,
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        throw new Error('Failed to save score');
      }
    } catch (err) {
      console.error('Error saving score:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save score',
        confirmButtonColor: '#667eea'
      });
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
      <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px' }} className="mark-eval-content">
        <style>
          {`
            @media (max-width: 768px) {
              .mark-eval-content { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
              .mark-eval-card { flex-direction: column !important; text-align: center !important; padding: 15px !important; }
              .mark-eval-avatar { margin-bottom: 10px !important; }
              .mark-eval-name { font-size: 1rem !important; }
              .mark-eval-email { font-size: 0.8rem !important; }
              .mark-eval-content > div { padding: 20px !important; }
              .mark-eval-content h1 { font-size: 1.8rem !important; }
              .mark-eval-content h2 { font-size: 1.3rem !important; }
              .mark-eval-content h3 { font-size: 1.1rem !important; }
              .mark-eval-content > div > div { padding: 20px !important; border-radius: 10px !important; }
              .mark-eval-content > div > div > div { padding: 15px !important; }
            }
          `}
        </style>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px' }}>📝 Mark Evaluation - {eventName}</h1>

          {/* Jury Member Selection */}
          <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px', padding: '20px' }}>
            <h3 style={{ color: '#2d3748', margin: '0 0 15px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>👨‍⚖️ Select Jury Member:</h3>
            <select
              value={selectedJury}
              onChange={(e) => setSelectedJury(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                background: '#fff',
                color: '#2d3748',
                cursor: 'pointer'
              }}
            >
              <option value="">-- Select a Jury Member --</option>
              {juryMembers.map((jury, index) => (
                <option key={index} value={jury}>{jury}</option>
              ))}
            </select>
          </div>

          {participants.length === 0 ? (
            <div style={{ background: '#fff', padding: '60px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👥</div>
              <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Participants Found</h3>
              <p style={{ color: '#718096' }}>No participants registered for this event yet.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ color: '#2d3748', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                  Participants ({participants.length})
                </h2>
              </div>

              <div style={{ padding: '20px' }}>
                {participants.map((participant, idx) => (
                  <div 
                    key={participant.id || idx} 
                    onClick={() => !participant.evaluated && handleParticipantClick(participant)}
                    style={{ 
                      padding: '15px 20px', 
                      borderBottom: idx < participants.length - 1 ? '1px solid #f7fafc' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      cursor: participant.evaluated ? 'not-allowed' : 'pointer',
                      transition: 'background 0.3s',
                      borderRadius: '8px',
                      margin: '5px 0',
                      opacity: participant.evaluated ? 0.6 : 1,
                      background: participant.evaluated ? '#f7fafc' : 'transparent'
                    }}
                    className="mark-eval-card"
                    onMouseOver={(e) => !participant.evaluated && (e.target.style.background = '#f7fafc')}
                    onMouseOut={(e) => !participant.evaluated && (e.target.style.background = 'transparent')}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: participant.evaluated ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }} className="mark-eval-avatar">
                      {participant.evaluated ? '✓' : participant.name?.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: participant.evaluated ? '#9ca3af' : '#2d3748', margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: 'bold' }} className="mark-eval-name">
                        {participant.name} {participant.evaluated && `(Score: ${participant.score})`}
                      </h3>
                      <p style={{ color: participant.evaluated ? '#9ca3af' : '#718096', margin: 0, fontSize: '0.9rem' }} className="mark-eval-email">
                        {participant.email} • {participant.rollNo || 'N/A'}
                      </p>
                    </div>
                    <div style={{ color: participant.evaluated ? '#9ca3af' : '#667eea', fontSize: '1.2rem' }}>
                      {participant.evaluated ? '🔒' : '➤'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkEvaluation;