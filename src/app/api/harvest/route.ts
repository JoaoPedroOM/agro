import { mockData } from '../../../mock/harvestData';

export async function GET() {  
  return Response.json(mockData);
}