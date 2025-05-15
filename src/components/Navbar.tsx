import React from 'react';
import { Bot, Shield, HelpCircle, Settings } from 'lucide-react';
import { useDorkbot } from '../context/DorkbotContext';

const Navbar: React.FC = () => {
  const { state, setActiveTab } = useDorkbot();
  
  return (
    <nav className="bg-slate-950 border-b border-cyan-900/30 py-3 px-4 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              <span className="text-cyan-400">DORK</span>
              <span className="text-fuchsia-500">BOT</span>
              <span className="text-gray-400">.AI</span>
            </h1>
            <p className="text-xs text-gray-400 -mt-1">Advanced Google Dorking Tool by.N.Flory</p>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-1">
          <NavButton 
            label="Dashboard" 
            active={state.activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavButton 
            label="Results" 
            active={state.activeTab === 'results'} 
            onClick={() => setActiveTab('results')} 
          />
          <NavButton 
            label="Terminal" 
            active={state.activeTab === 'terminal'} 
            onClick={() => setActiveTab('terminal')} 
          />
          <NavButton 
            label="Reports" 
            active={state.activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')} 
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-cyan-400 transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-cyan-400 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white py-1.5 px-4 rounded text-sm font-medium flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Pro</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

interface NavButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 text-sm font-medium transition-colors relative ${
        active ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500"></span>
      )}
    </button>
  );
};

export default Navbar;