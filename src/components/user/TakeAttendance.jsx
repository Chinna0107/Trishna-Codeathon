import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import config from '../../config';
import Swal from 'sweetalert2';

const TakeAttendance = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const [attendees, setAttendees] = useState([]);
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (scanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner('qr-reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }, false);
      
      scanner.render(handleScan, (err) => {
        // Ignore errors during scanning
      });
      
      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  const handleScan = async (decodedText) => {
    try {
      const qrData = JSON.parse(decodedText);
      const participantEmail = qrData.email;
      const participantName = qrData.name;
      const token = localStorage.getItem('coordinatortoken');
      
      console.log('Sending attendance:', { email: participantEmail, eventName, present: true });
      
      const res = await fetch(`${config.BASE_URL}/api/coordinators/mark-attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          email: participantEmail,
          eventName,
          present: true,
          timestamp: new Date().toISOString()
        })
      });

      const data = await res.json();
      
      console.log('Response status:', res.status);
      console.log('Response data:', data);
      
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Verified!',
          text: `${participantName} marked present`,
          timer: 2000,
          showConfirmButton: false
        });
        setAttendees(prev => [...prev, { 
          email: participantEmail, 
          name: participantName, 
          time: new Date().toLocaleTimeString() 
        }]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to mark attendance'
        });
      }
    } catch (err) {
      console.error('Scan error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid QR code or failed to verify participant'
      });
    }
  };

  const toggleScanning = () => {
    if (scanning && scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }
    setScanning(!scanning);
  };

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
          <h1 style={{ color: '#37474f', fontSize: 'clamp(1.2rem, 4vw, 2rem)', fontWeight: 'bold' }}>Take Attendance - {eventName}</h1>
          <button onClick={() => navigate('/coordinator/events')} style={{ padding: 'clamp(8px 16px, 2vw, 12px 24px)', background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(255,255,255,0.8)', borderRadius: '10px', color: '#37474f', fontWeight: 'bold', cursor: 'pointer', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            ← Back
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(15px, 3vw, 20px)' }}>
          <div style={{ background: '#fff', padding: 'clamp(15px, 4vw, 30px)', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#37474f', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>Scan QR Code</h2>
            <div id="qr-reader" style={{ width: '100%' }}></div>
            <button onClick={toggleScanning} style={{ marginTop: '15px', padding: 'clamp(10px 20px, 2vw, 12px 24px)', background: scanning ? '#f5576c' : '#667eea', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', width: '100%', fontWeight: 'bold', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              {scanning ? 'Stop Scanning' : 'Start Scanning'}
            </button>
          </div>

          <div style={{ background: '#fff', padding: 'clamp(15px, 4vw, 30px)', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#37474f', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>Marked Present ({attendees.length})</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {attendees.map((attendee, idx) => (
                <div key={idx} style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#37474f' }}>{attendee.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#718096' }}>{attendee.time}</div>
                  </div>
                  <div style={{ color: '#48bb78', fontSize: '1.5rem' }}>✓</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;
