'use client';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BarChart, { Category } from '../../components/Charts/BarChart';
import CategorySelector from '../../components/Selectors/CategorySelector';
import { Candidate, Context } from '../../context/context';

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

export default function MultiCandidates() {
  const { candidates } = useContext(Context);
  const [fiveCandidates, setFiveCandidates] = useState<Candidate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    options[0]
  );
  useEffect(() => {
    if (candidates.length > 0) {
      const clonedCandidates = [...candidates];
      const sortedCandidates = clonedCandidates.sort(
        (a, b) =>
          Number(b[selectedCategory.name]) - Number(a[selectedCategory.name])
      );
      const output = sortedCandidates.slice(0, 10);
      setFiveCandidates(output);
    }
  }, [candidates, selectedCategory]);
  return (
    <>
      <CategorySelector
        options={options}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PromptMessage>僅列出前十名</PromptMessage>
      <BarChart
        candidates={fiveCandidates}
        category={selectedCategory}
        labelFormat={selectedCategory.labelFormat}
      />
    </>
  );
}
