import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import UserMenu from '../user/UserMenu';
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

      const response = await fetch(`${config.BASE_URL}/api/users/profile`, {
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
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <UserMenu />
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(102, 126, 234, 0.3)', borderTop: '6px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#2d3748', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <UserMenu />
        <div style={{ marginLeft: '280px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#ff4444', textAlign: 'center' }}>Failed to load profile</div>
        </div>
      </div>
    );
  }

  const qrData = JSON.stringify({
    id: profile.id || profile._id,
    name: profile.name,
    email: profile.email,
    mobile: profile.mobile,
    rollNo: profile.rollNo,
    role: 'participant',
    timestamp: Date.now()
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <UserMenu />
      <div style={{ marginLeft: '280px', flex: 1 }} className="profile-content">
        <style>
          {`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes shimmer {
              0% { background-position: -200px 0; }
              100% { background-position: calc(200px + 100%) 0; }
            }
            .profile-field {
              animation: fadeInUp 0.6s ease-out;
              transition: all 0.3s ease;
            }
            .profile-field:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
            }
            .avatar-glow {
              animation: pulse 2s infinite;
            }
            .qr-container {
              animation: fadeInUp 0.8s ease-out 0.3s both;
            }
            .mobile-padding {
              padding: 0;
            }
            @media (max-width: 768px) {
              .mobile-padding { padding: 15px !important; }
              .profile-content { margin-left: 0 !important; padding: 0 !important; padding-top: 80px !important; }
              .details-qr-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
              .qr-section { padding-top: 0 !important; order: 2; }
              .details-section { order: 1; }
              .profile-card { padding: 25px !important; border-radius: 20px !important; }
              .profile-header { text-align: center !important; margin-bottom: 25px !important; }
              .profile-avatar { width: 100px !important; height: 100px !important; font-size: 2.5rem !important; }
              .profile-title { font-size: 1.8rem !important; }
              .profile-subtitle { font-size: 1rem !important; }
              .profile-field { padding: 15px !important; margin-bottom: 12px !important; }
              .profile-field-label { font-size: 0.75rem !important; }
              .profile-field-value { font-size: 1rem !important; }
              .qr-container { min-height: auto !important; padding: 20px !important; }
              .qr-code { size: 120px !important; }
              .qr-wrapper { padding: 20px !important; }
            }
          `}
        </style>
        
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', padding: '0' }} className="mobile-padding">
          <div style={{ width: '100%' }}>
            {/* Profile Card */}
            <div className="profile-card" style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '40px',
              borderRadius: '0',
              boxShadow: 'none',
              position: 'relative',
              backdropFilter: 'blur(20px)',
              border: 'none',
              width: '100%',
              overflow: 'hidden',
              minHeight: '100vh'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div className="profile-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h1 style={{ fontSize: '2.5rem', color: '#667eea', margin: '0 0 10px 0', fontWeight: 'bold' }}>TRI-COD 2K26</h1>
                  <p style={{ fontSize: '1.2rem', color: '#764ba2', margin: 0 }}>Participant Profile</p>
                </div>

                {/* Profile Section */}
                <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', marginBottom: '30px' }}>
                  {/* Details and QR Grid */}
                  <div className="details-qr-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr', 
                    gap: '30px', 
                    alignItems: 'start' 
                  }}>
                    {/* Left Side - Profile Details */}
                    <div className="details-section" style={{ display: 'grid', gap: '20px' }}>
                      <div className="profile-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div className="avatar-glow profile-avatar" style={{
                          width: '140px',
                          height: '140px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '3.5rem',
                          fontWeight: 'bold',
                          margin: '0 auto 20px',
                          boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4), 0 5px 15px rgba(0,0,0,0.1)',
                          border: '4px solid rgba(255,255,255,0.3)'
                        }}>
                          {profile.name?.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="profile-title" style={{ fontSize: '2.2rem', margin: '0 0 8px 0', color: '#667eea', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{profile.name}</h2>
                        <p className="profile-subtitle" style={{ fontSize: '1.2rem', color: '#764ba2', margin: '0 0 10px 0', fontWeight: '600' }}>🎯 Event Participant</p>
                        <div style={{ 
                          background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1))',
                          padding: '8px 20px',
                          borderRadius: '20px',
                          display: 'inline-block',
                          fontSize: '0.9rem',
                          color: '#667eea',
                          fontWeight: '600'
                        }}>
                          ✨ Active Member
                        </div>
                      </div>
                      
                      <div className="profile-field" style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', 
                        padding: '20px', 
                        borderRadius: '15px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(102, 126, 234, 0.1)'
                      }}>
                        <p className="profile-field-label" style={{ margin: 0, fontSize: '0.85rem', color: '#764ba2', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>📧 Email Address</p>
                        <p className="profile-field-value" style={{ margin: 0, fontSize: '1.1rem', color: '#667eea', fontWeight: '600', wordBreak: 'break-word' }}>{profile.email}</p>
                      </div>
                      
                      {profile.mobile && (
                        <div className="profile-field" style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', 
                          padding: '20px', 
                          borderRadius: '15px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                          border: '1px solid rgba(102, 126, 234, 0.1)'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#764ba2', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>📱 Mobile Number</p>
                          <p style={{ margin: 0, fontSize: '1.1rem', color: '#667eea', fontWeight: '600' }}>{profile.mobile}</p>
                        </div>
                      )}
                      
                      {profile.rollNo && (
                        <div className="profile-field" style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', 
                          padding: '20px', 
                          borderRadius: '15px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                          border: '1px solid rgba(102, 126, 234, 0.1)'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#764ba2', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>🎓 Roll Number</p>
                          <p style={{ margin: 0, fontSize: '1.1rem', color: '#667eea', fontWeight: '600' }}>{profile.rollNo}</p>
                        </div>
                      )}
                      
                      {profile.college && (
                        <div className="profile-field" style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', 
                          padding: '20px', 
                          borderRadius: '15px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                          border: '1px solid rgba(102, 126, 234, 0.1)'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#764ba2', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>🏫 College</p>
                          <p style={{ margin: 0, fontSize: '1.1rem', color: '#667eea', fontWeight: '600' }}>{profile.college}</p>
                        </div>
                      )}
                      
                      {profile.branch && (
                        <div className="profile-field" style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', 
                          padding: '20px', 
                          borderRadius: '15px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                          border: '1px solid rgba(102, 126, 234, 0.1)'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#764ba2', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>📚 Branch</p>
                          <p style={{ margin: 0, fontSize: '1.1rem', color: '#667eea', fontWeight: '600' }}>{profile.branch}</p>
                        </div>
                      )}
                      
                      {profile.year && (
                        <div className="profile-field" style={{ 
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', 
                          padding: '20px', 
                          borderRadius: '15px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                          border: '1px solid rgba(102, 126, 234, 0.1)'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#764ba2', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>📅 Year</p>
                          <p style={{ margin: 0, fontSize: '1.1rem', color: '#667eea', fontWeight: '600' }}>{profile.year}</p>
                        </div>
                      )}
                      
                      <div className="profile-field" style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', 
                        padding: '20px', 
                        borderRadius: '15px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(102, 126, 234, 0.1)'
                      }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#764ba2', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>🔖 Participant ID</p>
                        <p style={{ margin: 0, fontSize: '1.1rem', color: '#667eea', fontWeight: '600' }}>PART-{profile.id || profile._id}</p>
                      </div>
                    </div>
                    
                    {/* Right Side - QR Code */}
                    <div className="qr-section qr-container" style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '300px',
                      paddingTop: '250px',
                      padding: '20px'
                    }}>
                      <h3 style={{ color: '#667eea', marginBottom: '25px', fontSize: '1.3rem', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>QR Code</h3>
                      <div className="qr-wrapper" style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', 
                        padding: '25px', 
                        borderRadius: '20px', 
                        boxShadow: '0 15px 35px rgba(102, 126, 234, 0.2), 0 5px 15px rgba(0,0,0,0.1)',
                        border: '2px solid rgba(102, 126, 234, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                          animation: 'shimmer 2s infinite'
                        }}></div>
                        <QRCodeSVG 
                          className="qr-code"
                          value={qrData}
                          size={160}
                          level="H"
                          includeMargin={false}
                          style={{ position: 'relative', zIndex: 1 }}
                        />
                      </div>
                      <p style={{ 
                        marginTop: '15px', 
                        fontSize: '0.85rem', 
                        color: '#764ba2', 
                        textAlign: 'center',
                        opacity: 0.8,
                        fontWeight: '500'
                      }}>
                        ✨ Scan for attendance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
