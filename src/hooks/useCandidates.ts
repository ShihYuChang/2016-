import { Context } from '@/context/context';
import { fetchData } from '@/utils/api';
import { parseStrNumber } from '@/utils/parseNumber';
import { useContext, useEffect } from 'react';

export default function useCandidates() {
  const { setCandidates, initialCandidates } = useContext(Context);
  useEffect(() => {
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
}
