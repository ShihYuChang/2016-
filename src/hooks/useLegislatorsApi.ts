import { Context } from '@/context/context';
import { fetchData } from '@/utils/api';
import { parseStrNumber } from '@/utils/parseNumber';
import { useContext, useEffect } from 'react';

export default function useLegislatorsApi() {
  const { setLegislators, initialLegislators } = useContext(Context);
  useEffect(() => {
    async function getLegislators() {
      const legislatorsRawData = await fetchData('/api/legislators');
      const finallegislatorsData = legislatorsRawData.data.map((obj) =>
        parseStrNumber(obj)
      );
      setLegislators(finallegislatorsData);
      initialLegislators.current = finallegislatorsData;
    }

    getLegislators();
  }, []);
}
