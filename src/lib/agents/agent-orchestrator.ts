import { IncidentCommanderAgent } from './incident-commander';
import { DeploymentOrchestratorAgent } from './deployment-orchestrator';
import { RunbookGeneratorAgent } from './runbook-generator';
import { CostOptimizerAgent } from './cost-optimizer';
import { Incident, Deployment, InfraMetrics, Runbook, CostAlert } from '@/lib/types';

export class AgentOrchestrator {
  private incidentCommander: IncidentCommanderAgent;
  private deploymentOrchestrator: DeploymentOrchestratorAgent;
  private runbookGenerator: RunbookGeneratorAgent;
  private costOptimizer: CostOptimizerAgent;

  constructor() {
    this.incidentCommander = new IncidentCommanderAgent();
    this.deploymentOrchestrator = new DeploymentOrchestratorAgent();
    this.runbookGenerator = new RunbookGeneratorAgent();
    this.costOptimizer = new CostOptimizerAgent();
  }

  async handleIncident(incident: Incident) {
    const analysis = await this.incidentCommander.analyzeIncident(incident);
    const action = await this.incidentCommander.suggestAction(incident);
    const runbook = await this.runbookGenerator.generateFromIncident(incident);

    return {
      analysis,
      action,
      runbook,
    };
  }

  async handleDeployment(service: string, version: string) {
    const deployment = await this.deploymentOrchestrator.planDeployment(service, version);
    return deployment;
  }

  async handleCostAnalysis(metrics: InfraMetrics[]) {
    const alerts = await this.costOptimizer.analyzeCosts(metrics);
    const recommendations = await Promise.all(
      alerts.map(alert => this.costOptimizer.optimizationRecommendation(alert))
    );

    return {
      alerts,
      recommendations,
    };
  }

  async generateRunbook(incident: Incident): Promise<Runbook> {
    return this.runbookGenerator.generateFromIncident(incident);
  }

  async suggestRollback(deployment: Deployment): Promise<string> {
    return this.deploymentOrchestrator.suggestRollback(deployment);
  }
}
