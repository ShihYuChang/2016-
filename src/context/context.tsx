/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { ReactNode, createContext, useRef, useState } from 'react';

export interface Page {
  text: '資訊對比分析' | '資金來源分析';
  path: '/' | '/multi-candidates';
}

interface ContextProviderProps {
  children: ReactNode;
}

export interface Candidate {
  姓名: string;
  [key: string]: string | number;
}

export const Context = createContext<{
  page: Page | null;
  setPage: React.Dispatch<React.SetStateAction<Page | null>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  initialCandidates: React.MutableRefObject<Candidate[]>;
}>({
  page: null,
  setPage: () => {},
  candidates: [],
  setCandidates: () => {},
  initialCandidates: { current: [] },
});

export default function ContextProvider({ children }: ContextProviderProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const initialCandidates = useRef<Candidate[]>([]);

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        candidates,
        setCandidates,
        initialCandidates,
      }}
    >
      {children}
    </Context.Provider>
  );
}
