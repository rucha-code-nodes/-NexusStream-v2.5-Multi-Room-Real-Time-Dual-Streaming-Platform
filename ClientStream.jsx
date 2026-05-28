



import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import VideoCard from '../components/VideoCard';

const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export default function ClientStream({ roomId, onLeave }) {
  const [captured, setCaptured] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const hiddenWebcamRef = useRef(null);
  const canvasRef = useRef(null);
  const screenVideoRef = useRef(null);
  
  const canvasStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const sessionStartTimeRef = useRef(null);

  useEffect(() => {
    // socketRef.current = io('http://localhost:3000');
    socketRef.current = io('https://your-backend-app.onrender.com');
    socketRef.current.emit('message', { type: 'join', room: roomId });

    socketRef.current.on('message', async (data) => {
      if (data.answer && peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
        logSessionEnd();
        sessionStartTimeRef.current = new Date();
      }
      if (data.candidate && peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) { console.error(e); }
      }
    });

    return () => {
      logSessionEnd();
      if (socketRef.current) socketRef.current.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (peerConnectionRef.current) peerConnectionRef.current.close();
    };
  }, [roomId]);

  const logSessionEnd = () => {
    if (!sessionStartTimeRef.current) return;
    const duration = Math.round((new Date() - sessionStartTimeRef.current) / 1000);
    const log = { id: roomId, date: new Date().toLocaleDateString(), duration: `${duration}s`, status: 'Completed' };
    const historicalLogs = JSON.parse(localStorage.getItem('nexus_logs') || '[]');
    localStorage.setItem('nexus_logs', JSON.stringify([log, ...historicalLogs]));
    sessionStartTimeRef.current = null;
  };

  const handleCapture = async () => {
    try {
      const webcamStream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false });
      hiddenWebcamRef.current.srcObject = webcamStream;

      const ctx = canvasRef.current.getContext('2d');
      
      // FIX: Changed resolution to 16:9 widescreen standard to match CSS layout behavior
      canvasRef.current.width = 1280;
      canvasRef.current.height = 720;

      const drawFrame = () => {
        if (hiddenWebcamRef.current && canvasRef.current) {
          // 1. Paint raw background pixels
          ctx.drawImage(hiddenWebcamRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          
          const timeString = new Date().toTimeString().split(' ')[0];
          
          // 2. Render Velvet Glass Pill Container (Safely padded past crop zones)
          ctx.fillStyle = '#0b0f19'; 
          ctx.beginPath(); 
          ctx.roundRect(40, 40, 180, 52, 10); 
          ctx.fill();
          
          // 3. Render left margin indicator line
          ctx.fillStyle = '#00f2fe'; 
          ctx.fillRect(40, 40, 6, 52);
          
          // 4. Print clean high-contrast monospace time sequence
          ctx.fillStyle = '#00f2fe'; 
          ctx.font = 'bold 26px "JetBrains Mono", monospace'; 
          ctx.fillText(timeString, 66, 76);
          
          animationFrameRef.current = requestAnimationFrame(drawFrame);
        }
      };
      drawFrame();

      canvasStreamRef.current = canvasRef.current.captureStream(30);

      screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      screenVideoRef.current.srcObject = screenStreamRef.current;

      setCaptured(true);
    } catch (err) { alert('Media permissions rejected.'); }
  };

  const handleStream = async () => {
    const pc = new RTCPeerConnection(rtcConfig);
    peerConnectionRef.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) socketRef.current.emit('message', { room: roomId, candidate: event.candidate });
    };

    const canvasTrack = canvasStreamRef.current.getVideoTracks()[0];
    pc.addTrack(canvasTrack, canvasStreamRef.current);

    const screenTrack = screenStreamRef.current.getVideoTracks()[0];
    pc.addTrack(screenTrack, screenStreamRef.current);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketRef.current.emit('message', { room: roomId, offer: offer });
    setStreaming(true);
  };

  return (
    <div className="interface-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2>Streaming Pipeline Active</h2>
          <span style={{ color: '#9ca3af', fontSize: '14px' }}>Corridor Security ID: <strong style={{ color: '#6366f1' }}>{roomId}</strong></span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={handleCapture} disabled={captured}>1. Connect Hardware Sensors</button>
          <button className="btn-primary" onClick={handleStream} disabled={!captured || streaming}>2. Push Live Feeds</button>
          <button className="btn-secondary" onClick={onLeave} style={{ color: '#f43f5e', border: '1px solid rgba(244,63,94,0.2)' }}>Kill Channel</button>
        </div>
      </div>

      <div className="stream-grid">
        <VideoCard title="Processed Stream 1 (Webcam + Time HUD)" isCanvas={true} canvasRef={canvasRef} />
        <VideoCard title="Processed Stream 2 (Screen Capture Pipeline)" videoRef={screenVideoRef} />
      </div>
      <video ref={hiddenWebcamRef} autoPlay playsInline muted style={{ display: 'none' }} />
    </div>
  );
}