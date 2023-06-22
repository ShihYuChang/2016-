'use client';
import Header from '@/components/Header';
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

const PageTitle = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding-bottom: 5px;
  font-weight: 700;
  color: #676b6b;
  border-bottom: 1.5px solid #aaadad;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ContextProvider>
            <Header />
            <Content>
              <PageTitle>Page Title</PageTitle>
              {children}
            </Content>
          </ContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
