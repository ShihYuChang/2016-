import { SetStateAction } from 'react';
import styled from 'styled-components';
import { Category } from '../Charts/BarChart';

interface CategorySelectorProps {
  options: Category[];
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<SetStateAction<Category>>;
}

interface OptionProps {
  $selected: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: start;
  gap: 30px;
  overflow: auto;
`;

const OptionText = styled.div<OptionProps>`
  box-sizing: border-box;
  height: 25px;
  font-size: 14px;
  color: ${({ $selected }) => $selected && '#60AAFE'};
  border-bottom: ${({ $selected }) => $selected && '1.5px solid #60aafe'};
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 1.5px;
    background-color: #60aafe;
    transition: ${({ $selected }) => ($selected ? 'none' : 'width 0.5s')};
  }

  &:hover::before {
    width: ${({ $selected }) => ($selected ? '0' : '100%')};
  }
`;

export default function CategorySelector({
  options,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectorProps) {
  function selectOption(target: Category) {
    setSelectedCategory(target);
  }

  return (
    <Wrapper>
      {options.map((option, index) => (
        <OptionText
          key={`option${index}`}
          $selected={option === selectedCategory}
          onClick={() => selectOption(option)}
        >
          {option.name}
        </OptionText>
      ))}
    </Wrapper>
  );
}
