'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Rocket, DollarSign, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';

export function SummaryCards() {
  const stats = useAppStore((state) => state.stats);

  const cards = [
    {
      title: 'Active Incidents',
      value: stats.activeIncidents,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      change: '+2 from yesterday',
    },
    {
      title: 'Running Deployments',
      value: stats.runningDeployments,
      icon: Rocket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      change: '3 completed today',
    },
    {
      title: 'Cost Alerts',
      value: stats.costAlerts,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      change: '$1.2K saved this week',
    },
    {
      title: 'System Health',
      value: `${stats.systemHealth}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      change: 'All systems operational',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`rounded-lg p-2 ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
