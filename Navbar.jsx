import React from 'react';

export default function Navbar({ currentView, setView, theme, setTheme }) {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <span style={dotStyle}></span>
        <h1 style={titleStyle}>NexusStream <span style={subBadge}>v2.5</span></h1>
      </div>
      
      <div style={menuStyle}>
        <button style={{...navBtn, color: currentView === 'lobby' ? '#00f2fe' : '#9ca3af'}} onClick={() => setView('lobby')}>Lobby Gateway</button>
        <button style={{...navBtn, color: currentView === 'status' ? '#00f2fe' : '#9ca3af'}} onClick={() => setView('status')}>Network Nodes</button>
        <button style={{...navBtn, color: currentView === 'history' ? '#00f2fe' : '#9ca3af'}} onClick={() => setView('history')}>Audit Logs</button>
        <button style={{...navBtn, color: currentView === 'docs' ? '#00f2fe' : '#9ca3af'}} onClick={() => setView('docs')}>System Docs</button>
      </div>

      <div style={themeWrapper}>
        <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>THEME</span>
        <select value={theme} onChange={(e) => setTheme(e.target.value)} style={selectStyle}>
          <option value="cyan">Cyber Cyan</option>
          <option value="green">Matrix Green</option>
          <option value="purple">Neon Purple</option>
        </select>
      </div>
    </nav>
  );
}

const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', position: 'sticky', top: 0, zIndex: 1000 };
const logoStyle = { display: 'flex', alignItems: 'center', gap: '10px' };
const dotStyle = { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)', boxShadow: '0 0 14px var(--accent-cyan)' };
const titleStyle = { fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 };
const subBadge = { fontSize: '10px', color: 'var(--accent-cyan)', background: 'rgba(0, 242, 254, 0.1)', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' };
const menuStyle = { display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' };
const navBtn = { background: 'transparent', border: 'none', padding: '8px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', borderRadius: '6px' };
const themeWrapper = { display: 'flex', alignItems: 'center', gap: '8px' };
const selectStyle = { background: '#090d16', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', outline: 'none' };