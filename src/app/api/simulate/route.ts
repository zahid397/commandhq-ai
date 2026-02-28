import { NextRequest, NextResponse } from 'next/server';
import { SimulationEngine } from '@/lib/simulation/simulation-engine';

const simulator = new SimulationEngine();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    switch (type) {
      case 'incident': {
        const incident = simulator.generateIncident();
        return NextResponse.json(incident);
      }

      case 'deployment': {
        const { service } = body;
        const deployment = simulator.simulateDeployment(service);
        return NextResponse.json(deployment);
      }

      case 'cost_alert': {
        const alert = simulator.createCostAlert();
        return NextResponse.json(alert);
      }

      case 'metrics': {
        const metrics = simulator.generateInfraMetrics();
        return NextResponse.json(metrics);
      }

      default:
        return NextResponse.json(
          { error: 'Invalid simulation type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Simulation API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
