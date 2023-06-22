import { Candidate } from '@/context/context';

interface CandidateApiData {
  data: Candidate[];
}

export async function fetchData(url: string): Promise<CandidateApiData> {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
