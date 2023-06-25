'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { LegislatorContext } from '@/context/legislatorContext';
import { useContext } from 'react';

export default function LegislatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedLegislator, setSelectedLegislator } =
    useContext(LegislatorContext);
  return (
    <>
      <LegislatorSelector
        selectedLegislators={selectedLegislator}
        setSelectedLegislators={setSelectedLegislator}
      />
      {children}
    </>
  );
}
