'use client';
import { Context } from '@/context/context';
import { fetchData } from '@/utils/api';
import { parseStrNumber } from '@/utils/parseNumber';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

export default function Home() {
  const { setPage, setCandidates, initialCandidates } = useContext(Context);
  useEffect(() => {
    setPage({ text: '資訊對比分析', path: '/' });

    async function getCandidates() {
      const candidatesRawData = await fetchData('/api/legislators');
      const finalCandidatesData = candidatesRawData.data.map((obj) =>
        parseStrNumber(obj)
      );
      setCandidates(finalCandidatesData);
      initialCandidates.current = finalCandidatesData;
    }

    getCandidates();
  }, []);
  return (
    <Link href='/test'>
      <button>Button</button>
    </Link>
  );
}
