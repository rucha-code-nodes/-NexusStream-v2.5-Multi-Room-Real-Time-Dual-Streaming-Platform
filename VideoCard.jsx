import React from 'react';

export default function VideoCard({ title, videoRef, canvasRef, isCanvas = false, controlsSlot }) {
  return (
    <div className="glass-panel" style={cardStyle}>
      <div style={headerStyle}>
        <h3>{title}</h3>
        <span style={liveBadge}><span style={liveDot}></span>LIVE</span>
      </div>
      <div style={mediaWrapper}>
        {isCanvas ? (
          <canvas ref={canvasRef} style={mediaElement} />
        ) : (
          <video ref={videoRef} autoPlay playsInline controls style={mediaElement} />
        )}
      </div>
      {controlsSlot && <div style={controlsWrapper}>{controlsSlot}</div>}
    </div>
  );
}

const cardStyle = { padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const liveBadge = { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '6px', letterSpacing: '0.05em' };
const liveDot = { width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', animation: 'pulse 1.5s infinite' };
const mediaWrapper = { width: '100%', position: 'relative', background: '#020617', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.03)' };
const mediaElement = { width: '100%', aspectRatio: '16/9', display: 'block', objectFit: 'cover' };
const controlsWrapper = { marginTop: '4px', width: '100%' };