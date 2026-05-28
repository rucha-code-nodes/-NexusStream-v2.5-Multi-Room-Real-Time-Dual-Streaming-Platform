import React from 'react';

export default function AnalyticsPanel({ stats }) {
  return (
    <div className="glass-panel" style={containerStyle}>
      <h4 style={panelTitle}>Connection Performance Telemetry</h4>
      <div style={metricsGrid}>
        <div style={statBox}>
          <span style={labelStyle}>Network Latency</span>
          <span style={{ ...valueStyle, color: stats.latency > 150 ? '#f43f5e' : '#00f2fe' }}>{stats.latency} ms</span>
        </div>
        <div style={statBox}>
          <span style={labelStyle}>Packet Loss</span>
          <span style={{ ...valueStyle, color: stats.packetLoss > 2 ? '#f43f5e' : '#10b981' }}>{stats.packetLoss} %</span>
        </div>
        <div style={statBox}>
          <span style={labelStyle}>Bandwidth Throughput</span>
          <span style={valueStyle}>{stats.bitrate} kbps</span>
        </div>
        <div style={statBox}>
          <span style={labelStyle}>Protocol Protocol</span>
          <span style={{ ...valueStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }}>{stats.protocol}</span>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { padding: '20px', marginTop: '32px', borderLeft: '4px solid #6366f1' };
const panelTitle = { fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', margin: '0 0 16px 0' };
const metricsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' };
const statBox = { display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' };
const labelStyle = { fontSize: '12px', color: '#9ca3af', fontWeight: '500' };
const valueStyle = { fontSize: '20px', fontWeight: '700', color: '#fff' };