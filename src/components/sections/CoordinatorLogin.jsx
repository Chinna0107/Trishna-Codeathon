import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import config from '../../config';

const CoordinatorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    if (coordinatorToken) {
      navigate('/coordinator/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${config.BASE_URL}/api/coordinators/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome Coordinator!',
          timer: 2000,
          showConfirmButton: false
        });

        localStorage.setItem('coordinatortoken', data.token);
        localStorage.setItem('coordinator', JSON.stringify(data.coordinator));
        navigate('/coordinator/dashboard');
        window.location.reload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error || 'Invalid credentials'
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

  const sciFiInputClass = "mt-1 block w-full px-4 py-3 bg-transparent border-2 border-purple-400/50 rounded-md shadow-sm placeholder-purple-300/70 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 sm:text-sm tracking-wider font-sci-fi";
  const sciFiButtonClass = "w-full text-black font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 bg-purple-400 hover:bg-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] font-sci-fi tracking-wider text-lg";
  const sciFiLabelClass = "block text-sm font-medium text-purple-300 uppercase tracking-wider font-sci-fi";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sci-fi">
      <div className="relative bg-black/70 backdrop-blur-md p-1 rounded-lg shadow-2xl border-2 border-purple-500/70 w-full max-w-md" 
           style={{boxShadow: '0 0 25px rgba(168, 85, 247, 0.3), 0 0 10px rgba(168,85,247,0.2) inset'}}>
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-400 rounded-tl-md"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-400 rounded-tr-md"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-400 rounded-bl-md"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-400 rounded-br-md"></div>
        
        <div className="p-8">
          <button 
            onClick={() => navigate('/login')} 
            className="absolute top-3 right-3 text-purple-300 hover:text-white text-3xl z-10 font-mono"
            aria-label="Close"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold mb-8 text-center text-purple-300 uppercase tracking-widest pt-2 font-sci-fi">Coordinator Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className={sciFiLabelClass}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={sciFiInputClass}
                placeholder="COORDINATOR EMAIL"
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
            <button
              type="submit"
              disabled={loading}
              className={sciFiButtonClass}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-purple-400 hover:text-purple-200 font-sci-fi tracking-wide"
            >
              ← Back to User Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorLogin;
