import React from 'react';
import { useDorkbot } from '../context/DorkbotContext';
import { FileText, Download, PieChart, FileBarChart, AlertTriangle } from 'lucide-react';

const ReportsView: React.FC = () => {
  const { state } = useDorkbot();
  
  const generateReport = (reportType: string) => {
    // Create report data
    const reportData = {
      title: `DORKBOT.AI Security Report - ${state.domain}`,
      generatedAt: new Date().toISOString(),
      domain: state.domain,
      scanStats: state.scanStats,
      results: state.results,
      summary: {
        totalVulnerabilities: state.results.length,
        riskScore: state.scanStats.riskScore,
        criticalFindings: state.results.filter(r => r.riskLevel === 'critical').length,
        highFindings: state.results.filter(r => r.riskLevel === 'high').length,
      }
    };

    // Download report as JSON
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dorkbot-${reportType}-${state.domain}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  if (state.results.length === 0) {
    return (
      <div className="cyberpunk-card p-8 text-center">
        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">No Reports Available</h2>
        <p className="text-gray-400 mb-4">
          Complete a scan first to generate reports.
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
      <h2 className="text-xl font-bold text-white mb-6">Vulnerability Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ReportCard 
          title="Executive Summary"
          description="High-level overview of vulnerabilities found and risk assessment"
          icon={<PieChart className="w-5 h-5" />}
          color="cyan"
          onClick={() => generateReport('executive-summary')}
        />
        <ReportCard 
          title="Technical Report"
          description="Detailed technical analysis of all vulnerabilities with evidence"
          icon={<FileBarChart className="w-5 h-5" />}
          color="fuchsia"
          onClick={() => generateReport('technical-report')}
        />
        <ReportCard 
          title="Remediation Guide"
          description="Step-by-step instructions to fix the identified vulnerabilities"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="emerald"
          onClick={() => generateReport('remediation-guide')}
        />
        <ReportCard 
          title="Raw Data Export"
          description="Complete export of all scan data in JSON, CSV, or XML formats"
          icon={<Download className="w-5 h-5" />}
          color="amber"
          onClick={() => generateReport('raw-data')}
        />
      </div>
      
      <div className="cyberpunk-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">Report Generation</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded p-3">
            <h4 className="text-sm font-medium text-white mb-2">Available Formats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="pdf" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                  defaultChecked
                />
                <label htmlFor="pdf" className="text-gray-300">PDF Document</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="html" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                />
                <label htmlFor="html" className="text-gray-300">HTML Report</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="json" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                />
                <label htmlFor="json" className="text-gray-300">JSON Data</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="csv" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                />
                <label htmlFor="csv" className="text-gray-300">CSV Spreadsheet</label>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-3">
            <h4 className="text-sm font-medium text-white mb-2">Include Sections</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="summary" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                  defaultChecked
                />
                <label htmlFor="summary" className="text-gray-300">Executive Summary</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="findings" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                  defaultChecked
                />
                <label htmlFor="findings" className="text-gray-300">Detailed Findings</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="evidence" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                  defaultChecked
                />
                <label htmlFor="evidence" className="text-gray-300">Evidence</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remediation" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                  defaultChecked
                />
                <label htmlFor="remediation" className="text-gray-300">Remediation Steps</label>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-3">
            <h4 className="text-sm font-medium text-white mb-2">Report Options</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="charts" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                  defaultChecked
                />
                <label htmlFor="charts" className="text-gray-300">Include Charts</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="risk-matrix" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                  defaultChecked
                />
                <label htmlFor="risk-matrix" className="text-gray-300">Risk Matrix</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="screenshots" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                />
                <label htmlFor="screenshots" className="text-gray-300">Screenshots</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="redact" 
                  className="mr-2 h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                />
                <label htmlFor="redact" className="text-gray-300">Redact Sensitive Data</label>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => generateReport('full-report')}
          className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 text-white py-2 rounded text-sm font-medium transition-opacity"
        >
          Generate Reports
        </button>
      </div>
    </div>
  );
};

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'cyan' | 'fuchsia' | 'emerald' | 'amber';
  onClick: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon, color, onClick }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'fuchsia':
        return 'bg-fuchsia-500/10 border-fuchsia-500/30 hover:bg-fuchsia-500/20';
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20';
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20';
    }
  };
  
  return (
    <div 
      className={`cyberpunk-card p-5 border cursor-pointer transition-colors ${getColorClasses()}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${getColorClasses()} mr-3`}>
          {icon}
        </div>
        <div>
          <h3 className="text-white font-medium mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button className="bg-slate-800/70 hover:bg-slate-700 text-gray-300 py-1 px-3 rounded text-xs transition-colors">
          Generate
        </button>
      </div>
    </div>
  );
};

export default ReportsView;