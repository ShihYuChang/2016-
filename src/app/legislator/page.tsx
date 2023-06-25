'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { Legislator } from '@/context/context';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LegislatorHome() {
  const router = useRouter();
  const [legislator, setLegislator] = useState<Legislator[]>([{ 姓名: '' }]);

  useEffect(() => {
    if (legislator[0].姓名 !== '') {
      router.push(`/legislator/${legislator}`);
    }
  }, [router, legislator]);

  useLegislatorsApi();

  return (
    <>
      <LegislatorSelector
        selectedLegislators={legislator}
        setSelectedLegislators={setLegislator}
      />
    </>
  );
}
