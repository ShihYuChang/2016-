import { DonationData } from '@/utils/api';
import styled from 'styled-components';

interface TableProps {
  data: DonationData[];
  excludedCategories: string[];
  oneCharCartegories: string[];
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

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
`;

const Title = styled.div<TextProps>`
  width: ${({ $oneChar: $serialNum }) => ($serialNum ? '20px' : '150px')};
  flex-shrink: 0;
  text-align: ${({ $oneChar: $serialNum }) =>
    $serialNum ? 'center' : 'start'};
`;

const Text = styled.div<TextProps>`
  box-sizing: border-box;
  width: ${({ $oneChar: $serialNum }) => ($serialNum ? '20px' : '150px')};
  height: ${({ $oneChar: $serialNum }) => $serialNum && '20px'};
  background-color: ${({ $oneChar: $serialNum }) => $serialNum && '#67676b'};
  color: ${({ $oneChar: $serialNum }) => $serialNum && 'white'};
  border-radius: ${({ $oneChar: $serialNum }) => $serialNum && '50%'};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $oneChar: $serialNum }) => $serialNum && 'center'};
  font-size: ${({ $oneChar: $serialNum }) => $serialNum && '12px'};
  letter-spacing: ${({ $oneChar: $serialNum }) => $serialNum && '0'};
`;

const SplitLine = styled.hr`
  width: 100vw;
`;

export default function Table({
  data,
  excludedCategories,
  oneCharCartegories,
}: TableProps) {
  const titles = Object.keys(data[0]).filter(
    (title) => !excludedCategories.includes(title)
  );
  return (
    <Wrapper>
      <Row>
        {titles.map((title, index) => (
          <Title key={index} $oneChar={oneCharCartegories.includes(title)}>
            {title === '序號' ? '#' : title}
          </Title>
        ))}
      </Row>
      <SplitLine />
      {data.map((donation, index) => (
        <Row key={index}>
          {titles.map((title, index) => (
            <Text
              key={`${title}${index}`}
              $oneChar={oneCharCartegories.includes(title)}
            >
              {donation[title]}
            </Text>
          ))}
        </Row>
      ))}
    </Wrapper>
  );
}
