'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CostAlert } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface CostAnomalyProps {
  alert: CostAlert;
  recommendation?: string;
}

export function CostAnomaly({ alert, recommendation }: CostAnomalyProps) {
  return (
    <Card>
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

          {recommendation && (
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                AI Recommendation
              </p>
              <p className="mt-2 whitespace-pre-line text-sm text-blue-800 dark:text-blue-200">
                {recommendation}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
