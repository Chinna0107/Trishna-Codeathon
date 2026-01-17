import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';

const ViewEvaluation = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    fetchEvaluations();
  }, [eventName, navigate]);

  const fetchEvaluations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/evaluations/${eventName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setEvaluations(data.sort((a, b) => b.score - a.score));
      }
    } catch (err) {
      console.error('Error fetching evaluations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#48bb78';
    if (score >= 60) return '#ed8936';
    return '#f56565';
  };

  const exportToPDF = async () => {
    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/export-evaluations/pdf/${eventName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${eventName}_evaluations.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Error exporting to PDF:', err);
    }
  };

  const exportToExcel = async () => {
    try {
      const token = localStorage.getItem('coordinatortoken');
      const res = await fetch(`${config.BASE_URL}/api/coordinators/export-evaluations/excel/${eventName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${eventName}_evaluations.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Error exporting to Excel:', err);
    }
  };

  const getRank = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <CoordinatorMenu />
        <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(102, 126, 234, 0.3)', borderTop: '6px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading evaluations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px' }} className="view-eval-content">
        <style>
          {`
            @media (max-width: 768px) {
              .view-eval-content { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
              .view-eval-buttons { flex-direction: column !important; gap: 10px !important; }
              .view-eval-card { flex-direction: column !important; text-align: center !important; padding: 15px !important; }
              .view-eval-score { margin-bottom: 15px !important; }
              .view-eval-content > div { padding: 20px !important; }
              .view-eval-content h1 { font-size: 1.8rem !important; }
              .view-eval-content h2 { font-size: 1.3rem !important; }
              .view-eval-content h3 { font-size: 1.1rem !important; }
              .view-eval-content > div > div { padding: 20px !important; border-radius: 10px !important; }
            }
          `}
        </style>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px' }}>👁️ View Evaluation - {eventName}</h1>

          {evaluations.length === 0 ? (
            <div style={{ background: '#fff', padding: '60px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📊</div>
              <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Evaluations Found</h3>
              <p style={{ color: '#718096' }}>No participants have been evaluated for this event yet.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#2d3748', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                  📊 Evaluation Results ({evaluations.length})
                </h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} className="view-eval-buttons">
                  <button
                    onClick={exportToPDF}
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
                    📄 PDF
                  </button>
                  <button
                    onClick={exportToExcel}
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
                  <span style={{ fontSize: '0.9rem', color: '#718096' }}>
                    Avg: {(evaluations.reduce((sum, e) => sum + e.score, 0) / evaluations.length).toFixed(1)}
                  </span>
                </div>
              </div>

              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {evaluations.map((evaluation, idx) => (
                  <div 
                    key={evaluation.id || idx}
                    style={{ 
                      padding: '20px', 
                      borderBottom: idx < evaluations.length - 1 ? '1px solid #f7fafc' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      background: idx < 3 ? 'rgba(255, 215, 0, 0.1)' : 'transparent'
                    }}
                    className="view-eval-card"
                  >
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: getScoreColor(evaluation.score),
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }} className="view-eval-score">
                      {evaluation.score}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        <span style={{ fontSize: '1.5rem' }}>{getRank(idx)}</span>
                        <h3 style={{ color: '#2d3748', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                          {evaluation.name}
                        </h3>
                      </div>
                      <p style={{ color: '#718096', margin: 0, fontSize: '0.9rem' }}>
                        {evaluation.email} • {evaluation.rollNo || 'N/A'}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        padding: '8px 16px',
                        background: getScoreColor(evaluation.score),
                        borderRadius: '20px',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        marginBottom: '5px'
                      }}>
                        {evaluation.score}/100
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                        {evaluation.evaluatedAt ? new Date(evaluation.evaluatedAt).toLocaleDateString() : 'N/A'}
                      </div>
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

export default ViewEvaluation;