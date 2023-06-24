'use client';
import BarChart, { Category } from '@/components/Charts/BarChart';
import CategorySelector from '@/components/Selectors/CategorySelector';
import LegislatorSelector from '@/components/Selectors/LegislatorSelector';
import { Context, Legislator } from '@/context/context';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import usePageInfo from '@/hooks/usePageInfo';
import { useContext, useEffect, useRef, useState } from 'react';
import ReactLoading from 'react-loading';

const options: Category[] = [
  { name: '總收入', labelFormat: 'currency' },
  { name: '捐贈企業數', labelFormat: 'number' },
  { name: '得票數', labelFormat: 'number' },
  { name: '總支出', labelFormat: 'number' },
];

export default function Home() {
  const { legislators, initialLegislators } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    options[0]
  );
  const [selectedLegislators, setSelectedLegislators] = useState<Legislator[]>([
    { 姓名: '', 總收入: 0 },
    { 姓名: '', 總收入: 0 },
  ]);
  const initialLegislatorsSet = useRef<boolean>(false);

  useLegislatorsApi();
  usePageInfo({ text: '資訊對比分析', path: '/' });

  useEffect(() => {
    if (legislators.length > 0 && !initialLegislatorsSet.current) {
      setSelectedLegislators([legislators[0], legislators[1]]);
      initialLegislators.current = legislators;
      initialLegislatorsSet.current = true;
    }
  }, [legislators]);

  return selectedLegislators[0].姓名 === '' ? (
    <ReactLoading type='spinningBubbles' color='#676b6b' />
  ) : (
    <>
      <LegislatorSelector
        selectedLegislators={selectedLegislators}
        setSelectedLegislators={setSelectedLegislators}
      />
      <CategorySelector
        options={options}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BarChart
        legislators={selectedLegislators}
        category={selectedCategory}
        labelFormat={selectedCategory.labelFormat}
      />
    </>
  );
}
