import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { DorkbotProvider } from './context/DorkbotContext';

function App() {
  return (
    <DorkbotProvider>
      <div className="min-h-screen bg-slate-950 text-gray-200 flex flex-col font-['JetBrains_Mono']">
        <Navbar />
        <Dashboard />
        <Footer />
      </div>
    </DorkbotProvider>
  );
}

export default App;