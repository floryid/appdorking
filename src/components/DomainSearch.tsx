import React, { useState } from 'react';
import { Search, Terminal, Bot, Zap } from 'lucide-react';
import { useDorkbot } from '../context/DorkbotContext';

const DomainSearch: React.FC = () => {
  const { startScan, state } = useDorkbot();
  const [domain, setDomain] = useState('');
  const [searchType, setSearchType] = useState<'domain' | 'custom'>('domain');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startScan(domain);
  };
  
  return (
    <div className="cyberpunk-card p-6">
      <div className="flex items-center mb-4">
        <Bot className="w-5 h-5 text-cyan-400 mr-2" />
        <h2 className="text-lg font-bold text-white">Target Intelligence</h2>
        <div className="ml-auto flex space-x-2">
          <button
            onClick={() => setSearchType('domain')}
            className={`text-xs px-3 py-1 rounded ${
              searchType === 'domain'
                ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-800 text-gray-400 border border-gray-700'
            }`}
          >
            Domain
          </button>
          <button
            onClick={() => setSearchType('custom')}
            className={`text-xs px-3 py-1 rounded ${
              searchType === 'custom'
                ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-800 text-gray-400 border border-gray-700'
            }`}
          >
            Custom Dork
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="relative">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder={searchType === 'domain' ? 'Enter target domain (e.g., example.com)' : 'Enter custom dork query'}
            className="w-full bg-slate-800 border border-slate-700 py-3 px-4 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent pl-11"
            disabled={state.isScanning}
          />
          <div className="absolute left-3 top-3 text-gray-400">
            {searchType === 'domain' ? (
              <Search className="w-5 h-5" />
            ) : (
              <Terminal className="w-5 h-5" />
            )}
          </div>
          
          <button
            type="submit"
            disabled={state.isScanning || !domain.trim()}
            className={`absolute right-3 top-2 px-4 py-1 rounded text-white font-medium flex items-center gap-1.5 ${
              state.isScanning || !domain.trim()
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 transition-opacity'
            }`}
          >
            <Zap className="w-4 h-4" />
            {state.isScanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-400">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
          <span>500+ dork patterns</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-2"></span>
          <span>AI-powered vulnerability detection</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
          <span>Advanced risk assessment</span>
        </div>
      </div>
    </div>
  );
};

export default DomainSearch;