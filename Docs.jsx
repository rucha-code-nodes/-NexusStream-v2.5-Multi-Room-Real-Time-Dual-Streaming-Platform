import React from 'react';

export default function Docs() {
  return (
    <div className="interface-container" style={{ maxWidth: '1000px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 className="gradient-text" style={{ marginBottom: '16px' }}>Technical Architecture Mapping</h2>
        <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.6' }}>
          This real-time system sets up separate dual-track pipelines via peer connections, achieving sub-second frame transmission metrics.
        </p>

        <div style={flowContainer}>
          <div style={stepCard}>
            <div style={stepNum}>01</div>
            <h4>Canvas Capture</h4>
            <p style={stepText}>Webcam frames are painted on canvas frames, burning in a synchronized running timestamp string locally.</p>
          </div>
          <div style={arrow}>➔</div>
          <div style={stepCard}>
            <div style={stepNum}>02</div>
            <h4>Node.js Signal</h4>
            <p style={stepText}>SDP Offers, Answers, and Ice Candidates are broadcast via distinct room parameters using Socket.IO.</p>
          </div>
          <div style={arrow}>➔</div>
          <div style={stepCard}>
            <div style={stepNum}>03</div>
            <h4>WebRTC Mesh</h4>
            <p style={stepText}>Direct peer communication pipes are established, keeping streams stable with minimal network load.</p>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <h3>WebSocket Protocol Directives</h3>
        <table style={table}>
          <thead>
            <tr style={rowBorder}>
              <th style={th}>Event Core Name</th>
              <th style={th}>Payload Frame Context</th>
              <th style={th}>Routing Action Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr style={rowBorder}>
              <td style={codeCell}>join</td>
              <td style={textCell}>{"{ type: 'join', room: roomId }"}</td>
              <td style={textCell}>Binds socket connection references inside isolated room corridors.</td>
            </tr>
            <tr style={rowBorder}>
              <td style={codeCell}>offer</td>
              <td style={textCell}>{"{ room: id, offer: sdpObj }"}</td>
              <td style={textCell}>Forwards connection setups directly to the listening monitoring host.</td>
            </tr>
            <tr style={rowBorder}>
              <td style={codeCell}>candidate</td>
              <td style={textCell}>{"{ room: id, candidate: ice }"}</td>
              <td style={textCell}>Exchanges network coordinates to map direct communication routes.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const flowContainer = { display: 'flex', alignItems: 'center', gap: '16px', marginTop: '32px', flexWrap: 'wrap' };
const stepCard = { flex: '1', minWidth: '220px', padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px' };
const stepNum = { fontSize: '24px', fontWeight: '800', color: '#00f2fe', fontFamily: 'JetBrains Mono', marginBottom: '8px' };
const stepText = { fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: '1.5' };
const arrow = { fontSize: '24px', color: '#4b5563', fontWeight: '700' };
const table = { width: '100%', borderCollapse: 'collapse', marginTop: '20px', textAlign: 'left' };
const th = { padding: '12px 16px', color: '#9ca3af', fontSize: '13px', fontWeight: '600' };
const rowBorder = { borderBottom: '1px solid rgba(255,255,255,0.05)' };
const codeCell = { padding: '14px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#00f2fe' };
const textCell = { padding: '14px 16px', fontSize: '13px', color: '#d1d5db' };