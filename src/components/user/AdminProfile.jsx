import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setProfile(JSON.parse(user));
    }
  }, []);

  if (!profile) return <div style={{ padding: '20px', color: '#00eaff' }}>Loading...</div>;

  const avatarLetter = profile.name ? profile.name.charAt(0).toUpperCase() : 'A';

  return (
    <div style={{ padding: '40px 20px', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: 'rgba(0,234,255,0.05)', padding: '40px', borderRadius: '20px', border: '1px solid #00eaff33', textAlign: 'center' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #00eaff, #0099cc)', margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: '#fff', boxShadow: '0 8px 20px rgba(0,234,255,0.3)' }}>
          {avatarLetter}
        </div>

        <h2 style={{ color: '#00eaff', fontSize: '2rem', marginBottom: '10px' }}>{profile.name}</h2>
        <p style={{ color: '#00eaff99', fontSize: '1.1rem', marginBottom: '30px' }}>Administrator</p>

        <div style={{ textAlign: 'left', background: 'rgba(0,234,255,0.1)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #00eaff22' }}>
            <div style={{ color: '#00eaff99', fontSize: '0.9rem', marginBottom: '5px' }}>Email</div>
            <div style={{ color: '#fff', fontSize: '1.1rem' }}>{profile.email}</div>
          </div>
          
          {profile.mobile && (
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #00eaff22' }}>
              <div style={{ color: '#00eaff99', fontSize: '0.9rem', marginBottom: '5px' }}>Mobile</div>
              <div style={{ color: '#fff', fontSize: '1.1rem' }}>{profile.mobile}</div>
            </div>
          )}

          <div>
            <div style={{ color: '#00eaff99', fontSize: '0.9rem', marginBottom: '5px' }}>Role</div>
            <div style={{ color: '#fff', fontSize: '1.1rem' }}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
