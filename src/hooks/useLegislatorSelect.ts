import {
  LegislatorContext,
  selectBarPrompt,
} from '@/context/legislatorContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function useLegislatorSelect() {
  const router = useRouter();
  const { selectedLegislator } = useContext(LegislatorContext);
  useEffect(() => {
    if (selectedLegislator[0].姓名 !== selectBarPrompt) {
      router.push(`/legislator/${selectedLegislator[0].姓名}`);
    }
  }, [router, selectedLegislator]);
}
