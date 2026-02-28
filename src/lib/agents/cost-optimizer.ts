import { InfraMetrics, CostAlert } from '@/lib/types';

export class CostOptimizerAgent {
  async analyzeCosts(metrics: InfraMetrics[]): Promise<CostAlert[]> {
    const alerts: CostAlert[] = [];
    
    const serviceGroups = this.groupByService(metrics);
    
    for (const [service, serviceMetrics] of Object.entries(serviceGroups)) {
      const currentCost = this.calculateAverageCost(serviceMetrics);
      const expectedCost = this.getBaselineCost(service);
      const variance = ((currentCost - expectedCost) / expectedCost) * 100;
      
      if (variance > 20) {
        alerts.push({
          id: `cost-alert-${Date.now()}-${service}`,
          service,
          currentCost: Math.round(currentCost * 100) / 100,
          expectedCost: Math.round(expectedCost * 100) / 100,
          variance: Math.round(variance * 10) / 10,
          anomalyType: variance > 50 ? 'spike' : 'sustained',
          detectedAt: new Date().toISOString(),
        });
      }
    }
    
    return alerts;
  }

  async optimizationRecommendation(alert: CostAlert): Promise<string> {
    const recommendations: Record<string, string> = {
      spike: `🎯 COST SPIKE DETECTED: ${alert.service} costs increased ${alert.variance}% above baseline. Recommendations:
      
1. Review recent deployment changes
2. Check for runaway processes or memory leaks
3. Analyze traffic patterns for unexpected load
4. Consider scaling down non-essential replicas`,

      sustained: `📊 SUSTAINED COST INCREASE: ${alert.service} running ${alert.variance}% over budget. Optimization opportunities:
      
1. Right-size instance types (currently over-provisioned)
2. Enable auto-scaling based on actual usage
3. Use reserved instances for predictable workloads
4. Archive unused data to cheaper storage tiers`,

      unusual_pattern: `🔍 UNUSUAL PATTERN: ${alert.service} showing abnormal cost behavior. Investigation needed:
      
1. Check for inefficient queries or API calls
2. Review caching strategy
3. Analyze data transfer costs
4. Audit resource cleanup procedures`,
    };

    return recommendations[alert.anomalyType];
  }

  private groupByService(metrics: InfraMetrics[]): Record<string, InfraMetrics[]> {
    return metrics.reduce((acc, metric) => {
      if (!acc[metric.service]) {
        acc[metric.service] = [];
      }
      acc[metric.service].push(metric);
      return acc;
    }, {} as Record<string, InfraMetrics[]>);
  }

  private calculateAverageCost(metrics: InfraMetrics[]): number {
    const sum = metrics.reduce((acc, m) => acc + m.cost, 0);
    return sum / metrics.length;
  }

  private getBaselineCost(service: string): number {
    const baselines: Record<string, number> = {
      'api-gateway': 450,
      'auth-service': 320,
      'payment-service': 680,
      'notification-service': 210,
      'analytics-service': 540,
    };
    return baselines[service] || 400;
  }
}
