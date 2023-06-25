import { Context } from '@/context/context';
import { fetchLegislators } from '@/utils/api.ts';
import { parseStrNumber } from '@/utils/parseNumber';
import { useContext, useEffect } from 'react';

export default function useLegislatorsApi() {
  const { setLegislators, initialLegislators } = useContext(Context);
  useEffect(() => {
    async function getLegislators() {
      const legislatorsRawData = await fetchLegislators('/api/legislators');
      const finallegislatorsData = legislatorsRawData.map((obj) =>
        parseStrNumber(obj)
      );
      setLegislators(finallegislatorsData);
      initialLegislators.current = finallegislatorsData;
    }

    getLegislators();
  }, []);
}
