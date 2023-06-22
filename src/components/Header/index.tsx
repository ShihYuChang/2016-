import Link from 'next/link';
import { useContext } from 'react';
import styled from 'styled-components';
import { Context, Page } from '../../context/context';

const options: Page[] = [
  { text: '資訊對比分析', path: '/' },
  { text: '資金來源分析', path: '/multi-candidates' },
];

interface OptionProps {
  $selected: boolean;
}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  background-color: #efefef;
  position: sticky;
  top: 0;
  z-index: 20;
`;

const Logo = styled.div`
  font-weight: 700;
  letter-spacing: 2px;
  margin-right: 5vw;
`;

const OptionWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const Option = styled.div<OptionProps>`
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  background-color: ${({ $selected }) => $selected && '#fcfcfc'};
  color: #676b6b;

  &:hover {
    background-color: #fcfcfc;
  }
`;

export default function Header() {
  const { page, setPage } = useContext(Context);

  function handleOptionClick(option: Page) {
    setPage(option);
  }

  return (
    <Wrapper>
      <Logo>2016 政治獻金資訊平台</Logo>
      <OptionWrapper>
        {options.map((option) => (
          <Link
            key={option.text}
            href={option.path}
            style={{ textDecoration: 'none' }}
          >
            <Option
              $selected={page?.text === option.text}
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </Option>
          </Link>
        ))}
      </OptionWrapper>
    </Wrapper>
  );
}
