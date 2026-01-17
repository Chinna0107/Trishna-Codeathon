import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        toast.success('Welcome Coordinator!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });

        localStorage.setItem('coordinatortoken', data.token);
        localStorage.setItem('coordinator', JSON.stringify(data.coordinator));
        
        setTimeout(() => {
          navigate('/coordinator/dashboard');
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.error || 'Invalid credentials', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setLoading(false);
    }
  };

  const sciFiInputClass = "mt-1 block w-full px-4 py-3 bg-transparent border-2 border-cyan-400/50 rounded-md shadow-sm placeholder-cyan-300/70 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 sm:text-sm tracking-wider font-sci-fi";
  const sciFiButtonClass = "w-full text-black font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,220,255,0.5)] hover:shadow-[0_0_25px_rgba(0,220,255,0.8)] font-sci-fi tracking-wider text-lg";
  const sciFiLabelClass = "block text-sm font-medium text-cyan-300 uppercase tracking-wider font-sci-fi";

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
            onClick={() => navigate('/login')} 
            className="absolute top-3 right-3 text-cyan-300 hover:text-white text-3xl z-10 font-mono"
            aria-label="Close"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-300 uppercase tracking-widest pt-2 font-sci-fi">Coordinator Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className={sciFiLabelClass}>Email Address</label>
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
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-cyan-400 hover:text-cyan-200 font-sci-fi tracking-wide underline"
              >
                ← Back to User Login
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={sciFiButtonClass}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Signing In...' : 'Coordinator Access'}
            </button>
          </form>
        </div>
      </div>
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

export default CoordinatorLogin;
