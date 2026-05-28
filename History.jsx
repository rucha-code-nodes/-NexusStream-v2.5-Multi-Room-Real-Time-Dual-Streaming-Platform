import React, { useState, useEffect } from 'react';

export default function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const historicalLogs = JSON.parse(localStorage.getItem('nexus_logs') || '[]');
    setLogs(historicalLogs);
  }, []);

  const clearLogs = () => {
    localStorage.removeItem('nexus_logs');
    setLogs([]);
  };

  return (
    <div className="interface-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2>Historical Pipeline Sessions</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: '4px 0 0 0' }}>Persistent logging audit of previous connection runtimes.</p>
        </div>
        {logs.length > 0 && <button className="btn-secondary" onClick={clearLogs} style={{ color: '#f43f5e', borderColor: 'rgba(244,63,94,0.15)' }}>Purge Audit Trails</button>}
      </div>

      <div className="glass-panel" style={{ padding: '8px', overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={thRow}>
              <th style={thStyle}>Session Routing ID</th>
              <th style={thStyle}>Execution Timestamp</th>
              <th style={thStyle}>Active Duration</th>
              <th style={thStyle}>Termination State</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ ...tdStyle, textAlign: 'center', padding: '40px', color: '#6b7280' }}>No records detected in local database cluster cache.</td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index} style={trStyle}>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#6366f1', fontFamily: 'JetBrains Mono' }}>{log.id}</td>
                  <td style={tdStyle}>{log.date}</td>
                  <td style={tdStyle}>{log.duration}</td>
                  <td style={tdStyle}>
                    <span style={log.status === 'Completed' ? statusSuccess : statusProgress}>{log.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' };
const thRow = { borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255,255,255,0.01)' };
const thStyle = { padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' };
const trStyle = { borderBottom: '1px solid rgba(255, 255, 255, 0.03)', transition: 'background 0.2s' };
const tdStyle = { padding: '16px 24px', fontSize: '14px', color: '#f3f4f6' };
const statusSuccess = { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' };
const statusProgress = { background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' };