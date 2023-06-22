'use client';

import { useEffect } from 'react';
export default function Test() {
  useEffect(() => {
    async function fetchData(url: string) {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    }

    fetchData('/api/legislators');
  }, []);

  return (
    <>
      <div>page</div>
    </>
  );
}
