'use client';
import useLegislatorsApi from '@/hooks/useLegislatorsApi';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BarChart, { Category } from '../../components/Charts/BarChart';
import CategorySelector from '../../components/Selectors/CategorySelector';
import { Context, Legislator } from '../../context/context';

const PromptMessage = styled.div`
  width: 100%;
  text-align: end;
  font-size: 12px;
`;

const options: Category[] = [
  { name: '個人捐贈比例', labelFormat: 'percentage' },
  { name: '營利事業捐贈比例', labelFormat: 'percentage' },
  { name: '政黨捐贈收入比例', labelFormat: 'percentage' },
  { name: '人民團體收入比例', labelFormat: 'percentage' },
  { name: '匿名捐贈比例', labelFormat: 'percentage' },
  { name: '其他收入比例', labelFormat: 'percentage' },
];

export default function MultiLegislators() {
  const { legislators, setPage } = useContext(Context);
  const [fiveLegislators, setFiveLegislators] = useState<Legislator[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    options[0]
  );

  useEffect(() => {
    setPage({ text: '資金來源分析', path: '/multi-legislators' });
  }, []);

  useLegislatorsApi();

  useEffect(() => {
    if (legislators.length > 0) {
      const clonedLegislators = [...legislators];
      const sortedLegislators = clonedLegislators.sort(
        (a, b) =>
          Number(b[selectedCategory.name]) - Number(a[selectedCategory.name])
      );
      const output = sortedLegislators.slice(0, 10);
      setFiveLegislators(output);
    }
  }, [legislators, selectedCategory]);
  return (
    <>
      <CategorySelector
        options={options}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PromptMessage>僅列出前十名</PromptMessage>
      <BarChart
        legislators={fiveLegislators}
        category={selectedCategory}
        labelFormat={selectedCategory.labelFormat}
      />
    </>
  );
}
