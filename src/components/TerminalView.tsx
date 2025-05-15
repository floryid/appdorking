import React, { useRef, useEffect } from 'react';
import { useDorkbot } from '../context/DorkbotContext';
import { Terminal, AlarmClock, RotateCw } from 'lucide-react';

const TerminalView: React.FC = () => {
  const { state } = useDorkbot();
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when logs update
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [state.logs]);
  
  const getLogClass = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-cyan-400';
    }
  };
  
  const getElapsedTime = () => {
    if (!state.scanStats.scanStartTime) return '00:00:00';
    
    const endTime = state.scanStats.scanEndTime || Date.now();
    const elapsed = Math.floor((endTime - state.scanStats.scanStartTime) / 1000);
    
    const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(elapsed % 60).toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };
  
  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <div className="cyberpunk-card p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Terminal className="w-5 h-5 text-cyan-400 mr-2" />
            <h2 className="text-lg font-bold text-white">DORKBOT Terminal</h2>
          </div>
          <div className="flex space-x-3">
            <div className="flex items-center text-gray-400 text-sm">
              <AlarmClock className="w-4 h-4 mr-1" />
              <span>{getElapsedTime()}</span>
            </div>
            <button className="text-gray-400 hover:text-cyan-400 transition-colors">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="cyberpunk-card flex-1 overflow-hidden relative">
        <div className="scanline"></div>
        <div 
          ref={terminalRef}
          className="font-mono text-sm h-full overflow-y-auto p-4"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          <div className="text-gray-400 mb-2">
            ======================================<br />
            DORKBOT.AI Terminal v1.0.0<br />
            ======================================<br />
            Session started at {new Date().toLocaleString()}<br />
            Ready for dorking operations<br />
            ======================================
          </div>
          
          {state.logs.length === 0 ? (
            <div className="text-gray-500 mt-4">
              No logs available. Start a scan to see terminal output.
            </div>
          ) : (
            state.logs.map((log, index) => (
              <div key={index} className={`${getLogClass(log.type)} mt-1`}>
                [{new Date().toLocaleTimeString()}] {log.message}
              </div>
            ))
          )}
          
          {state.isScanning && (
            <div className="text-cyan-400 mt-1 flex items-center">
              [{new Date().toLocaleTimeString()}] Processing... <div className="typing-cursor ml-1"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalView;