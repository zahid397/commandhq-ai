'use client';

import { PageHeader } from '@/components/layout/page-header';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { MetricsChart } from '@/components/dashboard/metrics-chart';
import { Button } from '@/components/ui/button';
import { useSimulation } from '@/hooks/use-simulation';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';

export default function DashboardPage() {
  const { isSimulating, startSimulation, stopSimulation } = useSimulation();
  const reset = useAppStore((state) => state.reset);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Real-time overview of your infrastructure and AI agents"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            {isSimulating ? (
              <Button
                size="sm"
                onClick={stopSimulation}
                variant="destructive"
              >
                <Pause className="mr-2 h-4 w-4" />
                Stop Simulation
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={startSimulation}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Simulation
              </Button>
            )}
          </div>
        }
      />

      <SummaryCards />

      <div className="grid gap-8 lg:grid-cols-2">
        <MetricsChart />
        <ActivityFeed />
      </div>
    </div>
  );
}
