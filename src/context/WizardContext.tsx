"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpecItem, DesignTheme } from '@/types';

interface WizardState {
  idea: string;
  setIdea: (s: string) => void;
  specs: SpecItem[];
  setSpecs: (s: SpecItem[]) => void;
  specApproved: boolean;
  setSpecApproved: (v: boolean) => void;
  specChangeRequest: string | null;
  setSpecChangeRequest: (v: string | null) => void;
  selectedTheme: DesignTheme | null;
  setTheme: (t: DesignTheme) => void;
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
  currentIdeaId: string | null;
  setCurrentIdeaId: (id: string | null) => void;
  resetWizard: () => void;
}

const WizardContext = createContext<WizardState | null>(null);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [idea, setIdea] = useState('');
  const [specs, setSpecs] = useState<SpecItem[]>([]);
  const [specApproved, setSpecApproved] = useState(false);
  const [specChangeRequest, setSpecChangeRequest] = useState<string | null>(null);
  const [selectedTheme, setTheme] = useState<DesignTheme | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [currentIdeaId, setCurrentIdeaId] = useState<string | null>(null);
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
            setSpecApproved(parsed.specApproved || false);
            setSpecChangeRequest(
              typeof parsed.specChangeRequest === 'string'
                ? parsed.specChangeRequest
                : null
            );
            setCurrentProjectId(parsed.currentProjectId ?? null);
            setCurrentIdeaId(parsed.currentIdeaId ?? null);
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
      const data = {
        idea,
        specs,
        selectedTheme,
        specApproved,
        specChangeRequest,
        currentProjectId,
        currentIdeaId,
      };
      localStorage.setItem('wizard_data', JSON.stringify(data));
    }
  }, [idea, specs, selectedTheme, specApproved, specChangeRequest, currentProjectId, currentIdeaId, isLoaded]);

  const resetWizard = () => {
    setIdea('');
    setSpecs([]);
    setSpecApproved(false);
    setSpecChangeRequest(null);
    setCurrentProjectId(null);
    setCurrentIdeaId(null);
    setTheme(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wizard_data');
    }
  };

  return (
    <WizardContext.Provider
      value={{
        idea,
        setIdea,
        specs,
        setSpecs,
        specApproved,
        setSpecApproved,
        specChangeRequest,
        setSpecChangeRequest,
        selectedTheme,
        setTheme,
        currentProjectId,
        setCurrentProjectId,
        currentIdeaId,
        setCurrentIdeaId,
        resetWizard,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error("useWizard must be used within WizardProvider");
  return context;
};
