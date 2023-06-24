import { Legislator } from '@/context/context';

export async function fetchData(url: string): Promise<Legislator[]> {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
