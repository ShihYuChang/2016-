import { NextResponse } from 'next/server';
import { getLegislators } from '../utils/firebase.ts';

export async function GET() {
  const data = await getLegislators();
  return NextResponse.json(data);
}
