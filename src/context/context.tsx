/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { ReactNode, createContext, useRef, useState } from 'react';

export interface Page {
  text: '資訊對比分析' | '資金來源分析' | '政治人物分析';
  path: '/' | '/source-analysis' | '/legislator' | `/legislator/${string}`;
}

export const options: Page[] = [
  { text: '資訊對比分析', path: '/' },
  { text: '資金來源分析', path: '/source-analysis' },
  { text: '政治人物分析', path: '/legislator' },
];

interface ContextProviderProps {
  children: ReactNode;
}

export interface Legislator {
  姓名: string;
  [key: string]: string | number;
}

export const Context = createContext<{
  page: Page | null;
  setPage: React.Dispatch<React.SetStateAction<Page | null>>;
  legislators: Legislator[];
  setLegislators: React.Dispatch<React.SetStateAction<Legislator[]>>;
  initialLegislators: React.MutableRefObject<Legislator[]>;
}>({
  page: null,
  setPage: () => {},
  legislators: [],
  setLegislators: () => {},
  initialLegislators: { current: [] },
});

export default function ContextProvider({ children }: ContextProviderProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [legislators, setLegislators] = useState<Legislator[]>([]);
  const initialLegislators = useRef<Legislator[]>([]);

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        legislators,
        setLegislators,
        initialLegislators,
      }}
    >
      {children}
    </Context.Provider>
  );
}
