import React from 'react';
import { Shield, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-cyan-900/30 py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
        <div className="flex items-center mb-2 sm:mb-0">
          <Shield className="h-4 w-4 text-cyan-400 mr-1" />
          <span>DORKBOT.AI © 2025 | Advanced Google Dorking Tool By.N.Flory</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <FooterLink label="Documentation" />
          <FooterLink label="Disclaimer" />
          <FooterLink label="Terms of Use" />
          <FooterLink label="Privacy Policy" />
          <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ label }) => {
  return (
    <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
      <ExternalLink className="h-3 w-3" />
      <span>{label}</span>
    </a>
  );
};

export default Footer;