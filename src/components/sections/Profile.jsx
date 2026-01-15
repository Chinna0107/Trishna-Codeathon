import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${config.API_BASE_URL}/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setProfile(JSON.parse(user));
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      const user = localStorage.getItem('user');
      if (user) {
        setProfile(JSON.parse(user));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', color: '#00eaff', textAlign: 'center' }}>Loading...</div>;
  }

  if (!profile) {
    return <div style={{ padding: '20px', color: '#ff4444', textAlign: 'center' }}>Failed to load profile</div>;
  }

  const avatarLetter = profile.name ? profile.name.charAt(0).toUpperCase() : 'U';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: 'rgba(255,255,255,0.95)', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: '#fff', boxShadow: '0 8px 20px rgba(102,126,234,0.4)' }}>
          {avatarLetter}
        </div>

        <h2 style={{ color: '#2d3748', fontSize: '2rem', marginBottom: '10px', fontWeight: '800' }}>{profile.name}</h2>
        <p style={{ color: '#718096', fontSize: '1.1rem', marginBottom: '30px' }}>Participant</p>

        <div style={{ textAlign: 'left', background: 'rgba(102,126,234,0.1)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
            <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '5px' }}>Email</div>
            <div style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' }}>{profile.email}</div>
          </div>
          
          {profile.mobile && (
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
              <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '5px' }}>Mobile</div>
              <div style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' }}>{profile.mobile}</div>
            </div>
          )}

          {profile.rollNo && (
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
              <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '5px' }}>Roll Number</div>
              <div style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' }}>{profile.rollNo}</div>
            </div>
          )}

          {profile.college && (
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
              <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '5px' }}>College</div>
              <div style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' }}>{profile.college}</div>
            </div>
          )}

          {profile.branch && (
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(102,126,234,0.2)' }}>
              <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '5px' }}>Branch</div>
              <div style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' }}>{profile.branch}</div>
            </div>
          )}

          {profile.year && (
            <div>
              <div style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '5px' }}>Year</div>
              <div style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: '600' }}>{profile.year}</div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
          }}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f56565, #e53e3e)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(245,101,101,0.4)' }}
        >
          🔒 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
