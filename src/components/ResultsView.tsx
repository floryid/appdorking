import React, { useState } from 'react';
import { useDorkbot } from '../context/DorkbotContext';
import { AlertTriangle, ExternalLink, Filter, FileDown } from 'lucide-react';

const ResultsView: React.FC = () => {
  const { state, selectResult } = useDorkbot();
  const [filter, setFilter] = useState<string>('all');
  
  // Filter results by risk level
  const filteredResults = filter === 'all' 
    ? state.results 
    : state.results.filter(result => result.riskLevel === filter);
  
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Export results function
  const exportResults = () => {
    const exportData = {
      scanDate: new Date().toISOString(),
      domain: state.domain,
      results: state.results,
      stats: state.scanStats
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dorkbot-results-${state.domain}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  if (state.results.length === 0) {
    return (
      <div className="cyberpunk-card p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">No Results Available</h2>
        <p className="text-gray-400 mb-4">
          Run a scan first to see vulnerability results.
        </p>
        <button 
          onClick={() => useDorkbot().setActiveTab('dashboard')}
          className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-2 px-4 rounded text-sm transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2 sm:mb-0">
          Vulnerability Results ({filteredResults.length})
        </h2>
        <div className="flex space-x-2">
          <div className="bg-slate-800 rounded border border-slate-700 flex items-center">
            <Filter className="w-4 h-4 text-gray-400 ml-2" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-gray-300 text-sm py-1.5 px-2 focus:outline-none"
            >
              <option value="all">All Risks</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="info">Info</option>
            </select>
          </div>
          <button 
            onClick={exportResults}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-300 p-1.5 rounded flex items-center justify-center"
          >
            <FileDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="cyberpunk-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-800/80 border-b border-slate-700">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risk</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">URL</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, idx) => (
                <tr 
                  key={result.id}
                  className={`border-b border-slate-800 hover:bg-slate-800/30 cursor-pointer transition-colors ${
                    state.selectedResult?.id === result.id ? 'bg-slate-800/50' : ''
                  }`}
                  onClick={() => selectResult(result)}
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(result.riskLevel)}`}>
                      {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white">{result.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-400 max-w-[200px] truncate">{result.url}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{result.vulnerabilityType.split(' ')[0]}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(result.url, '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {state.selectedResult && (
        <div className="mt-6 cyberpunk-card p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-white">{state.selectedResult.title}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(state.selectedResult.riskLevel)}`}>
              {state.selectedResult.riskLevel.charAt(0).toUpperCase() + state.selectedResult.riskLevel.slice(1)}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-1">URL</h4>
              <p className="text-sm text-white break-all">{state.selectedResult.url}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-1">Vulnerability Type</h4>
              <p className="text-sm text-white">{state.selectedResult.vulnerabilityType}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-1">Detected</h4>
              <p className="text-sm text-white">
                {new Date(state.selectedResult.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-400 mb-1">Description</h4>
            <p className="text-sm text-gray-300">{state.selectedResult.description}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-400 mb-1">Tags</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {state.selectedResult.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-slate-800 text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button 
              onClick={() => useDorkbot().setActiveTab('reports')}
              className="bg-slate-800 hover:bg-slate-700 text-gray-300 py-2 text-sm rounded transition-colors"
            >
              View Full Report
            </button>
            <button className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-2 text-sm rounded transition-colors">
              Verify
            </button>
            <button className="bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-400 py-2 text-sm rounded transition-colors">
              Recommendations
            </button>
            <button className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-2 text-sm rounded transition-colors">
              Exploit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;