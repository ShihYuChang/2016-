import { Context } from '@/context/context';
import { useContext } from 'react';
import styled from 'styled-components';

const PageTitleText = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding-bottom: 5px;
  font-weight: 700;
  color: #676b6b;
  border-bottom: 1.5px solid #aaadad;
`;

export default function PageTitle() {
  const { page } = useContext(Context);
  return <PageTitleText>{page?.text}</PageTitleText>;
}
