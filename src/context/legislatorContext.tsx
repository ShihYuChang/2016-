import { ReactNode, createContext, useState } from 'react';
import { Legislator } from './context';

export const selectBarPrompt = '--- 請選擇政治人物 ---';

interface ContextProviderProps {
  children: ReactNode;
}

export const LegislatorContext = createContext<{
  selectedLegislator: Legislator[];
  setSelectedLegislator: React.Dispatch<React.SetStateAction<Legislator[]>>;
}>({
  selectedLegislator: [{ 姓名: selectBarPrompt }],
  setSelectedLegislator: () => {},
});

export default function LegislatorContextProvider({
  children,
}: ContextProviderProps) {
  const [selectedLegislator, setSelectedLegislator] = useState<Legislator[]>([
    { 姓名: selectBarPrompt },
  ]);
  return (
    <LegislatorContext.Provider
      value={{ selectedLegislator, setSelectedLegislator }}
    >
      {children}
    </LegislatorContext.Provider>
  );
}
