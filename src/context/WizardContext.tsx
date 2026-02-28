"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpecItem, DesignTheme } from '@/types';

interface WizardState {
  projectName: string;
  setProjectName: (s: string) => void;
  oneLineDesc: string;
  setOneLineDesc: (s: string) => void;
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
  buildComplete: boolean;
  setBuildComplete: (v: boolean) => void;
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
  currentIdeaId: string | null;
  setCurrentIdeaId: (id: string | null) => void;
  resetWizard: () => void;
}

const WizardContext = createContext<WizardState | null>(null);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [projectName, setProjectName] = useState('');
  const [oneLineDesc, setOneLineDesc] = useState('');
  const [idea, setIdea] = useState('');
  const [specs, setSpecs] = useState<SpecItem[]>([]);
  const [specApproved, setSpecApproved] = useState(false);
  const [specChangeRequest, setSpecChangeRequest] = useState<string | null>(null);
  const [selectedTheme, setTheme] = useState<DesignTheme | null>(null);
  const [buildComplete, setBuildComplete] = useState(false);
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
            setProjectName(parsed.projectName || '');
            setOneLineDesc(parsed.oneLineDesc || '');
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
            setBuildComplete(parsed.buildComplete ?? false);
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
        projectName,
        oneLineDesc,
        idea,
        specs,
        selectedTheme,
        specApproved,
        specChangeRequest,
        buildComplete,
        currentProjectId,
        currentIdeaId,
      };
      localStorage.setItem('wizard_data', JSON.stringify(data));
    }
  }, [projectName, oneLineDesc, idea, specs, selectedTheme, specApproved, specChangeRequest, buildComplete, currentProjectId, currentIdeaId, isLoaded]);

  const resetWizard = () => {
    setProjectName('');
    setOneLineDesc('');
    setIdea('');
    setSpecs([]);
    setSpecApproved(false);
    setSpecChangeRequest(null);
    setBuildComplete(false);
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
        projectName,
        setProjectName,
        oneLineDesc,
        setOneLineDesc,
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
        buildComplete,
        setBuildComplete,
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
