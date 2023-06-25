import { NextResponse } from 'next/server';
import donationData from './donation.json';

interface DonationData {
  候選人: string;
  [key: string]: string | number;
}

export async function GET(request: Request) {
  const { data } = donationData;
  const selectedLegislator = request.headers.get('legislator');
  const decodedSelectedLegislator = selectedLegislator
    ? decodeURIComponent(selectedLegislator)
    : null;
  const selectedLegislatorData: DonationData[] = data.filter(
    (obj) => obj.候選人 === decodedSelectedLegislator
  );
  return NextResponse.json(selectedLegislatorData);
}
