import { Incident, Deployment, InfraMetrics, CostAlert, IncidentSeverity, DeploymentStatus } from '@/lib/types';

export class SimulationEngine {
  private incidentTemplates = [
    {
      title: 'Database Connection Pool Exhausted',
      description: 'Primary database experiencing connection timeouts',
      severity: 'critical' as IncidentSeverity,
      affectedServices: ['api-gateway', 'auth-service', 'payment-service'],
    },
    {
      title: 'High API Latency Detected',
      description: 'P95 latency exceeded 2000ms threshold',
      severity: 'high' as IncidentSeverity,
      affectedServices: ['api-gateway'],
    },
    {
      title: 'Memory Leak in Auth Service',
      description: 'Auth service pods experiencing OOM kills',
      severity: 'high' as IncidentSeverity,
      affectedServices: ['auth-service'],
    },
    {
      title: 'Network Connectivity Issues',
      description: 'Intermittent timeouts in us-east-1 region',
      severity: 'medium' as IncidentSeverity,
      affectedServices: ['api-gateway', 'notification-service'],
    },
  ];

  private services = [
    'api-gateway',
    'auth-service',
    'payment-service',
    'notification-service',
    'analytics-service',
  ];

  generateIncident(): Incident {
    const template = this.incidentTemplates[Math.floor(Math.random() * this.incidentTemplates.length)];
    
    return {
      id: `incident-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: template.description,
      severity: template.severity,
      status: 'open',
      affectedServices: template.affectedServices,
      detectedAt: new Date().toISOString(),
    };
  }

  simulateDeployment(service?: string): Deployment {
    const selectedService = service || this.services[Math.floor(Math.random() * this.services.length)];
    const version = `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}`;
    
    return {
      id: `deploy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      service: selectedService,
      version,
      environment: 'production',
      status: 'pending',
      startedAt: new Date().toISOString(),
      triggeredBy: 'CI/CD Pipeline',
      commits: Math.floor(Math.random() * 15) + 1,
      timeline: this.generateDeploymentTimeline(),
      canRollback: false,
    };
  }

  private generateDeploymentTimeline() {
    const stages = [
      'Pre-deployment Checks',
      'Build & Package',
      'Canary Deployment',
      'Validation',
      'Full Rollout',
    ];

    return stages.map((stage, index) => ({
      id: `stage-${index}-${Date.now()}`,
      stage,
      status: 'pending' as const,
      startedAt: new Date().toISOString(),
      message: `Executing ${stage.toLowerCase()}`,
    }));
  }

  createCostAlert(): CostAlert {
    const service = this.services[Math.floor(Math.random() * this.services.length)];
    const currentCost = Math.random() * 1000 + 500;
    const expectedCost = currentCost * (0.7 + Math.random() * 0.2);
    const variance = ((currentCost - expectedCost) / expectedCost) * 100;
    
    return {
      id: `cost-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      service,
      currentCost: Math.round(currentCost * 100) / 100,
      expectedCost: Math.round(expectedCost * 100) / 100,
      variance: Math.round(variance * 10) / 10,
      anomalyType: variance > 50 ? 'spike' : 'sustained',
      detectedAt: new Date().toISOString(),
    };
  }

  generateInfraMetrics(): InfraMetrics {
    const service = this.services[Math.floor(Math.random() * this.services.length)];
    
    return {
      id: `metric-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      service,
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      requests: Math.floor(Math.random() * 10000) + 1000,
      errors: Math.floor(Math.random() * 100),
      latency: Math.random() * 500 + 50,
      cost: Math.random() * 1000 + 200,
      timestamp: new Date().toISOString(),
      anomaly: Math.random() > 0.8,
    };
  }
}
