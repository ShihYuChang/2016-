import { Legislator } from '@/context/context';

interface RequestHeaders {
  headers: { [key: string]: string };
}

export async function fetchData(
  url: string,
  headers?: RequestHeaders
): Promise<Legislator[]> {
  const res = await fetch(url, headers);
  const json = await res.json();
  return json;
}
