import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
import { dorkData } from '../data/dorkData';
import { vulnerabilityTypes } from '../data/vulnerabilityTypes';

// Types
export type VulnerabilityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface DorkResult {
  id: string;
  url: string;
  title: string;
  description: string;
  vulnerabilityType: string;
  riskLevel: VulnerabilityLevel;
  timestamp: string;
  tags: string[];
}

interface DorkbotState {
  domain: string;
  isScanning: boolean;
  scanProgress: number;
  results: DorkResult[];
  activeTab: string;
  logs: { message: string; type: 'info' | 'warning' | 'error' | 'success' }[];
  scanStats: {
    totalScanned: number;
    vulnerabilitiesFound: number;
    scanStartTime: number | null;
    scanEndTime: number | null;
    riskScore: number;
  };
  selectedResult: DorkResult | null;
}

type DorkbotAction =
  | { type: 'SET_DOMAIN'; payload: string }
  | { type: 'START_SCAN' }
  | { type: 'END_SCAN' }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'SET_RESULTS'; payload: DorkResult[] }
  | { type: 'ADD_LOG'; payload: { message: string; type: 'info' | 'warning' | 'error' | 'success' } }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SELECT_RESULT'; payload: DorkResult | null };

const initialState: DorkbotState = {
  domain: '',
  isScanning: false,
  scanProgress: 0,
  results: [],
  activeTab: 'dashboard',
  logs: [],
  scanStats: {
    totalScanned: 0,
    vulnerabilitiesFound: 0,
    scanStartTime: null,
    scanEndTime: null,
    riskScore: 0
  },
  selectedResult: null
};

const dorkbotReducer = (state: DorkbotState, action: DorkbotAction): DorkbotState => {
  switch (action.type) {
    case 'SET_DOMAIN':
      return { ...state, domain: action.payload };
    case 'START_SCAN':
      return {
        ...state,
        isScanning: true,
        scanProgress: 0,
        logs: [
          ...state.logs,
          { message: `Starting scan for domain: ${state.domain}`, type: 'info' }
        ],
        scanStats: {
          ...state.scanStats,
          scanStartTime: Date.now(),
          scanEndTime: null,
          totalScanned: 0,
          vulnerabilitiesFound: 0,
          riskScore: 0
        }
      };
    case 'END_SCAN':
      return {
        ...state,
        isScanning: false,
        scanProgress: 100,
        logs: [
          ...state.logs,
          { message: `Scan completed for domain: ${state.domain}`, type: 'success' }
        ],
        scanStats: {
          ...state.scanStats,
          scanEndTime: Date.now()
        }
      };
    case 'UPDATE_PROGRESS':
      return { ...state, scanProgress: action.payload };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
        scanStats: {
          ...state.scanStats,
          vulnerabilitiesFound: action.payload.length,
          riskScore: calculateRiskScore(action.payload)
        }
      };
    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload] };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SELECT_RESULT':
      return { ...state, selectedResult: action.payload };
    default:
      return state;
  }
};

const calculateRiskScore = (results: DorkResult[]): number => {
  const weights = {
    critical: 10,
    high: 7,
    medium: 5,
    low: 2,
    info: 1
  };
  
  const score = results.reduce((total, result) => {
    return total + weights[result.riskLevel];
  }, 0);
  
  // Normalize score between 0-100
  return Math.min(100, score);
};

// Context
const DorkbotContext = createContext<{
  state: DorkbotState;
  dispatch: React.Dispatch<DorkbotAction>;
  startScan: (domain: string) => void;
  selectResult: (result: DorkResult | null) => void;
  setActiveTab: (tab: string) => void;
  generateResults: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  startScan: () => null,
  selectResult: () => null,
  setActiveTab: () => null,
  generateResults: () => null
});

export const useDorkbot = () => useContext(DorkbotContext);

export const DorkbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dorkbotReducer, initialState);

  const setActiveTab = (tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const selectResult = (result: DorkResult | null) => {
    dispatch({ type: 'SELECT_RESULT', payload: result });
  };

  const generateResults = () => {
    const riskLevels: VulnerabilityLevel[] = ['critical', 'high', 'medium', 'low', 'info'];
    const mockResults: DorkResult[] = [];

    // Generate realistic mock results
    const dorkCount = Math.floor(Math.random() * 15) + 5; // 5-20 results
    
    for (let i = 0; i < dorkCount; i++) {
      const dork = dorkData[Math.floor(Math.random() * dorkData.length)];
      const vulnType = vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)];
      const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      mockResults.push({
        id: `result-${i}`,
        url: `https://${state.domain}${dork.path}`,
        title: dork.title,
        description: dork.description,
        vulnerabilityType: vulnType.name,
        riskLevel: riskLevel,
        timestamp: new Date().toISOString(),
        tags: [vulnType.category, ...dork.tags]
      });
    }
    
    dispatch({ type: 'SET_RESULTS', payload: mockResults });
  };

  const startScan = (domain: string) => {
    if (!domain.trim()) {
      dispatch({
        type: 'ADD_LOG',
        payload: {
          message: 'Error: Domain cannot be empty',
          type: 'error'
        }
      });
      return;
    }
    
    dispatch({ type: 'SET_DOMAIN', payload: domain });
    dispatch({ type: 'START_SCAN' });
    
    // Simulate scanning process
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Add logs during the scanning process
        dispatch({
          type: 'ADD_LOG',
          payload: {
            message: `Running dork: site:${domain} inurl:admin`,
            type: 'info'
          }
        });
        
        setTimeout(() => {
          dispatch({
            type: 'ADD_LOG',
            payload: {
              message: `Running dork: site:${domain} ext:sql | ext:bak | ext:config`,
              type: 'info'
            }
          });
        }, 500);
        
        setTimeout(() => {
          dispatch({
            type: 'ADD_LOG',
            payload: {
              message: `Running dork: site:${domain} intitle:"index of /" "parent directory"`,
              type: 'info'
            }
          });
        }, 1000);
        
        setTimeout(() => {
          dispatch({
            type: 'ADD_LOG',
            payload: {
              message: `Found potential admin panel at ${domain}/admin`,
              type: 'warning'
            }
          });
        }, 1500);
        
        setTimeout(() => {
          dispatch({
            type: 'ADD_LOG',
            payload: {
              message: `Found exposed configuration file at ${domain}/config.php`,
              type: 'error'
            }
          });
          
          // Generate results when scan is complete
          generateResults();
          dispatch({ type: 'END_SCAN' });
        }, 2000);
      }
      
      dispatch({ type: 'UPDATE_PROGRESS', payload: progress });
    }, 200);
  };

  return (
    <DorkbotContext.Provider
      value={{
        state,
        dispatch,
        startScan,
        selectResult,
        setActiveTab,
        generateResults
      }}
    >
      {children}
    </DorkbotContext.Provider>
  );
};