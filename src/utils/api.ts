import { Legislator } from '@/context/context';

interface RequestHeaders {
  headers: { [key: string]: string };
}

export interface DonationData {
  候選人: string;
  [key: string]: string | number;
}

export async function fetchLegislators(url: string): Promise<Legislator[]> {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export async function fetchDonations(
  url: string,
  headers: RequestHeaders
): Promise<DonationData[]> {
  const res = await fetch(url, headers);
  const json = await res.json();
  return json;
}
