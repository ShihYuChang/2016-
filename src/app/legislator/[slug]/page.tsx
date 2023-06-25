'use client';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { LegislatorContext } from '@/context/legislatorContext';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
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
