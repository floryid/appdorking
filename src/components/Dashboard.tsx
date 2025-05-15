import React from 'react';
import { useDorkbot } from '../context/DorkbotContext';
import DomainSearch from './DomainSearch';
import ScanStatus from './ScanStatus';
import ResultsView from './ResultsView';
import TerminalView from './TerminalView';
import ReportsView from './ReportsView';
import StatusCards from './StatusCards';

const Dashboard: React.FC = () => {
  const { state } = useDorkbot();
  
  // Render the active tab content
  const renderTabContent = () => {
    switch (state.activeTab) {
      case 'results':
        return <ResultsView />;
      case 'terminal':
        return <TerminalView />;
      case 'reports':
        return <ReportsView />;
      default:
        return (
          <div className="space-y-6">
            <DomainSearch />
            <StatusCards />
            <ScanStatus />
          </div>
        );
    }
  };
  
  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      {renderTabContent()}
    </main>
  );
};

export default Dashboard;