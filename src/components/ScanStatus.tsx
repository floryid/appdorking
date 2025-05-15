import React from 'react';
import { Bot, AlertTriangle, Check, FileWarning } from 'lucide-react';
import { useDorkbot } from '../context/DorkbotContext';

const ScanStatus: React.FC = () => {
  const { state } = useDorkbot();
  
  // Get critical or high vulnerabilities
  const criticalVulnerabilities = state.results.filter(
    result => result.riskLevel === 'critical' || result.riskLevel === 'high'
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 cyberpunk-card p-6">
        <div className="flex items-center mb-4">
          <Bot className="w-5 h-5 text-cyan-400 mr-2" />
          <h2 className="text-lg font-bold text-white">Scan Status</h2>
        </div>
        
        {state.isScanning ? (
          <ScanningProgress progress={state.scanProgress} />
        ) : state.results.length > 0 ? (
          <ScanComplete vulnerabilities={state.results} />
        ) : (
          <NoScanData />
        )}
      </div>
      
      <div className="cyberpunk-card p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
          <h2 className="text-lg font-bold text-white">Critical Findings</h2>
        </div>
        
        {criticalVulnerabilities.length > 0 ? (
          <div className="space-y-4">
            {criticalVulnerabilities.slice(0, 3).map((vulnerability) => (
              <div key={vulnerability.id} className="bg-slate-800/50 border border-red-500/20 rounded p-3">
                <div className="flex items-start">
                  <FileWarning className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-white">{vulnerability.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{vulnerability.description}</p>
                    <div className="mt-1.5 flex items-center text-xs">
                      <span className="text-red-400">{vulnerability.url}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {criticalVulnerabilities.length > 3 && (
              <button className="w-full text-center text-xs text-cyan-400 hover:text-cyan-300 mt-2">
                View {criticalVulnerabilities.length - 3} more critical findings
              </button>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/50 rounded p-4 text-center">
            <p className="text-gray-400 text-sm">No critical findings detected yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ScanningProgressProps {
  progress: number;
}

const ScanningProgress: React.FC<ScanningProgressProps> = ({ progress }) => {
  return (
    <div>
      <div className="mb-4">
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>Processing target</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded p-3">
          <h3 className="text-sm font-medium text-white mb-2">Current Operation</h3>
          <div className="flex items-center text-cyan-400 text-xs">
            <div className="animate-pulse mr-2 h-2 w-2 rounded-full bg-cyan-400"></div>
            <span>Running vulnerability pattern matching...</span>
          </div>
        </div>
        
        <div className="bg-slate-800/50 rounded p-3">
          <h3 className="text-sm font-medium text-white mb-2">Dorking Method</h3>
          <div className="text-xs text-gray-400">
            <div className="flex items-center mb-1">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-1.5"></span>
              <span>Admin Panel Discovery</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full mr-1.5"></span>
              <span>Sensitive Files Detection</span>
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5"></span>
              <span>API Endpoint Enumeration</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-slate-800/50 rounded p-3 overflow-hidden relative">
        <div className="scanline"></div>
        <pre className="text-xs text-cyan-400 h-20 overflow-y-auto font-mono">
          <div className="mb-0.5">&gt; Starting reconnaissance on target domain...</div>
          <div className="mb-0.5">&gt; Running dork: site:example.com inurl:admin</div>
          <div className="mb-0.5">&gt; Running dork: site:example.com ext:log | ext:txt | ext:conf</div>
          <div className="mb-0.5">&gt; Scanning for directory listings...</div>
          <div className="mb-0.5">&gt; Identifying potential SQL injection points...</div>
          <div className="typing-animation">
            &gt; Analyzing results<span className="typing-cursor"></span>
          </div>
        </pre>
      </div>
    </div>
  );
};

interface ScanCompleteProps {
  vulnerabilities: any[];
}

const ScanComplete: React.FC<ScanCompleteProps> = ({ vulnerabilities }) => {
  // Count vulnerabilities by risk level
  const vulnCounts = {
    critical: vulnerabilities.filter(v => v.riskLevel === 'critical').length,
    high: vulnerabilities.filter(v => v.riskLevel === 'high').length,
    medium: vulnerabilities.filter(v => v.riskLevel === 'medium').length,
    low: vulnerabilities.filter(v => v.riskLevel === 'low').length,
    info: vulnerabilities.filter(v => v.riskLevel === 'info').length,
  };
  
  return (
    <div>
      <div className="flex items-center mb-4 bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded">
        <Check className="w-5 h-5 mr-2" />
        <span>Scan completed successfully</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-800/50 rounded p-3">
          <h3 className="text-sm font-medium text-white mb-2">Vulnerability Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-red-400 flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-1.5"></span>
                Critical
              </span>
              <span className="text-red-400 font-medium">{vulnCounts.critical}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-orange-400 flex items-center">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-1.5"></span>
                High
              </span>
              <span className="text-orange-400 font-medium">{vulnCounts.high}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-yellow-400 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1.5"></span>
                Medium
              </span>
              <span className="text-yellow-400 font-medium">{vulnCounts.medium}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-blue-400 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                Low
              </span>
              <span className="text-blue-400 font-medium">{vulnCounts.low}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></span>
                Info
              </span>
              <span className="text-gray-400 font-medium">{vulnCounts.info}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 rounded p-3">
          <h3 className="text-sm font-medium text-white mb-2">Vulnerability Types</h3>
          <div className="space-y-2">
            {Object.entries(
              vulnerabilities.reduce((acc: any, curr) => {
                acc[curr.vulnerabilityType] = (acc[curr.vulnerabilityType] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => (b[1] as number) - (a[1] as number))
              .slice(0, 5)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between items-center text-xs">
                  <span className="text-gray-300">{type}</span>
                  <span className="text-gray-400 font-medium">{count as number}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-center">
        <button className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-2 rounded text-sm transition-colors">
          View Full Report
        </button>
        <button className="bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-400 py-2 rounded text-sm transition-colors">
          Export Results
        </button>
      </div>
    </div>
  );
};

const NoScanData: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded p-6 text-center">
      <Bot className="w-16 h-16 text-gray-600 mx-auto mb-3" />
      <h3 className="text-gray-300 text-lg font-medium mb-2">No scan data available</h3>
      <p className="text-gray-400 text-sm mb-4">
        Enter a domain in the search box above and start scanning to discover vulnerabilities.
      </p>
      <div className="flex justify-center space-x-4 text-xs text-gray-400">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-1.5"></span>
          <span>Scans websites for vulnerabilities</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-1.5"></span>
          <span>Generates comprehensive reports</span>
        </div>
      </div>
    </div>
  );
};

export default ScanStatus;