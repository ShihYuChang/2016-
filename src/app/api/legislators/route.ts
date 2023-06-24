import { NextResponse } from 'next/server';
import rawData from './raw_data.json';

export async function GET() {
  const { data } = rawData;
  return NextResponse.json(data);
}
