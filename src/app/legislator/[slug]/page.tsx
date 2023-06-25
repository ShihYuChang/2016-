'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { LegislatorContext } from '@/context/legislatorContext';
import useLegislatorSelect from '@/hooks/useLegislatorSelect';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import { fetchData } from '@/utils/api';
import { useContext, useEffect } from 'react';

export default function LegislatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { selectedLegislator, setSelectedLegislator } =
    useContext(LegislatorContext);
  const encodedSlug = encodeURIComponent(params.slug);
  const decodedSlug = decodeURIComponent(encodedSlug).replace(
    /(%[0-9A-F]{2})+/gi,
    decodeURIComponent
  );

  useEffect(() => {
    setSelectedLegislator([{ 姓名: decodedSlug }]);
  }, []);

  useEffect(() => {
    async function getDonationData() {
      const data = await fetchData('/api/donations', {
        headers: {
          legislator: encodeURIComponent(selectedLegislator[0].姓名),
        },
      });
      console.log(data);
    }

    getDonationData();
  }, [selectedLegislator]);

  useLegislatorSelect();
  useLegislatorsApi();

  return (
    <>
      <div>Legislator: {decodedSlug}</div>
      <LegislatorSelector
        selectedLegislators={selectedLegislator}
        setSelectedLegislators={setSelectedLegislator}
      />
    </>
  );
}
