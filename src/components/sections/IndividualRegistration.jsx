import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import tkLogo from '../../assets/images/tk26.png';

const BASE_URL = `${config.BASE_URL}/api/users`;

const IndividualRegistration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');
  const eventNameFromUrl = searchParams.get('name');
  
  const [step, setStep] = useState(1);
  const [participant, setParticipant] = useState({
    name: '',
    rollNo: '',
    mobile: '',
    year: '',
    branch: '',
    email: '',
    college: '',
    password: '',
    confirmPassword: ''
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [screenshotLink, setScreenshotLink] = useState('');
  const [eventName, setEventName] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailVerified) {
      toast.error('Please verify your email before continuing.');
      return;
    }
    if (!isExistingUser && participant.password !== participant.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    setStep(2);
  };

  const sendOtp = async () => {
    if (!participant.email) {
      toast.warning('Please enter your email first.');
      return;
    }
    setSendingOtp(true);
    try {
      const response = await fetch(`${BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: participant.email })
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        if (data.isExistingUser) {
          setIsExistingUser(true);
        }
        toast.success(`Verification code sent to ${participant.email}`);
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
          email: participant.email, 
          otp: otp 
        })
      });
      const data = await response.json();
      if (response.ok) {
        setEmailVerified(true);
        toast.success('Your email has been verified successfully.');
      } else {
        toast.error(data.message || 'Please enter the correct verification code.');
      }
    } catch (error) {
      toast.error('Failed to verify OTP.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const transactionId = e.target[0].value;
    
    if (!screenshotLink) {
      toast.warning('Please provide Google Drive link for payment screenshot.');
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: participant.name,
          rollNo: participant.rollNo,
          mobile: participant.mobile,
          year: participant.year,
          branch: participant.branch,
          email: participant.email,
          college: participant.college,
          password: participant.password,
          eventId: eventId || '',
          eventName: eventName || '',
          transactionId: transactionId,
          screenshotUrl: screenshotLink
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration Complete!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(data.error || 'Something went wrong!');
      }
    } catch (error) {
      toast.error('Failed to connect to server. Please try again.');
    }
  };

  // Step 1: Participant Details
  if (step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '50px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '100vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* TK Logo */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10
        }}>
          <img 
            src={tkLogo} 
            alt="TK26 Logo" 
            style={{ 
              height: '35px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }} 
          />
        </div>
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
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
              50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
            }
          `}
        </style>
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
        >
          👤 Individual Registration
        </motion.h2>
        <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '30px' }}>{eventName}</p>

        <motion.form
          className="form-grid"
          style={{
            maxWidth: '700px',
            width: '100%',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            display: 'grid',
            gap: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            zIndex: 1
          }}
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <style>
            {`
              @media (min-width: 768px) {
                .form-grid {
                  grid-template-columns: 1fr 1fr;
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
                  grid-template-columns: 1fr 1fr 1fr;
                }
                .form-two-thirds {
                  grid-column: span 2;
                }
              }
            `}
          </style>
          {['name', 'rollNo', 'mobile'].map((field) => (
            <motion.input
              key={field}
              placeholder={field === 'name' ? 'Full name' :
                          field === 'rollNo' ? 'Roll number' :
                          'Mobile number'}
              name={field}
              type={field === 'mobile' ? 'tel' : 'text'}
              value={participant[field]}
              onChange={handleChange}
              required
              className={field === 'name' ? 'form-two-thirds' : 'form-half-width'}
              whileFocus={{ scale: 1.02 }}
              style={{
                padding: '15px',
                borderRadius: '12px',
                border: '1px solid rgba(0,220,255,0.3)',
                outline: 'none',
                fontSize: '1rem',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                transition: 'all 0.3s ease'
              }}
            />
          ))}

          <motion.select
            name="year"
            value={participant.year}
            onChange={handleChange}
            required
            className="form-half-width"
            whileFocus={{ scale: 1.02 }}
            style={{
              padding: '15px',
              borderRadius: '12px',
              border: '1px solid rgba(0,220,255,0.3)',
              outline: 'none',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              transition: 'all 0.3s ease'
            }}
          >
            <option value="" disabled>Select Year</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </motion.select>

          <motion.select
            name="branch"
            value={participant.branch}
            onChange={handleChange}
            required
            className="form-half-width"
            whileFocus={{ scale: 1.02 }}
            style={{
              padding: '15px',
              borderRadius: '12px',
              border: '1px solid rgba(0,220,255,0.3)',
              outline: 'none',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              transition: 'all 0.3s ease'
            }}
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
          </motion.select>

          <motion.input
            placeholder="College name"
            name="college"
            type="text"
            value={participant.college}
            onChange={handleChange}
            required
            className="form-full-width"
            whileFocus={{ scale: 1.02 }}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: '2px solid transparent',
              outline: 'none',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.95)',
              color: '#333'
            }}
          />

          {/* Email with verification */}
          <div className="form-full-width" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <motion.input
              placeholder="Email"
              name="email"
              type="email"
              value={participant.email}
              onChange={handleChange}
              required
              disabled={emailVerified}
              whileFocus={{ scale: 1.02 }}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: emailVerified ? '2px solid #4CAF50' : '2px solid transparent',
                outline: 'none',
                fontSize: '1rem',
                background: emailVerified ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255,255,255,0.95)',
                color: '#333'
              }}
            />
            {!emailVerified && (
              <motion.button
                type="button"
                onClick={sendOtp}
                disabled={sendingOtp || otpSent}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            )}
            {emailVerified && <span style={{ color: '#4CAF50', fontSize: '1.5rem' }}>✓</span>}
          </div>

          {/* OTP verification */}
          {!emailVerified && participant.email && (
            <div className="form-full-width" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <motion.input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: '2px solid transparent',
                  outline: 'none',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.95)',
                  color: '#333'
                }}
              />
              <motion.button
                type="button"
                onClick={verifyOtp}
                disabled={verifyingOtp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            </div>
          )}

          {/* Password fields */}
          {!isExistingUser && (
            <>
              <motion.input
                placeholder="Password"
                name="password"
                type="password"
                value={participant.password}
                onChange={handleChange}
                required
                className="form-half-width"
                whileFocus={{ scale: 1.02 }}
                style={{
                  padding: '15px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,220,255,0.3)',
                  outline: 'none',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  transition: 'all 0.3s ease'
                }}
              />
              <motion.input
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={participant.confirmPassword}
                onChange={handleChange}
                required
                className="form-half-width"
                whileFocus={{ scale: 1.02 }}
                style={{
                  padding: '15px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,220,255,0.3)',
                  outline: 'none',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  transition: 'all 0.3s ease'
                }}
              />
            </>
          )}

          <div className="form-full-width" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 32px',
                borderRadius: '14px',
                background: '#fff',
                color: '#667eea',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                fontSize: '1rem'
              }}
            >
              Continue to Payment →
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 28px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}
              onClick={() => navigate('/')}
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
        
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
      </motion.div>
    );
  }

  // Step 2: Payment
  return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '50px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '100vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* TK Logo */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10
        }}>
          <img 
            src={tkLogo} 
            alt="TK26 Logo" 
            style={{ 
              height: '35px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }} 
          />
        </div>
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
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
      >
        💳 Payment
      </motion.h2>
      <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '30px' }}>{eventName}</p>

      <motion.div
        style={{
          maxWidth: '700px',
          width: '100%',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 1
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>📋 Registration Summary</h3>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ 
            textAlign: 'left', 
            marginBottom: '25px', 
            background: 'rgba(255,255,255,0.2)', 
            padding: '25px', 
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <div style={{ marginBottom: '12px', fontSize: '1.05rem' }}>
            <strong>👤 Name:</strong> {participant.name}
          </div>
          <div style={{ marginBottom: '12px', fontSize: '1.05rem' }}>
            <strong>📧 Email:</strong> {participant.email}
          </div>
          <div style={{ marginBottom: '12px', fontSize: '1.05rem' }}>
            <strong>📱 Mobile:</strong> {participant.mobile}
          </div>
          <div style={{ 
            fontSize: '1.3rem', 
            fontWeight: 'bold', 
            marginTop: '15px', 
            padding: '15px', 
            background: 'rgba(76, 175, 80, 0.3)', 
            borderRadius: '10px',
            border: '2px solid #4CAF50'
          }}>
            💰 Amount: ₹100
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '20px',
            display: 'inline-block'
          }}
        >
          <div style={{
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            QR Code
          </div>
          <p style={{ color: '#333', marginTop: '10px', fontSize: '0.9rem' }}>Scan to Pay</p>
        </motion.div>

        <form onSubmit={handlePayment}>
          <motion.input
            placeholder="Enter Transaction ID / UPI Reference"
            required
            whileFocus={{ scale: 1.02 }}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: '2px solid transparent',
              outline: 'none',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.95)',
              color: '#333',
              width: '100%',
              marginBottom: '15px'
            }}
          />

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>
              🔗 Google Drive Link for Payment Screenshot *
            </label>
            <motion.input
              type="url"
              placeholder="https://drive.google.com/..."
              value={screenshotLink}
              onChange={(e) => setScreenshotLink(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
              style={{
                padding: '14px',
                borderRadius: '12px',
                border: '2px solid transparent',
                outline: 'none',
                fontSize: '1rem',
                background: 'rgba(255,255,255,0.95)',
                color: '#333',
                width: '100%',
                marginBottom: '15px'
              }}
            />
            <p style={{ fontSize: '0.85rem', color: '#e0e0e0', textAlign: 'left', marginTop: '5px' }}>
              Please ensure the link has view access enabled
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 32px',
                borderRadius: '14px',
                background: '#4CAF50',
                color: '#fff',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                fontSize: '1.05rem'
              }}
            >
              ✓ Submit Payment
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 28px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}
              onClick={() => setStep(1)}
            >
              ← Back
            </motion.button>
          </div>
        </form>
        
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
      </motion.div>
    </motion.div>
  );
};

export default IndividualRegistration;
