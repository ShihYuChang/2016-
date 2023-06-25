'use client';
import Table from '@/components/Table/Table';
import { LegislatorContext } from '@/context/legislatorContext';
import useLegislatorSelect from '@/hooks/useLegislatorSelect';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import usePageInfo from '@/hooks/usePageInfo';
import { DonationData, fetchDonations } from '@/utils/api';
import { useContext, useEffect, useState } from 'react';

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
  const [donations, setDonations] = useState<DonationData[]>([]);

  useEffect(() => {
    setSelectedLegislator([{ 姓名: decodedSlug }]);
  }, []);

  useEffect(() => {
    async function getDonationData() {
      const data = await fetchDonations('/api/donations', {
        headers: {
          legislator: encodeURIComponent(selectedLegislator[0].姓名),
        },
      });
      setDonations(data);
    }

    getDonationData();
  }, [selectedLegislator]);

  useLegislatorSelect();
  useLegislatorsApi();
  usePageInfo({ text: '政治獻金明細', path: '/legislator' });

  return <>{donations.length > 0 && <Table donations={donations} />}</>;
}
