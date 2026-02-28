'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store/app-store';
import { formatRelativeTime, getSeverityColor } from '@/lib/utils';
import { AlertTriangle, Rocket, DollarSign, BookOpen } from 'lucide-react';

const iconMap = {
  incident: AlertTriangle,
  deployment: Rocket,
  cost_alert: DollarSign,
  runbook_generated: BookOpen,
};

export function ActivityFeed() {
  const activityLogs = useAppStore((state) => state.activityLogs);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityLogs.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No recent activity. Start a simulation to see events.
            </p>
          ) : (
            activityLogs.slice(0, 10).map((log) => {
              const Icon = iconMap[log.type];
              return (
                <div key={log.id} className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-accent p-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{log.title}</p>
                      {log.severity && (
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.severity}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{log.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(log.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
