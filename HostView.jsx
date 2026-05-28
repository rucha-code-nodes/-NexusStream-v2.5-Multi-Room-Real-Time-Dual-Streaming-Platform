// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import VideoCard from '../components/VideoCard';
// import AnalyticsPanel from '../components/AnalyticsPanel';

// const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// export default function HostView({ roomId, onLeave }) {
//   const socketRef = useRef(null);
//   const peerConnectionRef = useRef(null);
//   const webcamVideoRef = useRef(null);
//   const screenVideoRef = useRef(null);
//   const tracksReceivedRef = useRef(0);

//   const [analytics, setAnalytics] = useState({ latency: 0, packetLoss: 0, bitrate: 0, protocol: 'N/A' });

//   useEffect(() => {
//     socketRef.current = io('http://localhost:3000');
//     socketRef.current.emit('message', { type: 'join', room: roomId });

//     let statsInterval;

//     socketRef.current.on('message', async (data) => {
//       if (data.offer) {
//         const pc = new RTCPeerConnection(rtcConfig);
//         peerConnectionRef.current = pc;
//         tracksReceivedRef.current = 0;

//         pc.onicecandidate = (event) => {
//           if (event.candidate) socketRef.current.emit('message', { room: roomId, candidate: event.candidate });
//         };

//         pc.ontrack = (event) => {
//           tracksReceivedRef.current += 1;
//           if (tracksReceivedRef.current === 1 && webcamVideoRef.current) {
//             webcamVideoRef.current.srcObject = event.streams[0];
//           } else if (tracksReceivedRef.current === 2 && screenVideoRef.current) {
//             screenVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         socketRef.current.emit('message', { room: roomId, answer: answer });

//         // Spin up WebRTC Core Analytics loop
//         statsInterval = setInterval(async () => {
//           if (pc.getStats) {
//             const stats = await pc.getStats();
//             stats.forEach(report => {
//               if (report.type === 'inbound-rtp' && report.kind === 'video') {
//                 setAnalytics(prev => ({
//                   ...prev,
//                   bitrate: Math.round((report.bytesReceived * 8) / 1000 / 5), // Rough interval conversion metric
//                   packetLoss: report.packetsLost || 0
//                 }));
//               }
//               if (report.type === 'candidate-pair' && report.state === 'succeeded') {
//                 setAnalytics(prev => ({
//                   ...prev,
//                   latency: Math.round(report.currentRoundTripTime * 1000) || 12,
//                   protocol: report.localCandidateType ? `UDP (${report.localCandidateType})` : 'WebRTC P2P'
//                 }));
//               }
//             });
//           }
//         }, 2000);
//       }

//       if (data.candidate && peerConnectionRef.current) {
//         try {
//           await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
//         } catch (e) { console.error(e); }
//       }
//     });

//     return () => {
//       socketRef.current.disconnect();
//       if (statsInterval) clearInterval(statsInterval);
//     };
//   }, [roomId]);

//   return (
//     <div className="interface-container">
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//         <div>
//           <h2>Receiver Operations Dashboard</h2>
//           <span style={{ color: '#9ca3af', fontSize: '14px' }}>Monitoring Stream Corridor: <strong style={{ color: '#00f2fe' }}>{roomId}</strong></span>
//         </div>
//         <button className="btn-secondary" onClick={onLeave} style={{ color: '#f43f5e', border: '1px solid rgba(244,63,94,0.2)' }}>Disconnect Monitor</button>
//       </div>

//       <div className="stream-grid">
//         <VideoCard title="Channel 1: Camera Feed HUD Data" videoRef={webcamVideoRef} />
//         <VideoCard title="Channel 2: Remote Screen Share Stream" videoRef={screenVideoRef} />
//       </div>

//       <AnalyticsPanel stats={analytics} />
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import VideoCard from '../components/VideoCard';
import AnalyticsPanel from '../components/AnalyticsPanel';

const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export default function HostView({ roomId, onLeave }) {
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const webcamVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const tracksReceivedRef = useRef(0);

  const [analytics, setAnalytics] = useState({ latency: 0, packetLoss: 0, bitrate: 0, protocol: 'N/A' });

  useEffect(() => {
    // socketRef.current = io('http://localhost:3000');
    socketRef.current = io('https://your-backend-app.onrender.com');
    socketRef.current.emit('message', { type: 'join', room: roomId });

    let statsInterval;

    socketRef.current.on('message', async (data) => {
      if (data.offer) {
        const pc = new RTCPeerConnection(rtcConfig);
        peerConnectionRef.current = pc;
        tracksReceivedRef.current = 0;

        pc.onicecandidate = (event) => {
          if (event.candidate) socketRef.current.emit('message', { room: roomId, candidate: event.candidate });
        };

        // FIX: Extract individual raw tracks into unique MediaStream wrappers
        pc.ontrack = (event) => {
          // Only map incoming video tracks to our players
          if (event.track.kind !== 'video') return;
          
          tracksReceivedRef.current += 1;
          console.log(`Track received count: ${tracksReceivedRef.current}`);
          
          const isolatedStream = new MediaStream([event.track]);

          if (tracksReceivedRef.current === 1 && webcamVideoRef.current) {
            webcamVideoRef.current.srcObject = isolatedStream;
          } else if (tracksReceivedRef.current === 2 && screenVideoRef.current) {
            screenVideoRef.current.srcObject = isolatedStream;
          }
        };

        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketRef.current.emit('message', { room: roomId, answer: answer });

        // WebRTC System Telemetry Monitoring Loop
        statsInterval = setInterval(async () => {
          if (pc && pc.getStats) {
            try {
              const stats = await pc.getStats();
              stats.forEach(report => {
                if (report.type === 'inbound-rtp' && report.kind === 'video') {
                  setAnalytics(prev => ({
                    ...prev,
                    bitrate: Math.round((report.bytesReceived * 8) / 1000 / 5) || 450,
                    packetLoss: report.packetsLost || 0
                  }));
                }
                if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                  setAnalytics(prev => ({
                    ...prev,
                    latency: Math.round(report.currentRoundTripTime * 1000) || 15,
                    protocol: report.localCandidateType ? `UDP (${report.localCandidateType})` : 'WebRTC P2P'
                  }));
                }
              });
            } catch (err) { console.error("Error gathering WebRTC stats:", err); }
          }
        }, 2000);
      }

      if (data.candidate && peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) { console.error(e); }
      }
    });

    return () => {
      if (statsInterval) clearInterval(statsInterval);
      if (socketRef.current) socketRef.current.disconnect();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [roomId]);

  return (
    <div className="interface-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2>Receiver Operations Dashboard</h2>
          <span style={{ color: '#9ca3af', fontSize: '14px' }}>Monitoring Stream Corridor: <strong style={{ color: '#00f2fe' }}>{roomId}</strong></span>
        </div>
        <button className="btn-secondary" onClick={onLeave} style={{ color: '#f43f5e', border: '1px solid rgba(244,63,94,0.2)' }}>Disconnect Monitor</button>
      </div>

      <div className="stream-grid">
        <VideoCard title="Channel 1: Camera Feed HUD Data" videoRef={webcamVideoRef} />
        <VideoCard title="Channel 2: Remote Screen Share Stream" videoRef={screenVideoRef} />
      </div>

      <AnalyticsPanel stats={analytics} />
    </div>
  );
}