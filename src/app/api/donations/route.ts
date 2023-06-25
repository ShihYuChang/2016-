import { NextResponse } from 'next/server';
import { getDonations } from '../utils/firebase';

export async function GET(request: Request) {
  const selectedLegislator = request.headers.get('legislator');
  const decodedSelectedLegislator = selectedLegislator
    ? decodeURIComponent(selectedLegislator)
    : null;
  const selectedLegislatorData = await getDonations(decodedSelectedLegislator);
  return NextResponse.json(selectedLegislatorData);
}
