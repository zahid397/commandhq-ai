import { Incident, AIAnalysis } from '@/lib/types';

export class IncidentCommanderAgent {
  async analyzeIncident(incident: Incident): Promise<AIAnalysis> {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const analyses: Record<string, AIAnalysis> = {
      database: {
        rootCause: 'Database connection pool exhaustion due to slow queries',
        impactAssessment: 'Critical - 50% of API requests failing, affecting 10,000+ users',
        suggestedActions: [
          'Scale database read replicas immediately',
          'Identify and kill long-running queries',
          'Implement query timeout limits',
          'Enable connection pooling optimization',
        ],
        estimatedResolutionTime: '15-30 minutes',
        confidence: 0.92,
      },
      api: {
        rootCause: 'High memory consumption in API pods causing OOM kills',
        impactAssessment: 'High - 30% degradation in response times, intermittent 503 errors',
        suggestedActions: [
          'Increase pod memory limits from 2GB to 4GB',
          'Scale horizontally to 8 replicas',
          'Enable memory profiling to identify leaks',
          'Review recent code changes for memory issues',
        ],
        estimatedResolutionTime: '10-20 minutes',
        confidence: 0.88,
      },
      network: {
        rootCause: 'AWS Network Load Balancer health check failures',
        impactAssessment: 'Medium - Sporadic connection timeouts in us-east-1 region',
        suggestedActions: [
          'Verify security group rules for health check ports',
          'Check target group health status',
          'Review CloudWatch metrics for anomalies',
          'Consider failover to backup region',
        ],
        estimatedResolutionTime: '20-40 minutes',
        confidence: 0.85,
      },
    };

    // Simple keyword matching for demo
    const key = Object.keys(analyses).find(k => 
      incident.title.toLowerCase().includes(k) || 
      incident.description.toLowerCase().includes(k)
    ) || 'api';

    return analyses[key];
  }

  async suggestAction(incident: Incident): Promise<string> {
    const actionMap: Record<string, string> = {
      critical: '🚨 IMMEDIATE ACTION REQUIRED: Initiate incident response protocol and notify on-call team',
      high: '⚠️ Escalate to senior engineers and prepare rollback procedures',
      medium: '📊 Monitor closely and prepare mitigation steps',
      low: '📝 Document for post-mortem and schedule fix in next sprint',
    };

    return actionMap[incident.severity];
  }
}
