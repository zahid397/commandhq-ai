import { Deployment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusColor, formatRelativeTime } from '@/lib/utils';
import { Rocket, User, GitCommit } from 'lucide-react';

interface DeploymentCardProps {
  deployment: Deployment;
  onRollback?: (deployment: Deployment) => void;
}

export function DeploymentCard({ deployment, onRollback }: DeploymentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
              <Rocket className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {deployment.service} - {deployment.version}
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {deployment.environment}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(deployment.status)}>
            {deployment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {deployment.triggeredBy}
            </div>
            <div className="flex items-center gap-1">
              <GitCommit className="h-4 w-4" />
              {deployment.commits} commits
            </div>
            <div>Started {formatRelativeTime(deployment.startedAt)}</div>
          </div>

          <div className="space-y-2">
            {deployment.timeline.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    event.status === 'completed'
                      ? 'bg-green-500'
                      : event.status === 'running'
                      ? 'animate-pulse bg-blue-500'
                      : event.status === 'failed'
                      ? 'bg-red-500'
                      : 'bg-gray-300'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.stage}</p>
                  <p className="text-xs text-muted-foreground">{event.message}</p>
                </div>
                {event.duration && (
                  <span className="text-xs text-muted-foreground">
                    {event.duration}s
                  </span>
                )}
              </div>
            ))}
          </div>

          {deployment.canRollback && deployment.status === 'failed' && onRollback && (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => onRollback(deployment)}
            >
              Rollback Deployment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
