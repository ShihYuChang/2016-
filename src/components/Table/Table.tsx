import { DonationData } from '@/utils/api';
import styled from 'styled-components';

interface TableProps {
  donations: DonationData[];
}

interface TextProps {
  $serialNum: boolean;
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
  width: ${({ $serialNum }) => ($serialNum ? '20px' : '150px')};
  flex-shrink: 0;
  text-align: ${({ $serialNum }) => ($serialNum ? 'center' : 'start')};
`;

const Text = styled.div<TextProps>`
  box-sizing: border-box;
  width: ${({ $serialNum }) => ($serialNum ? '20px' : '150px')};
  height: ${({ $serialNum }) => $serialNum && '20px'};
  background-color: ${({ $serialNum }) => $serialNum && '#67676b'};
  color: ${({ $serialNum }) => $serialNum && 'white'};
  border-radius: ${({ $serialNum }) => $serialNum && '50%'};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $serialNum }) => $serialNum && 'center'};
  font-size: ${({ $serialNum }) => $serialNum && '12px'};
  letter-spacing: ${({ $serialNum }) => $serialNum && '0'};
`;

const excludedCategories = ['候選人', '推薦政黨', '當選註記', 'P', '支出金額'];

export default function Table({ donations }: TableProps) {
  const titles = Object.keys(donations[0]).filter(
    (title) => !excludedCategories.includes(title)
  );
  return (
    <Wrapper>
      <Row>
        {titles.map((title, index) => (
          <Title key={index} $serialNum={title === '序號'}>
            {title === '序號' ? '#' : title}
          </Title>
        ))}
      </Row>
      <hr />
      {donations.map((donation, index) => (
        <Row key={index}>
          {titles.map((title, index) => (
            <Text key={`${title}${index}`} $serialNum={title === '序號'}>
              {donation[title]}
            </Text>
          ))}
        </Row>
      ))}
    </Wrapper>
  );
}
