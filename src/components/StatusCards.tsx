import React from 'react';
import { Shield, AlertTriangle, FileSearch, Clock } from 'lucide-react';
import { useDorkbot } from '../context/DorkbotContext';

const StatusCards: React.FC = () => {
  const { state } = useDorkbot();
  
  // Calculate scan duration
  const getScanDuration = () => {
    if (!state.scanStats.scanStartTime) return 'N/A';
    const endTime = state.scanStats.scanEndTime || Date.now();
    const durationMs = endTime - state.scanStats.scanStartTime;
    const seconds = Math.floor(durationMs / 1000);
    
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard
        title="Risk Score"
        value={state.results.length ? `${state.scanStats.riskScore}/100` : 'N/A'}
        icon={<Shield className="w-5 h-5" />}
        color="cyan"
        loading={state.isScanning}
      />
      <StatusCard
        title="Vulnerabilities"
        value={state.results.length ? state.scanStats.vulnerabilitiesFound.toString() : '0'}
        icon={<AlertTriangle className="w-5 h-5" />}
        color="red"
        loading={state.isScanning}
      />
      <StatusCard
        title="Scanned Dorks"
        value={state.isScanning ? 'Scanning...' : (state.results.length ? '12/500' : '0')}
        icon={<FileSearch className="w-5 h-5" />}
        color="purple"
        loading={state.isScanning}
      />
      <StatusCard
        title="Scan Duration"
        value={getScanDuration()}
        icon={<Clock className="w-5 h-5" />}
        color="green"
        loading={state.isScanning}
      />
    </div>
  );
};

interface StatusCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'cyan' | 'red' | 'purple' | 'green';
  loading: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon, color, loading }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'purple':
        return 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400';
      case 'green':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    }
  };
  
  return (
    <div className={`cyberpunk-card p-4 border ${getColorClasses()}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <div className={`p-1.5 rounded-full ${getColorClasses()}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end">
        <p className={`text-2xl font-bold ${loading ? 'pulse' : ''}`}>
          {loading && title !== 'Scan Duration' ? '...' : value}
        </p>
      </div>
    </div>
  );
};

export default StatusCards;