import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoordinatorMenu from './CoordinatorMenu';
import config from '../../config';
import Swal from 'sweetalert2';

const Evaluation = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [mode, setMode] = useState('main');

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
  }, [eventName, navigate]);

  const exportToPDF = () => {
    // PDF export logic
    console.log('Exporting to PDF');
  };

  const exportToExcel = () => {
    // Excel export logic
    console.log('Exporting to Excel');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px' }} className="evaluation-content">
        <style>
          {`
            @media (max-width: 768px) {
              .evaluation-content { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
              .evaluation-main-grid { flex-direction: column !important; gap: 20px !important; }
              .evaluation-buttons-grid { grid-template-columns: 1fr !important; gap: 15px !important; }
              .evaluation-export-buttons { flex-direction: column !important; }
              .evaluation-content h1 { font-size: 1.8rem !important; }
              .evaluation-content h2 { font-size: 1.3rem !important; }
              .evaluation-content > div { padding: 20px !important; }
              .evaluation-content > div > div { padding: 20px !important; border-radius: 10px !important; }
            }
          `}
        </style>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <button
              onClick={() => navigate(`/coordinator/event-details/${eventName}`)}
              style={{
                padding: '10px',
                background: '#fff',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ←
            </button>
            <h1 style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
              📊 Evaluation - {eventName}
            </h1>
          </div>

          <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', padding: '30px' }}>
            <div className="evaluation-main-grid" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              {/* Left Side - Event Image and Name */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ 
                  width: '200px', 
                  height: '200px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '4rem', 
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)' 
                }}>
                  🎯
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#2d3748', margin: 0, fontWeight: 'bold', textAlign: 'center' }}>
                  {eventName}
                </h2>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="evaluation-buttons-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <button
                  onClick={() => navigate(`/coordinator/mark-evaluation/${eventName}`)}
                  style={{
                    padding: '20px',
                    background: '#667eea',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    transition: 'transform 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  📝 Mark Evaluation
                </button>

                <button
                  onClick={() => navigate(`/coordinator/view-evaluation/${eventName}`)}
                  style={{
                    padding: '20px',
                    background: '#48bb78',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    transition: 'transform 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  👁️ View Evaluation
                </button>

                <button
                  onClick={() => setMode('edit')}
                  style={{
                    padding: '20px',
                    background: '#ed8936',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    transition: 'transform 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  ✏️ Edit Evaluation
                </button>

                <div className="evaluation-export-buttons" style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={exportToPDF}
                    style={{
                      flex: 1,
                      padding: '20px',
                      background: '#f56565',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      textAlign: 'center',
                      transition: 'transform 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    📄 PDF
                  </button>
                  <button
                    onClick={exportToExcel}
                    style={{
                      flex: 1,
                      padding: '20px',
                      background: '#38a169',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      textAlign: 'center',
                      transition: 'transform 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    📊 Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;