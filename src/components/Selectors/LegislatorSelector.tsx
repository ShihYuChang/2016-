import { SetStateAction, useContext, useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import styled from 'styled-components';
import { Context, Legislator } from '../../context/context';

interface LegislatorSelectorProps {
  selectedLegislators: Legislator[];
  setSelectedLegislators: React.Dispatch<SetStateAction<Legislator[]>>;
}

interface OptionWrapperProps {
  height: string;
}

interface SelectorProps {
  $clicked: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2.5vw;
  margin-bottom: 30px;
`;

const SelectorWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const SelectorLabel = styled.div`
  font-size: 12px;
  padding: 0 0 5px 10px;
`;

const Selector = styled.div<SelectorProps>`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${({ $clicked }) => ($clicked ? '#60aafe' : '#efefef')};
  color: ${({ $clicked }) => $clicked && 'white'};
`;

const OptionWrapper = styled.div<OptionWrapperProps>`
  height: ${({ height }) => height};
  transition: height 0.7s;
  overflow-y: auto;
  position: absolute;
  z-index: 10;
  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #676b6b;
  }

  &::-webkit-scrollbar-track {
    background-color: #a4a4a3;
  }
`;

const Option = styled.button`
  width: 100%;
  padding: 10px 0;
  border: 0;
  border-bottom: 0.5px solid #aaadad;
  cursor: pointer;
  color: #676b6b;

  &:disabled {
    cursor: not-allowed;
    background-color: #efefef;
    color: #aaadad;
  }

  &:not(:disabled):hover {
    border-left: 5px solid #60aafe;
    font-weight: 700;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
`;

const SearchBarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background-color: #efefef;
  position: sticky;
  top: 0;
  left: 0;
`;

const SearchBar = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  outline: none;
`;

export default function LegislatorSelector({
  selectedLegislators,
  setSelectedLegislators,
}: LegislatorSelectorProps) {
  const { legislators, setLegislators, initialLegislators } =
    useContext(Context);
  const [clickedSelector, setClickedSelector] = useState<number | null>(null);
  const [input, setInput] = useState<string[]>(['', '']);

  function handleSelectorClick(index: number) {
    setLegislators(initialLegislators.current);
    if (clickedSelector !== index) {
      setClickedSelector(index);
      return;
    }
    setClickedSelector(null);
  }

  function handleLegislatorSelect(legislatorName: string, index: number) {
    const output = [...selectedLegislators];
    const legislator = legislators.find(
      (legislator) => legislator.姓名 === legislatorName
    );
    if (legislator) {
      output[index] = legislator;
      setSelectedLegislators(output);
      setClickedSelector(null);
      setInput(['', '']);
    }
  }

  function filterLegislator(input: string) {
    const newLegislators = initialLegislators.current.filter((legislator) =>
      legislator.姓名.includes(input)
    );
    newLegislators && setLegislators(newLegislators);
  }

  function handleSearchInput(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    filterLegislator(e.target.value);
    const newInput = [...input];
    newInput[index] = e.target.value;
    setInput(newInput);
  }

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setClickedSelector(null);
      }
    }

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <Wrapper>
      {selectedLegislators.map((legislator, parentIndex) => (
        <SelectorWrapper key={parentIndex}>
          <SelectorLabel>政治人物 {parentIndex + 1}</SelectorLabel>
          <Selector
            onClick={() => handleSelectorClick(parentIndex)}
            $clicked={parentIndex === clickedSelector}
          >
            {legislator?.姓名}
            <ArrowWrapper>
              <BsChevronDown />
            </ArrowWrapper>
          </Selector>
          <OptionWrapper
            height={parentIndex === clickedSelector ? '330px' : '0'}
          >
            <SearchBarWrapper>
              <SearchBar
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearchInput(parentIndex, e)
                }
                value={input[parentIndex]}
                placeholder='搜尋候選人...'
              />
            </SearchBarWrapper>
            {legislators.length > 0 ? (
              legislators.map((legislator, index) => (
                <Option
                  key={index}
                  disabled={selectedLegislators.indexOf(legislator) !== -1}
                  onClick={() =>
                    handleLegislatorSelect(legislator.姓名, parentIndex)
                  }
                >
                  {legislator.姓名}
                </Option>
              ))
            ) : (
              <Option>查無此人</Option>
            )}
          </OptionWrapper>
        </SelectorWrapper>
      ))}
    </Wrapper>
  );
}
