'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { Legislator } from '@/context/context';
import { useState } from 'react';

export default function LegislatorHome() {
  const [legislators, setLegislators] = useState<Legislator[]>([{ 姓名: '' }]);
  return (
    <>
      <LegislatorSelector
        selectedLegislators={legislators}
        setSelectedLegislators={setLegislators}
      />
    </>
  );
}
