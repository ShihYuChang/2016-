import { NextResponse } from 'next/server';
import rawData from './raw_data.json';

export async function GET(request: Request) {
  const encodedLegislator: string | null = request.headers.get('legislator');
  const decodedLegislator = encodedLegislator
    ? decodeURIComponent(encodedLegislator)
    : null;

  const { data } = rawData;
  const legislatorData = data.find(
    (legislator) => legislator.姓名 === decodedLegislator
  );
  console.log(legislatorData);
  // return NextResponse.json(rawData);
  return NextResponse.json(legislatorData);
}
