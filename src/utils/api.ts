import { Legislator } from '@/context/context';

interface LegislatorApiData {
  data: Legislator[];
}

export async function fetchData(url: string): Promise<LegislatorApiData> {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
