import { Context, Page } from '@/context/context';
import { useContext, useEffect } from 'react';

export default function usePageInfo(pageInfo: Page) {
  const { setPage } = useContext(Context);
  useEffect(() => {
    setPage(pageInfo);
  }, []);
}
