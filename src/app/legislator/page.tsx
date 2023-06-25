'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { LegislatorContext } from '@/context/legislatorContext';
import useLegislatorSelect from '@/hooks/useLegislatorSelect';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const selectBarPrompt = '--- 請選擇政治人物 ---';
export default function LegislatorHome() {
  const router = useRouter();
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
