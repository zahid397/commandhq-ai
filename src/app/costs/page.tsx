'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { CostMetrics } from '@/components/costs/cost-metrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store/app-store';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, AlertCircle } from 'lucide-react';

export default function CostsPage() {
  const infraMetrics = useAppStore((state) => state.infraMetrics);
  const costAlerts = useAppStore((state) => state.costAlerts);
  const [recommendations, setRecommendations] = useState<Record<string, string>>({});

  const handleAnalyzeCosts = async () => {
    const response = await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'analyze_costs',
        payload: infraMetrics,
      }),
    });
    const data = await response.json();
    
    // Store recommendations
    const recs: Record<string, string> = {};
    data.alerts.forEach((alert: any, index: number) => {
      recs[alert.id] = data.recommendations[index];
    });
    setRecommendations(recs);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Cost Optimization"
        description="AI-powered cost analysis and optimization recommendations"
        actions={
          <Button onClick={handleAnalyzeCosts}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Analyze Costs
          </Button>
        }
      />

      <CostMetrics />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Cost Alerts</h2>
        {costAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No cost alerts. All services are within budget.
              </p>
            </CardContent>
          </Card>
        ) : (
          costAlerts.map((alert) => (
            <Card key={alert.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-lg bg-yellow-50 p-2 dark:bg-yellow-950">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{alert.service}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Cost variance detected
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      alert.variance > 50
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }
                  >
                    {alert.anomalyType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Cost</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(alert.currentCost)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Cost</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(alert.expectedCost)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Variance</p>
                      <p className="text-lg font-semibold text-red-600">
                        +{alert.variance.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {recommendations[alert.id] && (
                    <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        AI Recommendation
                      </p>
                      <p className="mt-2 whitespace-pre-line text-sm text-blue-800 dark:text-blue-200">
                        {recommendations[alert.id]}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
