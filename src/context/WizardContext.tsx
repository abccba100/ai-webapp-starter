"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpecItem, DesignTheme } from '@/types';

interface WizardState {
  idea: string;
  setIdea: (s: string) => void;
  specs: SpecItem[];
  setSpecs: (s: SpecItem[]) => void;
  selectedTheme: DesignTheme | null;
  setTheme: (t: DesignTheme) => void;
  resetWizard: () => void;
}

const WizardContext = createContext<WizardState | null>(null);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [idea, setIdea] = useState('');
  const [specs, setSpecs] = useState<SpecItem[]>([]);
  const [selectedTheme, setTheme] = useState<DesignTheme | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const saved = localStorage.getItem('wizard_data');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setIdea(parsed.idea || '');
            setSpecs(parsed.specs || []);
            setTheme(parsed.selectedTheme || null);
          } catch (e) {
            console.error("Failed to load context", e);
          }
        }
        setIsLoaded(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const data = { idea, specs, selectedTheme };
      localStorage.setItem('wizard_data', JSON.stringify(data));
    }
  }, [idea, specs, selectedTheme, isLoaded]);

  const resetWizard = () => {
    setIdea('');
    setSpecs([]);
    setTheme(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wizard_data');
    }
  };

  return (
    <WizardContext.Provider value={{ idea, setIdea, specs, setSpecs, selectedTheme, setTheme, resetWizard }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error("useWizard must be used within WizardProvider");
  return context;
};
