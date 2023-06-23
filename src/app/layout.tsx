'use client';
import Header from '@/components/Header';
import PageTitle from '@/components/Title/PageTitle';
import ContextProvider from '@/context/context';
import StyledComponentsRegistry from '@/lib/registry';
import styled from 'styled-components';
import './globals.css';

const Content = styled.div`
  width: 70%;
  margin: 30px auto;
  justify-content: center;
  gap: 50px;
  color: #676b6b;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <title>2016 政治獻金資訊平台</title>
      <body>
        <StyledComponentsRegistry>
          <ContextProvider>
            <Header />
            <Content>
              <PageTitle />
              {children}
            </Content>
          </ContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
