import { mockData } from '../../../mock/harvestData';

let harvests = [...mockData];

export async function GET() {  
  return Response.json(mockData);
}

export async function POST(request:any) {
  try {
    const newHarvest = await request.json(); 
    harvests.push(newHarvest); 
    return new Response(JSON.stringify(newHarvest), { status: 201 }); 
  } catch (error) {
    return new Response('Erro ao adicionar colheita', { status: 400 });
  }
}