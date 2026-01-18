import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tkLogo from '../../assets/images/tk26.png';
import BottomNavBar from './BottomNavBar';
import config from '../../config';

const BASE_URL = `${config.BASE_URL}/api/users`;

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
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

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
      toast.error('Please verify team leader email before continuing.');
      return;
    }
    if (!isExistingUser && teamLeader.password !== teamLeader.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    setStep(2);
  };

  const sendOtp = async () => {
    if (!teamLeader.email) {
      toast.warning('Please enter team leader email first.');
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
        setOtpSent(true);
        if (data.isExistingUser) {
          setIsExistingUser(true);
        }
        toast.success(`Verification code sent to ${teamLeader.email}`);
      } else {
        toast.error(data.message || 'Please try again.');
      }
    } catch (error) {
      toast.error('Failed to connect to server.');
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
        toast.success('Team leader email verified successfully.');
      } else {
        toast.error(data.message || 'Please enter the correct verification code.');
      }
    } catch (error) {
      toast.error('Failed to verify OTP.');
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
      toast.warning('Please provide Google Drive link for payment screenshot.');
      return;
    }
    
    setSubmittingPayment(true);
    
    const payload = {
      teamName,
      teamLeader: {
        name: teamLeader.name,
        rollNo: teamLeader.rollNo,
        mobile: teamLeader.mobile,
        year: teamLeader.year,
        branch: teamLeader.branch,
        email: teamLeader.email,
        college: teamLeader.college,
        password: teamLeader.password
      },
      members,
      eventId: eventId || '',
      eventName: eventName || '',
      transactionId,
      screenshotUrl: screenshotLink,
      isExistingUser
    };
    
    console.log('Payload being sent:', payload);
    console.log('Members array:', members);
    
    try {
      const response = await fetch(`${BASE_URL}/register-team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (response.ok) {
        toast.success(`Registration Complete! Team: ${teamName}`);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(data.error || 'Something went wrong!');
      }
    } catch (error) {
      toast.error('Failed to connect to server. Please try again.');
    } finally {
      setSubmittingPayment(false);
    }
  };

  const inputStyle = {
    padding: '15px', borderRadius: '12px', border: '1px solid rgba(0,220,255,0.3)', outline: 'none',
    fontSize: '1rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', color: '#fff', width: '100%',
    transition: 'all 0.3s ease'
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
        background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)',
        minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Animated background dots */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'rgba(0,220,255,0.6)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <style>
          {`
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.5); }
            }
          `}
        </style>
        <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 15, right: 15, width: 54, height: 54, zIndex: 101, filter: 'drop-shadow(0 0 8px rgba(0,234,255,0.6)) brightness(1.1)' }} />
        <ProgressBar />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>👤 Team Leader Details</h2>
        {eventName && <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '20px' }}>Event: {eventName}</p>}
        <form className="form-grid" style={{
          maxWidth: '900px', width: '100%', background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', display: 'grid', gap: '20px',
          border: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 1
        }} onSubmit={handleLeaderSubmit}>
          <style>
            {`
              @media (min-width: 768px) {
                .form-grid {
                  grid-template-columns: 1fr 1fr;
                  gap: 25px;
                }
                .form-full-width {
                  grid-column: 1 / -1;
                }
                .form-half-width {
                  grid-column: span 1;
                }
              }
              @media (min-width: 1024px) {
                .form-grid {
                  grid-template-columns: 2fr 1fr 1fr;
                  gap: 30px;
                }
                .form-two-thirds {
                  grid-column: span 2;
                }
                .form-grid {
                  padding: 50px;
                }
              }
            `}
          </style>
          <input placeholder="Team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required className="form-full-width" style={inputStyle} />
          {['name', 'rollNo', 'mobile'].map((field) => (
            <input key={field} placeholder={field === 'name' ? 'Leader name' : field === 'rollNo' ? 'Roll number' : 'Mobile number'}
              name={field} type={field === 'mobile' ? 'tel' : 'text'}
              value={teamLeader[field]} onChange={handleLeaderChange} required 
              className={field === 'name' ? 'form-two-thirds' : 'form-half-width'}
              style={inputStyle} />
          ))}
          <select
            name="year"
            value={teamLeader.year}
            onChange={handleLeaderChange}
            required
            className="form-half-width"
            style={{ ...inputStyle, color: teamLeader.year ? '#fff' : '#999' }}
          >
            <option value="" disabled>Select Year</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
          <select
            name="branch"
            value={teamLeader.branch}
            onChange={handleLeaderChange}
            required
            className="form-half-width"
            style={{ ...inputStyle, color: teamLeader.branch ? '#fff' : '#999' }}
          >
            <option value="" disabled>Select Branch</option>
            <optgroup label="Computer Science">
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AIDS">AIDS</option>
              <option value="AI&ML">AI & ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
            </optgroup>
            <optgroup label="Electronics">
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="EIE">EIE</option>
            </optgroup>
            <optgroup label="Mechanical">
              <option value="MECH">MECH</option>
              <option value="Automobile">Automobile</option>
              <option value="Mechatronics">Mechatronics</option>
            </optgroup>
            <optgroup label="Civil & Others">
              <option value="CIVIL">CIVIL</option>
              <option value="Chemical">Chemical</option>
              <option value="Biotechnology">Biotechnology</option>
            </optgroup>
            <optgroup label="PG Programs">
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
            </optgroup>
            <option value="OTHERS">OTHERS</option>
          </select>
          <input placeholder="College" name="college" type="text" value={teamLeader.college} onChange={handleLeaderChange} required className="form-full-width" style={inputStyle} />
          
          {/* Email with verification */}
          <div className="form-full-width" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                disabled={sendingOtp || otpSent}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: otpSent ? '#4CAF50' : sendingOtp ? '#999' : '#667eea',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: sendingOtp || otpSent ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {sendingOtp ? 'Sending...' : otpSent ? 'Sent ✓' : 'Send OTP'}
              </button>
            )}
            {emailVerified && <span style={{ color: '#4CAF50', fontSize: '1.5rem' }}>✓</span>}
          </div>

          {/* OTP verification */}
          {!emailVerified && teamLeader.email && (
            <div className="form-full-width" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          {!isExistingUser && (
            <>
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={teamLeader.password}
                onChange={handleLeaderChange}
                required
                className="form-half-width"
                style={inputStyle}
              />
              <input
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={teamLeader.confirmPassword}
                onChange={handleLeaderChange}
                required
                className="form-half-width"
                style={inputStyle}
              />
            </>
          )}
          <div className="form-full-width" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
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
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{
        padding: '50px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)',
        minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Animated background dots */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'rgba(0,220,255,0.6)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 15, right: 15, width: 54, height: 54, zIndex: 101, filter: 'drop-shadow(0 0 8px rgba(0,234,255,0.6)) brightness(1.1)' }} />
        <ProgressBar />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥 Add Team Members</h2>
        <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '5px' }}>Team: {teamName}</p>
        <p style={{ fontSize: '0.9rem', color: '#4CAF50', marginBottom: '20px', fontWeight: 'bold' }}>
          ✓ Leader + {members.length} Member{members.length !== 1 ? 's' : ''} = {members.length + 1} Total
        </p>
        {members.length > 0 && (
          <div style={{
            maxWidth: '700px', width: '100%', marginBottom: '20px', background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative', zIndex: 1
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
        <form className="form-grid" style={{
          maxWidth: '900px', width: '100%', background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', display: 'grid', gap: '20px',
          border: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 1
        }} onSubmit={addMember}>
          <style>
            {`
              @media (min-width: 768px) {
                .form-grid {
                  grid-template-columns: 1fr 1fr;
                  gap: 25px;
                }
                .form-full-width {
                  grid-column: 1 / -1;
                }
                .form-half-width {
                  grid-column: span 1;
                }
              }
              @media (min-width: 1024px) {
                .form-grid {
                  grid-template-columns: 2fr 1fr 1fr;
                  gap: 30px;
                }
                .form-two-thirds {
                  grid-column: span 2;
                }
              }
            `}
          </style>
          <h3 className="form-full-width" style={{ textAlign: 'left', marginBottom: '5px' }}>Add New Member:</h3>
          {['name', 'rollNo', 'mobile'].map((field) => (
            <input key={field} placeholder={field === 'name' ? 'Member name' : field === 'rollNo' ? 'Roll number' : 'Mobile number'}
              name={field} type={field === 'mobile' ? 'tel' : 'text'}
              value={currentMember[field]} onChange={handleMemberChange} required 
              className={field === 'name' ? 'form-two-thirds' : 'form-half-width'}
              style={inputStyle} />
          ))}
          <select
            name="year"
            value={currentMember.year}
            onChange={handleMemberChange}
            required
            className="form-half-width"
            style={{ ...inputStyle, color: currentMember.year ? '#fff' : '#999' }}
          >
            <option value="" disabled>Select Year</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
          <select
            name="branch"
            value={currentMember.branch}
            onChange={handleMemberChange}
            required
            className="form-half-width"
            style={{ ...inputStyle, color: currentMember.branch ? '#fff' : '#999' }}
          >
            <option value="" disabled>Select Branch</option>
            <optgroup label="Computer Science">
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AIDS">AIDS</option>
              <option value="AI&ML">AI & ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
            </optgroup>
            <optgroup label="Electronics">
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="EIE">EIE</option>
            </optgroup>
            <optgroup label="Mechanical">
              <option value="MECH">MECH</option>
              <option value="Automobile">Automobile</option>
              <option value="Mechatronics">Mechatronics</option>
            </optgroup>
            <optgroup label="Civil & Others">
              <option value="CIVIL">CIVIL</option>
              <option value="Chemical">Chemical</option>
              <option value="Biotechnology">Biotechnology</option>
            </optgroup>
            <optgroup label="PG Programs">
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
            </optgroup>
            <option value="OTHERS">OTHERS</option>
          </select>
          <input placeholder="Email" name="email" type="email" value={currentMember.email} onChange={handleMemberChange} required className="form-half-width" style={inputStyle} />
          <input placeholder="College" name="college" type="text" value={currentMember.college} onChange={handleMemberChange} required className="form-half-width" style={inputStyle} />
          <div className="form-full-width" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
            <button type="submit" style={{
              padding: '14px 28px', borderRadius: '14px', background: '#fff', color: '#667eea',
              fontWeight: 'bold', border: 'none', cursor: 'pointer'
            }}>➕ Add Member</button>
            <button type="button" onClick={() => {
              // Auto-add current member if form is filled
              if (currentMember.name && currentMember.rollNo && currentMember.mobile && 
                  currentMember.year && currentMember.branch && currentMember.email && currentMember.college) {
                setMembers([...members, currentMember]);
                setCurrentMember({ name: '', rollNo: '', mobile: '', year: '', branch: '', email: '', college: '' });
              }
              setStep(3);
            }} style={{
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
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }

  return (
    <div style={{
      padding: '50px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Animated background dots */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'rgba(0,220,255,0.6)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 15, right: 15, width: 54, height: 54, zIndex: 101, filter: 'drop-shadow(0 0 8px rgba(0,234,255,0.6)) brightness(1.1)' }} />
      <ProgressBar />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💳 Payment</h2>
      <div style={{
        maxWidth: '700px', width: '100%', background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative', zIndex: 1
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>📋 Registration Summary</h3>
        <div style={{
          textAlign: 'left', marginBottom: '25px', background: 'rgba(255,255,255,0.1)',
          padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)'
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
            <button type="submit" disabled={submittingPayment} style={{
              padding: '14px 32px', borderRadius: '14px', 
              background: submittingPayment ? '#999' : '#4CAF50', 
              color: '#fff',
              fontWeight: 'bold', border: 'none', 
              cursor: submittingPayment ? 'not-allowed' : 'pointer', 
              fontSize: '1.05rem'
            }}>{submittingPayment ? 'Submitting...' : '✓ Submit Payment'}</button>
            <button type="button" onClick={() => setStep(2)} style={{
              padding: '14px 28px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer'
            }}>← Back</button>
          </div>
        </form>
      </div>
      <BottomNavBar />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default TeamRegistration;
