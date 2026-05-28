import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Lobby from './pages/Lobby';
import History from './pages/History';
import SystemStatus from './pages/SystemStatus';
import Docs from './pages/Docs';

// Core structural stream components are imported untouched:
import ClientStream from './pages/ClientStream';
import HostView from './pages/HostView';

export default function App() {
  const [view, setView] = useState('lobby'); // lobby, history, status, docs, client, host
  const [activeRoomId, setActiveRoomId] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('nexus-theme') || 'cyan');

  useEffect(() => {
    localStorage.setItem('nexus-theme', theme);
    const colorMap = {
      cyan: '#00f2fe',
      green: '#10b981',
      purple: '#a855f7'
    };
    // Sync active theme option straight down onto global layout parameters
    document.documentElement.style.setProperty('--accent-cyan', colorMap[theme]);
    document.documentElement.style.setProperty('--accent-indigo', colorMap[theme]);
  }, [theme]);

  const handleJoinRoom = (roomId, role) => {
    setActiveRoomId(roomId);
    setView(role);
  };

  const handleExitRoom = () => {
    setActiveRoomId('');
    setView('lobby');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030712', paddingBottom: '60px' }}>
      {/* Retain visibility during management workflows, isolate when streaming */}
      {view !== 'client' && view !== 'host' && (
        <Navbar currentView={view} setView={setView} theme={theme} setTheme={setTheme} />
      )}
      
      <main>
        {view === 'lobby' && <Lobby onJoinRoom={handleJoinRoom} />}
        {view === 'history' && <History />}
        {view === 'status' && <SystemStatus />}
        {view === 'docs' && <Docs />}
        
        {/* Stream processes remain pristine, working exactly as intended */}
        {view === 'client' && <ClientStream roomId={activeRoomId} onLeave={handleExitRoom} />}
        {view === 'host' && <HostView roomId={activeRoomId} onLeave={handleExitRoom} />}
      </main>
    </div>
  );
}