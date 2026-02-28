import { NextRequest, NextResponse } from 'next/server';
import { AgentOrchestrator } from '@/lib/agents/agent-orchestrator';
import { Incident, Deployment, InfraMetrics } from '@/lib/types';

const orchestrator = new AgentOrchestrator();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case 'analyze_incident': {
        const incident: Incident = payload;
        const result = await orchestrator.handleIncident(incident);
        return NextResponse.json(result);
      }

      case 'plan_deployment': {
        const { service, version } = payload;
        const deployment = await orchestrator.handleDeployment(service, version);
        return NextResponse.json(deployment);
      }

      case 'analyze_costs': {
        const metrics: InfraMetrics[] = payload;
        const result = await orchestrator.handleCostAnalysis(metrics);
        return NextResponse.json(result);
      }

      case 'generate_runbook': {
        const incident: Incident = payload;
        const runbook = await orchestrator.generateRunbook(incident);
        return NextResponse.json(runbook);
      }

      case 'suggest_rollback': {
        const deployment: Deployment = payload;
        const suggestion = await orchestrator.suggestRollback(deployment);
        return NextResponse.json({ suggestion });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Agent API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
