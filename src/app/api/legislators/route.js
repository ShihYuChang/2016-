import data from './raw_data.json';

export async function GET() {
  return Response.json(data);
}
