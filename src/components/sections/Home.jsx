import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../utils/api';
import config from '../../config';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ totalEvents: 0, myRegistrations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchStats(JSON.parse(userData));
  }, [navigate]);

  const fetchStats = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const [eventsRes, regsRes] = await Promise.all([
        fetch(`${config.BASE_URL}/api/events`),
        fetch(`${config.BASE_URL}/api/participants/registrations?email=${userData.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      const events = await eventsRes.json();
      const regs = await regsRes.json();
      setStats({
        totalEvents: events.length || 0,
        myRegistrations: (regs.registrations || regs).length || 0
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2">Welcome Back, {user.name}! 👋</h1>
            <p className="text-gray-300 text-lg">Ready to explore amazing events?</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-red-500/50"
          >
            🚪 Logout
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-xl shadow-xl">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl font-bold">{loading ? '...' : stats.totalEvents}</div>
            <div className="text-cyan-100">Total Events Available</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-xl">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold">{loading ? '...' : stats.myRegistrations}</div>
            <div className="text-green-100">My Registrations</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl shadow-xl">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-bold">{user.college ? '🎓' : '👤'}</div>
            <div className="text-purple-100">{user.college || 'Participant'}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => navigate('/profile')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/20 transition transform hover:scale-105">
              <div className="text-3xl mb-2">👤</div>
              <div className="font-semibold">Profile</div>
            </button>
            <button onClick={() => navigate('/events')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/20 transition transform hover:scale-105">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold">Browse Events</div>
            </button>
            <button onClick={() => navigate('/my-events')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/20 transition transform hover:scale-105">
              <div className="text-3xl mb-2">📋</div>
              <div className="font-semibold">My Events</div>
            </button>
            <button onClick={() => navigate('/schedule')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/20 transition transform hover:scale-105">
              <div className="text-3xl mb-2">📅</div>
              <div className="font-semibold">Schedules</div>
            </button>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-md p-6 rounded-2xl border border-cyan-400/50 hover:border-cyan-400 transition transform hover:scale-105 cursor-pointer shadow-xl" onClick={() => navigate('/profile')}>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cyan-300">My Profile</h2>
                <p className="text-gray-300 text-sm">Personal details</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-gray-200 flex items-center gap-2">📧 {user.email}</p>
              <p className="text-gray-200 flex items-center gap-2">📱 {user.mobile || 'Not provided'}</p>
              {user.college && <p className="text-gray-200 flex items-center gap-2">🏫 {user.college}</p>}
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg w-full font-semibold transition shadow-lg">
              View Full Profile →
            </button>
          </div>

          {/* Events Card */}
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-400/50 hover:border-blue-400 transition transform hover:scale-105 cursor-pointer shadow-xl" onClick={() => navigate('/events')}>
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">Explore Events</h2>
            <p className="text-gray-300 mb-4">Discover {stats.totalEvents}+ exciting events and competitions</p>
            <div className="flex gap-2 mb-4">
              <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">🎪 Cultural</span>
              <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">💻 Technical</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full font-semibold transition shadow-lg">
              Browse All Events →
            </button>
          </div>

          {/* Registrations Card */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md p-6 rounded-2xl border border-green-400/50 hover:border-green-400 transition transform hover:scale-105 cursor-pointer shadow-xl" onClick={() => navigate('/my-events')}>
            <div className="text-5xl mb-3">📋</div>
            <h2 className="text-2xl font-bold text-green-300 mb-2">My Registrations</h2>
            <p className="text-gray-300 mb-4">Track your {stats.myRegistrations} registered events</p>
            <div className="bg-green-500/20 p-3 rounded-lg mb-4">
              <div className="text-sm text-gray-300">Status</div>
              <div className="text-lg font-bold text-green-300">✓ All Active</div>
            </div>
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg w-full font-semibold transition shadow-lg">
              View My Events →
            </button>
          </div>

          {/* Admin Panel */}
          {user.role === 'admin' && (
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-md p-6 rounded-2xl border border-pink-400/50 hover:border-pink-400 transition transform hover:scale-105 cursor-pointer shadow-xl" onClick={() => navigate('/admin/dashboard')}>
              <div className="text-5xl mb-3">⚙️</div>
              <h2 className="text-2xl font-bold text-pink-300 mb-2">Admin Panel</h2>
              <p className="text-gray-300 mb-4">Manage events, users, and notifications</p>
              <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg w-full font-semibold transition shadow-lg">
                Open Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
