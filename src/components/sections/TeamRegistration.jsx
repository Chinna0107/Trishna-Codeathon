import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import tkLogo from '../../assets/images/tk logo.png';
import BottomNavBar from './BottomNavBar';
import config from '../../config';

const BASE_URL = config.API_BASE_URL.replace('/api', '') + '/api/users';

const TeamRegistration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');
  const eventNameFromUrl = searchParams.get('name');
  
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [eventName, setEventName] = useState('');
  const [teamLeader, setTeamLeader] = useState({
    name: '', rollNo: '', mobile: '', year: '', branch: '', email: '', college: '', password: '', confirmPassword: ''
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [members, setMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({
    name: '', rollNo: '', mobile: '', year: '', branch: '', email: '', college: ''
  });
  const [screenshotLink, setScreenshotLink] = useState('');

  const eventsList = [
    { id: 'project-expo', name: 'Project Expo' },
    { id: 'web-design', name: 'Web Design' },
    { id: 'hackathon', name: 'Hackathon' },
    { id: 'nextcode', name: 'NextCode' },
    { id: 'rube-cube', name: 'Rube a Cube' },
    { id: 'poster-design', name: 'Poster Design' },
    { id: 'cook-without-food', name: 'Cook Without Food' },
    { id: 'robo-race', name: 'Robo Race' },
    { id: 'over-drive', name: 'Over Drive' },
    { id: 'full-stack', name: 'Full Stack' },
    { id: 'gen-ai', name: 'Gen AI' },
    { id: 'gitt-github', name: 'Gitt & Github' },
    { id: 'iot', name: 'IOT' },
  ];

  useEffect(() => {
    if (eventNameFromUrl) {
      setEventName(eventNameFromUrl);
    } else if (eventId) {
      const selectedEvent = eventsList.find(e => e.id === eventId);
      setEventName(selectedEvent?.name || '');
    }
  }, [eventId, eventNameFromUrl]);

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setTeamLeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeaderSubmit = (e) => {
    e.preventDefault();
    if (!emailVerified) {
      Swal.fire({
        icon: 'error',
        title: 'Email Not Verified',
        text: 'Please verify team leader email before continuing.',
        confirmButtonColor: '#667eea'
      });
      return;
    }
    if (teamLeader.password !== teamLeader.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match!',
        confirmButtonColor: '#667eea'
      });
      return;
    }
    setStep(2);
  };

  const sendOtp = async () => {
    if (!teamLeader.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter team leader email first.',
        confirmButtonColor: '#667eea'
      });
      return;
    }
    setSendingOtp(true);
    try {
      const response = await fetch(`${BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: teamLeader.email })
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: `Verification code sent to ${teamLeader.email}`,
          confirmButtonColor: '#667eea'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send OTP',
          text: data.message || 'Please try again.',
          confirmButtonColor: '#667eea'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Failed to connect to server.',
        confirmButtonColor: '#667eea'
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    setVerifyingOtp(true);
    try {
      const response = await fetch(`${BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: teamLeader.email, 
          otp: otp 
        })
      });
      const data = await response.json();
      if (response.ok) {
        setEmailVerified(true);
        Swal.fire({
          icon: 'success',
          title: 'Email Verified!',
          text: 'Team leader email verified successfully.',
          confirmButtonColor: '#667eea'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid OTP',
          text: data.message || 'Please enter the correct verification code.',
          confirmButtonColor: '#667eea'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Failed to verify OTP.',
        confirmButtonColor: '#667eea'
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const addMember = (e) => {
    e.preventDefault();
    setMembers([...members, currentMember]);
    setCurrentMember({ name: '', rollNo: '', mobile: '', year: '', branch: '', email: '', college: '' });
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const transactionId = e.target[0].value;
    
    if (!screenshotLink) {
      Swal.fire({
        icon: 'warning',
        title: 'Screenshot Link Required',
        text: 'Please provide Google Drive link for payment screenshot.',
        confirmButtonColor: '#667eea'
      });
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/register-team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName,
          teamLeader,
          members,
          eventId: eventId || '',
          eventName: eventName || '',
          transactionId,
          screenshotUrl: screenshotLink
        })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Complete!',
          html: `<strong>Team:</strong> ${teamName}<br><strong>Leader:</strong> ${teamLeader.name}<br><strong>Members:</strong> ${members.length}`,
          confirmButtonColor: '#4CAF50'
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.error || 'Something went wrong!',
          confirmButtonColor: '#667eea'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Failed to connect to server. Please try again.',
        confirmButtonColor: '#667eea'
      });
    }
  };

  const inputStyle = {
    padding: '12px', borderRadius: '12px', border: '2px solid transparent', outline: 'none',
    fontSize: '1rem', background: 'rgba(255,255,255,0.95)', color: '#333', width: '100%'
  };

  const ProgressBar = () => (
    <div style={{ width: '100%', maxWidth: '700px', marginBottom: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        {['Leader', 'Members', 'Payment'].map((label, idx) => (
          <div key={label} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: step > idx ? '#4CAF50' : step === idx + 1 ? '#fff' : 'rgba(255,255,255,0.3)',
              color: step === idx + 1 ? '#667eea' : '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', marginBottom: '5px',
              boxShadow: step === idx + 1 ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
            }}>
              {step > idx ? '✓' : idx + 1}
            </div>
            <div style={{ fontSize: '0.85rem', color: step === idx + 1 ? '#fff' : 'rgba(255,255,255,0.7)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${(step / 3) * 100}%`, height: '100%', background: '#4CAF50', transition: 'width 0.5s' }} />
      </div>
    </div>
  );

  if (step === 1) {
    return (
      <div style={{
        padding: '50px 20px', textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 18, left: 18, width: 54, height: 54, zIndex: 101 }} />
        <ProgressBar />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>👤 Team Leader Details</h2>
        {eventName && <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '20px' }}>Event: {eventName}</p>}
        <form style={{
          maxWidth: '700px', width: '100%', background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'grid', gap: '15px',
          border: '1px solid rgba(255,255,255,0.2)'
        }} onSubmit={handleLeaderSubmit}>
          <input placeholder="Team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required style={inputStyle} />
          {['name', 'rollNo', 'mobile', 'year', 'branch', 'college'].map((field) => (
            <input key={field} placeholder={field === 'name' ? 'Leader name' : field === 'rollNo' ? 'Roll number' : field === 'mobile' ? 'Mobile number' : field.charAt(0).toUpperCase() + field.slice(1)}
              name={field} type={field === 'mobile' ? 'tel' : 'text'}
              value={teamLeader[field]} onChange={handleLeaderChange} required style={inputStyle} />
          ))}
          
          {/* Email with verification */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              placeholder="Leader Email"
              name="email"
              type="email"
              value={teamLeader.email}
              onChange={handleLeaderChange}
              required
              disabled={emailVerified}
              style={{
                ...inputStyle,
                flex: 1,
                border: emailVerified ? '2px solid #4CAF50' : '2px solid transparent',
                background: emailVerified ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255,255,255,0.95)'
              }}
            />
            {!emailVerified && (
              <button
                type="button"
                onClick={sendOtp}
                disabled={sendingOtp}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: sendingOtp ? '#999' : '#667eea',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: sendingOtp ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {sendingOtp ? 'Sending...' : 'Send OTP'}
              </button>
            )}
            {emailVerified && <span style={{ color: '#4CAF50', fontSize: '1.5rem' }}>✓</span>}
          </div>

          {/* OTP verification */}
          {!emailVerified && teamLeader.email && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={verifyingOtp}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: verifyingOtp ? '#999' : '#4CAF50',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: verifyingOtp ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {verifyingOtp ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          )}

          {/* Password fields */}
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={teamLeader.password}
            onChange={handleLeaderChange}
            required
            style={inputStyle}
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={teamLeader.confirmPassword}
            onChange={handleLeaderChange}
            required
            style={inputStyle}
          />
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
            <button type="submit" style={{
              padding: '14px 32px', borderRadius: '14px', background: '#fff', color: '#667eea',
              fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', fontSize: '1rem'
            }}>Next →</button>
            <button type="button" onClick={() => navigate('/events')} style={{
              padding: '14px 28px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer'
            }}>Cancel</button>
          </div>
        </form>
        <BottomNavBar />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{
        padding: '50px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)',
        minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto'
      }}>
        <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 18, left: 18, width: 54, height: 54, zIndex: 101 }} />
        <ProgressBar />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥 Add Team Members</h2>
        <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '5px' }}>Team: {teamName}</p>
        <p style={{ fontSize: '0.9rem', color: '#4CAF50', marginBottom: '20px', fontWeight: 'bold' }}>
          ✓ Leader + {members.length} Member{members.length !== 1 ? 's' : ''} = {members.length + 1} Total
        </p>
        {members.length > 0 && (
          <div style={{
            maxWidth: '700px', width: '100%', marginBottom: '20px', background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>Added Members:</h3>
            {members.map((member, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.2)', padding: '12px 15px', borderRadius: '10px',
                marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{member.name}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>{member.rollNo} • {member.email}</div>
                </div>
                <button onClick={() => removeMember(idx)} style={{
                  background: '#ff4444', color: '#fff', border: 'none', borderRadius: '8px',
                  padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold'
                }}>✕</button>
              </div>
            ))}
          </div>
        )}
        <form style={{
          maxWidth: '700px', width: '100%', background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'grid', gap: '15px',
          border: '1px solid rgba(255,255,255,0.2)'
        }} onSubmit={addMember}>
          <h3 style={{ textAlign: 'left', marginBottom: '5px' }}>Add New Member:</h3>
          {['name', 'rollNo', 'mobile', 'year', 'branch', 'email', 'college'].map((field) => (
            <input key={field} placeholder={field === 'name' ? 'Member name' : field === 'rollNo' ? 'Roll number' : field === 'mobile' ? 'Mobile number' : field.charAt(0).toUpperCase() + field.slice(1)}
              name={field} type={field === 'email' ? 'email' : field === 'mobile' ? 'tel' : 'text'}
              value={currentMember[field]} onChange={handleMemberChange} required style={inputStyle} />
          ))}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
            <button type="submit" style={{
              padding: '14px 28px', borderRadius: '14px', background: '#fff', color: '#667eea',
              fontWeight: 'bold', border: 'none', cursor: 'pointer'
            }}>➕ Add Member</button>
            <button type="button" onClick={() => setStep(3)} style={{
              padding: '14px 28px', borderRadius: '14px', background: '#4CAF50', color: '#fff',
              fontWeight: 'bold', border: 'none', cursor: 'pointer'
            }}>Continue to Payment →</button>
            <button type="button" onClick={() => setStep(1)} style={{
              padding: '14px 28px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer'
            }}>← Back</button>
          </div>
        </form>
        <BottomNavBar />
      </div>
    );
  }

  return (
    <div style={{
      padding: '50px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)',
      minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 18, left: 18, width: 54, height: 54, zIndex: 101 }} />
      <ProgressBar />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💳 Payment</h2>
      <div style={{
        maxWidth: '700px', width: '100%', background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>📋 Registration Summary</h3>
        <div style={{
          textAlign: 'left', marginBottom: '25px', background: 'rgba(255,255,255,0.2)',
          padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ marginBottom: '12px', fontSize: '1.05rem' }}><strong>🏆 Team Name:</strong> {teamName}</div>
          <div style={{ marginBottom: '12px', fontSize: '1.05rem' }}><strong>👤 Leader:</strong> {teamLeader.name}</div>
          <div style={{ marginBottom: '12px', fontSize: '1.05rem' }}><strong>👥 Total Members:</strong> {members.length + 1}</div>
          <div style={{
            fontSize: '1.3rem', fontWeight: 'bold', marginTop: '15px', padding: '15px',
            background: 'rgba(76, 175, 80, 0.3)', borderRadius: '10px', border: '2px solid #4CAF50'
          }}>💰 Amount: ₹{(members.length + 1) * 100}</div>
        </div>
        <div style={{
          background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '20px', display: 'inline-block'
        }}>
          <div style={{
            width: '200px', height: '200px', background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '1.2rem', fontWeight: 'bold'
          }}>QR Code</div>
          <p style={{ color: '#333', marginTop: '10px', fontSize: '0.9rem' }}>Scan to Pay</p>
        </div>
        <form onSubmit={handlePayment}>
          <input placeholder="Enter Transaction ID / UPI Reference" required style={{
            ...inputStyle, marginBottom: '15px'
          }} />
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textAlign: 'left',
              color: '#fff'
            }}>
              🔗 Google Drive Link for Payment Screenshot *
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={screenshotLink}
              onChange={(e) => setScreenshotLink(e.target.value)}
              required
              style={{
                ...inputStyle,
                marginBottom: '5px'
              }}
            />
            <p style={{ fontSize: '0.85rem', color: '#e0e0e0', textAlign: 'left', marginTop: '5px' }}>
              Please ensure the link has view access enabled
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="submit" style={{
              padding: '14px 32px', borderRadius: '14px', background: '#4CAF50', color: '#fff',
              fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.05rem'
            }}>✓ Submit Payment</button>
            <button type="button" onClick={() => setStep(2)} style={{
              padding: '14px 28px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer'
            }}>← Back</button>
          </div>
        </form>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default TeamRegistration;
