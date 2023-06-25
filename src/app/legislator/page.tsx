'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { LegislatorContext } from '@/context/legislatorContext';
import useLegislatorSelect from '@/hooks/useLegislatorSelect';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import { useContext } from 'react';

export default function LegislatorHome() {
  const { selectedLegislator, setSelectedLegislator } =
    useContext(LegislatorContext);

  useLegislatorSelect();
  useLegislatorsApi();

  return (
    <>
      <LegislatorSelector
        selectedLegislators={selectedLegislator}
        setSelectedLegislators={setSelectedLegislator}
      />
    </>
  );
}
