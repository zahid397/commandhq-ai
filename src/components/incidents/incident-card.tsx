import { Incident } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSeverityColor, formatRelativeTime } from '@/lib/utils';
import { AlertTriangle, Clock, Server } from 'lucide-react';

interface IncidentCardProps {
  incident: Incident;
  onAnalyze: (incident: Incident) => void;
}

export function IncidentCard({ incident, onAnalyze }: IncidentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-lg bg-red-50 p-2 dark:bg-red-950">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{incident.title}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {incident.description}
              </p>
            </div>
          </div>
          <Badge className={getSeverityColor(incident.severity)}>
            {incident.severity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatRelativeTime(incident.detectedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Server className="h-4 w-4" />
              {incident.affectedServices.length} services affected
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {incident.affectedServices.map((service) => (
              <Badge key={service} variant="outline">
                {service}
              </Badge>
            ))}
          </div>

          {incident.aiAnalysis && (
            <div className="rounded-lg bg-accent p-4 space-y-2">
              <p className="text-sm font-medium">AI Analysis</p>
              <p className="text-sm text-muted-foreground">
                {incident.aiAnalysis.rootCause}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <span className="text-xs font-medium">
                  {Math.round(incident.aiAnalysis.confidence * 100)}%
                </span>
              </div>
            </div>
          )}

          {incident.recommendedAction && (
            <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                Recommended Action
              </p>
              <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-200">
                {incident.recommendedAction}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => onAnalyze(incident)} className="flex-1">
              {incident.aiAnalysis ? 'Re-analyze' : 'Analyze with AI'}
            </Button>
            <Button variant="outline">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
