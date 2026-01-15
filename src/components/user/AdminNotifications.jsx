import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import config from '../../config';

const AdminNotifications = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendToAll, setSendToAll] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('admintoken');
  const apiUrl = config.API_BASE_URL.replace('/api', '');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data.users || data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'image/gif', 'image/webp'];
      if (validTypes.includes(file.type)) {
        setAttachment(file);
      } else {
        Swal.fire('Error', 'Please select a valid file (PNG, JPG, PDF, GIF, WEBP)', 'error');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sendToAll && selectedUsers.length === 0) {
      Swal.fire('Warning', 'Please select at least one user or choose "Send to All"', 'warning');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('sendToAll', sendToAll);
    if (!sendToAll) {
      formData.append('userIds', JSON.stringify(selectedUsers));
    }
    if (attachment) formData.append('attachment', attachment);

    try {
      const res = await fetch(`${apiUrl}/api/admin/send-notification`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        Swal.fire('Success', 'Notification sent successfully!', 'success');
        setSubject('');
        setMessage('');
        setAttachment(null);
        setSelectedUsers([]);
        setSendToAll(false);
        document.getElementById('fileInput').value = '';
      } else {
        Swal.fire('Error', 'Failed to send notification', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to send notification', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const selectAll = () => setSelectedUsers(users.map(u => u.id));
  const deselectAll = () => setSelectedUsers([]);

  return (
    <div style={{ padding: '40px 20px', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <h2 style={{ color: '#00eaff', marginBottom: '30px', textAlign: 'center', fontSize: '2rem' }}>Send Notifications</h2>

        <form onSubmit={handleSubmit} style={{ background: 'rgba(0,234,255,0.05)', padding: '30px', borderRadius: '15px', border: '1px solid #00eaff33' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#00eaff' }}>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(0,234,255,0.1)', border: '1px solid #00eaff', borderRadius: '5px', color: '#fff' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#00eaff' }}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            style={{ width: '100%', padding: '10px', background: 'rgba(0,234,255,0.1)', border: '1px solid #00eaff', borderRadius: '5px', color: '#fff' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#00eaff' }}>Attachment (PNG, JPG, PDF, GIF, WEBP)</label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            accept=".png,.jpg,.jpeg,.pdf,.gif,.webp"
            style={{ width: '100%', padding: '10px', background: 'rgba(0,234,255,0.1)', border: '1px solid #00eaff', borderRadius: '5px', color: '#fff' }}
          />
          {attachment && <p style={{ marginTop: '5px', color: '#00eaff' }}>📎 {attachment.name}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', color: '#00eaff', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sendToAll}
              onChange={(e) => setSendToAll(e.target.checked)}
              style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Send to All Users</span>
          </label>
        </div>

        {!sendToAll && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ color: '#00eaff' }}>Select Users ({selectedUsers.length} selected)</label>
              <div>
                <button type="button" onClick={selectAll} style={{ padding: '5px 15px', background: '#00eaff33', border: '1px solid #00eaff', borderRadius: '5px', color: '#fff', marginRight: '10px', cursor: 'pointer' }}>
                  Select All
                </button>
                <button type="button" onClick={deselectAll} style={{ padding: '5px 15px', background: '#00eaff33', border: '1px solid #00eaff', borderRadius: '5px', color: '#fff', cursor: 'pointer' }}>
                  Deselect All
                </button>
              </div>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto', background: 'rgba(0,234,255,0.05)', border: '1px solid #00eaff', borderRadius: '5px', padding: '10px' }}>
              {users.map(user => (
                <label key={user.id} style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer', borderBottom: '1px solid #00eaff22' }}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    style={{ marginRight: '10px' }}
                  />
                  <span>{user.name} ({user.email})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ color: '#00eaff' }}>Sending notification...</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '12px 30px', background: loading ? '#666' : '#00eaff', color: loading ? '#ccc' : '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Sending...' : 'Send Notification'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default AdminNotifications;
