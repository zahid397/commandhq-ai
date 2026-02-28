import { Runbook, Incident, RunbookStep } from '@/lib/types';

export class RunbookGeneratorAgent {
  async generateFromIncident(incident: Incident): Promise<Runbook> {
    const runbookId = `runbook-${Date.now()}`;
    
    const templates: Record<string, RunbookStep[]> = {
      database: [
        {
          order: 1,
          title: 'Identify Problem Queries',
          description: 'Check for long-running or blocked queries',
          command: 'SELECT * FROM pg_stat_activity WHERE state = \'active\' AND query_start < NOW() - INTERVAL \'5 minutes\';',
        },
        {
          order: 2,
          title: 'Kill Problematic Queries',
          description: 'Terminate queries consuming excessive resources',
          command: 'SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE query_start < NOW() - INTERVAL \'10 minutes\';',
          warning: '⚠️ This will terminate active connections. Ensure no critical operations are running.',
        },
        {
          order: 3,
          title: 'Scale Database Resources',
          description: 'Increase connection pool and scale read replicas',
          command: 'kubectl scale deployment postgres-replica --replicas=5',
        },
        {
          order: 4,
          title: 'Monitor Recovery',
          description: 'Watch connection pool metrics and query performance',
          command: 'watch -n 5 "psql -c \'SELECT count(*) FROM pg_stat_activity;\'"',
        },
      ],
      api: [
        {
          order: 1,
          title: 'Check Pod Status',
          description: 'Identify pods with high resource usage or crashes',
          command: 'kubectl top pods -n production | grep api-service',
        },
        {
          order: 2,
          title: 'Scale Horizontally',
          description: 'Increase replica count to handle load',
          command: 'kubectl scale deployment api-service --replicas=8 -n production',
        },
        {
          order: 3,
          title: 'Update Resource Limits',
          description: 'Increase memory limits to prevent OOM kills',
          command: 'kubectl set resources deployment api-service --limits=memory=4Gi -n production',
        },
        {
          order: 4,
          title: 'Monitor Metrics',
          description: 'Track memory usage and error rates',
          command: 'kubectl logs -f deployment/api-service -n production --tail=100',
        },
      ],
    };

    const key = Object.keys(templates).find(k => 
      incident.title.toLowerCase().includes(k)
    ) || 'api';

    const content = this.generateMarkdownContent(incident, templates[key]);

    return {
      id: runbookId,
      title: `Incident Response: ${incident.title}`,
      category: 'incident',
      content,
      steps: templates[key],
      createdAt: new Date().toISOString(),
      generatedBy: 'runbook_generator',
      relatedIncidentId: incident.id,
    };
  }

  private generateMarkdownContent(incident: Incident, steps: RunbookStep[]): string {
    return `# ${incident.title} - Response Runbook

## Incident Overview
- **Severity**: ${incident.severity.toUpperCase()}
- **Affected Services**: ${incident.affectedServices.join(', ')}
- **Detected**: ${new Date(incident.detectedAt).toLocaleString()}

## Response Steps

${steps.map(step => `
### ${step.order}. ${step.title}

${step.description}

${step.command ? `\`\`\`bash\n${step.command}\n\`\`\`` : ''}

${step.warning ? `> ${step.warning}` : ''}
`).join('\n')}

## Post-Incident Actions
1. Document timeline and root cause
2. Update monitoring alerts
3. Schedule post-mortem meeting
4. Update this runbook based on learnings
`;
  }

  async generateOptimizationRunbook(service: string): Promise<Runbook> {
    return {
      id: `runbook-opt-${Date.now()}`,
      title: `Cost Optimization: ${service}`,
      category: 'optimization',
      content: `# Cost Optimization Guide for ${service}\n\n## Recommended Actions\n- Right-size compute resources\n- Enable auto-scaling\n- Use spot instances for non-critical workloads`,
      steps: [],
      createdAt: new Date().toISOString(),
      generatedBy: 'runbook_generator',
    };
  }
}
