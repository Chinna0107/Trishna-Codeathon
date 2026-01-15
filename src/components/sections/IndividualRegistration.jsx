import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import config from '../../config';

const BASE_URL = config.API_BASE_URL.replace('/api', '') + '/api/users';

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
      Swal.fire({
        icon: 'error',
        title: 'Email Not Verified',
        text: 'Please verify your email before continuing.',
        confirmButtonColor: '#667eea'
      });
      return;
    }
    if (participant.password !== participant.confirmPassword) {
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
    if (!participant.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email first.',
        confirmButtonColor: '#667eea'
      });
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
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: `Verification code sent to ${participant.email}`,
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
          email: participant.email, 
          otp: otp 
        })
      });
      const data = await response.json();
      if (response.ok) {
        setEmailVerified(true);
        Swal.fire({
          icon: 'success',
          title: 'Email Verified!',
          text: 'Your email has been verified successfully.',
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
        Swal.fire({
          icon: 'success',
          title: 'Registration Complete!',
          html: `<strong>Name:</strong> ${participant.name}<br><strong>Email:</strong> ${participant.email}`,
          confirmButtonColor: '#667eea'
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
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          minHeight: '100vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
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
          style={{
            maxWidth: '700px',
            width: '100%',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'grid',
            gap: '15px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {['name', 'rollNo', 'mobile', 'year', 'branch', 'college'].map((field) => (
            <motion.input
              key={field}
              placeholder={field === 'name' ? 'Full name' :
                          field === 'rollNo' ? 'Roll number' :
                          field === 'mobile' ? 'Mobile number' :
                          field === 'year' ? 'Year' :
                          field === 'branch' ? 'Branch / Department' :
                          'College name'}
              name={field}
              type={field === 'mobile' ? 'tel' : 'text'}
              value={participant[field]}
              onChange={handleChange}
              required
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
          ))}

          {/* Email with verification */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                disabled={sendingOtp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            )}
            {emailVerified && <span style={{ color: '#4CAF50', fontSize: '1.5rem' }}>✓</span>}
          </div>

          {/* OTP verification */}
          {!emailVerified && participant.email && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          <motion.input
            placeholder="Password"
            name="password"
            type="password"
            value={participant.password}
            onChange={handleChange}
            required
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
          <motion.input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={participant.confirmPassword}
            onChange={handleChange}
            required
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

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
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
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        minHeight: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
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
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.2)'
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
      </motion.div>
    </motion.div>
  );
};

export default IndividualRegistration;
