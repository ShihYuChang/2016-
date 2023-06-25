import { DonationData } from '@/utils/api';
import styled from 'styled-components';

interface TableProps {
  data: DonationData[];
  excludedCategories: string[];
  oneCharCartegories: string[];
  localeStrCategories: string[];
}

interface TextProps {
  $oneChar: boolean;
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  gap: 10px;
`;

const Header = styled.div``;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
`;

const Title = styled.div<TextProps>`
  width: ${({ $oneChar }) => ($oneChar ? '50px' : '150px')};
`;

const Text = styled.div<TextProps>`
  width: ${({ $oneChar }) => ($oneChar ? '50px' : '150px')};
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const SplitLine = styled.hr`
  margin-top: 5px;
`;

export default function Table({
  data,
  excludedCategories,
  oneCharCartegories,
  localeStrCategories,
}: TableProps) {
  const titles = Object.keys(data[0]).filter(
    (title) => !excludedCategories.includes(title)
  );
  return (
    <Wrapper>
      <Header>
        <Row>
          {titles.map((title, index) => (
            <Title key={index} $oneChar={oneCharCartegories.includes(title)}>
              {title === '序號' ? '#' : title}
            </Title>
          ))}
        </Row>
        <SplitLine />
      </Header>
      {data.map((donation, index) => (
        <Row key={index}>
          {titles.map((title, index) => (
            <Text
              key={`${title}${index}`}
              $oneChar={oneCharCartegories.includes(title)}
            >
              {localeStrCategories.includes(title)
                ? donation[title].toLocaleString()
                : donation[title]}
            </Text>
          ))}
        </Row>
      ))}
    </Wrapper>
  );
}
