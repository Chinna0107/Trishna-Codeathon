import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import config from '../../config';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const sciFiInputClass = "mt-1 block w-full px-4 py-3 bg-transparent border-2 border-cyan-400/50 rounded-md shadow-sm placeholder-cyan-300/70 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 sm:text-sm tracking-wider font-sci-fi";
  const sciFiButtonClass = "w-full text-black font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,220,255,0.5)] hover:shadow-[0_0_25px_rgba(0,220,255,0.8)] font-sci-fi tracking-wider text-lg";
  const sciFiLabelClass = "block text-sm font-medium text-cyan-300 uppercase tracking-wider font-sci-fi";

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${config.BASE_URL}/api/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: 'Check your email for the verification code.',
          confirmButtonColor: '#00eaff'
        });
        setStep(2);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to send OTP',
          confirmButtonColor: '#00eaff'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send OTP. Please try again.',
        confirmButtonColor: '#00eaff'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${config.BASE_URL}/api/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Verified!',
          text: 'Now set your new password.',
          confirmButtonColor: '#00eaff'
        });
        setStep(3);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid OTP',
          text: data.message || 'Please check your OTP and try again.',
          confirmButtonColor: '#00eaff'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to verify OTP. Please try again.',
        confirmButtonColor: '#00eaff'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        confirmButtonColor: '#00eaff'
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long.',
        confirmButtonColor: '#00eaff'
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${config.BASE_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset!',
          text: 'Your password has been successfully reset.',
          confirmButtonColor: '#00eaff'
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to reset password',
          confirmButtonColor: '#00eaff'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to reset password. Please try again.',
        confirmButtonColor: '#00eaff'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sci-fi">
      <div className="relative bg-black/70 backdrop-blur-md p-1 rounded-lg shadow-2xl border-2 border-cyan-500/70 w-full max-w-md" 
           style={{boxShadow: '0 0 25px rgba(0, 220, 255, 0.3), 0 0 10px rgba(0,220,255,0.2) inset'}}>
        
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-md"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-md"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-md"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-md"></div>
        
        <div className="p-8">
          <button 
            onClick={() => navigate('/login')} 
            className="absolute top-3 right-3 text-cyan-300 hover:text-white text-3xl z-10 font-mono"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-300 uppercase tracking-widest pt-2 font-sci-fi">
            Reset Password
          </h2>

          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label htmlFor="email" className={sciFiLabelClass}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={sciFiInputClass}
                  placeholder="YOUR EMAIL"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={sciFiButtonClass}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className={sciFiLabelClass}>Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className={sciFiInputClass}
                  placeholder="6-DIGIT CODE"
                  maxLength="6"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={sciFiButtonClass}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-cyan-400 hover:text-cyan-200 font-sci-fi tracking-wide"
              >
                ← Back to Email
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className={sciFiLabelClass}>New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={sciFiInputClass}
                  placeholder="NEW PASSWORD"
                  minLength="6"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={sciFiLabelClass}>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={sciFiInputClass}
                  placeholder="CONFIRM PASSWORD"
                  minLength="6"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={sciFiButtonClass}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;