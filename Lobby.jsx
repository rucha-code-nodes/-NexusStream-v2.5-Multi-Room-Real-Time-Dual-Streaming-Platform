import React, { useState } from 'react';

export default function Lobby({ onJoinRoom }) {
  const [roomId, setRoomId] = useState('');

  const generateRoom = () => {
    const generated = 'NX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(generated);
  };

  const handleConnect = (role) => {
    if (!roomId.trim()) return alert('Please enter or generate a Room ID.');
    onJoinRoom(roomId.trim(), role);
  };

  return (
    <div className="interface-container" style={lobbyContainer}>
      <div className="glass-panel" style={wrapperStyle}>
        <h2 className="gradient-text" style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '8px' }}>Enter Control Gateway</h2>
        <p style={subText}>Create an isolated, end-to-end real-time media room pipeline corridor.</p>
        
        <div style={formGroup}>
          <input type="text" className="input-field" placeholder="Enter Secure Room ID (e.g. NX-A89F)" value={roomId} onChange={(e) => setRoomId(e.target.value)} style={{ textAlign: 'center', fontWeight: '600', letterSpacing: '0.05em' }} />
          <button className="btn-secondary" onClick={generateRoom} style={{ justifyContent: 'center' }}>Generate Secure Key</button>
        </div>

        <div style={dividerStyle}><span style={divTextStyle}>Select Allocation Role</span></div>

        <div style={actionGrid}>
          <button className="btn-primary" onClick={() => handleConnect('client')} style={roleBtn}>
            <span style={{ fontSize: '18px' }}>📡</span> Initialize Broadcast Channel (Client)
          </button>
          <button className="btn-primary" onClick={() => handleConnect('host')} style={{ ...roleBtn, background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 0 20px rgba(2, 132, 199, 0.2)' }}>
            <span style={{ fontSize: '18px' }}>🖥️</span> Initialize Receiver Monitor (Host)
          </button>
        </div>
      </div>
    </div>
  );
}

const lobbyContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' };
const wrapperStyle = { padding: '40px', width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column' };
const subText = { color: '#9ca3af', fontSize: '14px', textAlign: 'center', marginTop: 0, marginBottom: '32px' };
const formGroup = { display: 'flex', flexDirection: 'column', gap: '12px' };
const dividerStyle = { position: 'relative', margin: '32px 0', textAlign: 'center' };
const divTextStyle = { background: '#090d16', padding: '0 12px', fontSize: '12px', color: '#4b5563', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' };
const actionGrid = { display: 'flex', flexDirection: 'column', gap: '14px' };
const roleBtn = { padding: '16px', fontSize: '15px', justifyContent: 'center' };