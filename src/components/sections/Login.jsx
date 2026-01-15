import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import config from '../../config';

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = config.BASE_URL;

  // Check if user is already logged in
  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    const token = localStorage.getItem('token');
    
    if (adminToken) {
      navigate('/admin/dashboard');
    } else if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrMobile, password })
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: data.message || 'Welcome back!',
          timer: 2000,
          showConfirmButton: false
        });

        if (data.is_admin) {
          if (data.token) localStorage.setItem('admintoken', data.token);
          if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/admin/dashboard');
          window.location.reload();
        } else {
          if (data.token) localStorage.setItem('token', data.token);
          if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/home');
          window.location.reload();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    alert('Forgot password functionality will be implemented soon.');
  };

  // Sci-fi styled input and button classes
  const sciFiInputClass = "mt-1 block w-full px-4 py-3 bg-transparent border-2 border-cyan-400/50 rounded-md shadow-sm placeholder-cyan-300/70 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 sm:text-sm tracking-wider font-sci-fi";
  const sciFiButtonClass = "w-full text-black font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,220,255,0.5)] hover:shadow-[0_0_25px_rgba(0,220,255,0.8)] font-sci-fi tracking-wider text-lg";
  const sciFiLabelClass = "block text-sm font-medium text-cyan-300 uppercase tracking-wider font-sci-fi";
  const sciFiCheckboxLabelClass = "ml-2 text-sm text-cyan-300/80 font-sci-fi tracking-wide";
  const sciFiCheckboxClass = "form-checkbox h-4 w-4 text-cyan-500 bg-transparent border-cyan-400/50 rounded focus:ring-cyan-400 focus:ring-offset-0 focus:ring-offset-gray-900";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sci-fi">
      <div className="relative bg-black/70 backdrop-blur-md p-1 rounded-lg shadow-2xl border-2 border-cyan-500/70 w-full max-w-md" 
           style={{boxShadow: '0 0 25px rgba(0, 220, 255, 0.3), 0 0 10px rgba(0,220,255,0.2) inset'}}>
        {/* Corner graphics */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-md"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-md"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-md"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-md"></div>
        
        <div className="p-8">
          {/* Close button */}
          <button 
            onClick={() => navigate('/')} 
            className="absolute top-3 right-3 text-cyan-300 hover:text-white text-3xl z-10 font-mono"
            aria-label="Close"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-300 uppercase tracking-widest pt-2 font-sci-fi">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="emailOrMobile" className={sciFiLabelClass}>Email or Mobile Number</label>
              <input
                type="text"
                id="emailOrMobile"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                required
                className={sciFiInputClass}
                placeholder="EMAIL OR MOBILE"
              />
            </div>
            <div>
              <label htmlFor="password" className={sciFiLabelClass}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={sciFiInputClass}
                placeholder="************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => alert('Forgot password functionality will be implemented soon.')}
                className="text-sm text-cyan-400 hover:text-cyan-200 font-sci-fi tracking-wide"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={sciFiButtonClass}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
