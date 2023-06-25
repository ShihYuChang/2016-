'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { LegislatorContext } from '@/context/legislatorContext';
import useLegislatorSelect from '@/hooks/useLegislatorSelect';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import { useContext } from 'react';

export default function LegislatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedLegislator, setSelectedLegislator } =
    useContext(LegislatorContext);
  useLegislatorsApi();
  useLegislatorSelect();
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
