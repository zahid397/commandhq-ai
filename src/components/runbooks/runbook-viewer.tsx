import { Runbook } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface RunbookViewerProps {
  runbook: Runbook;
}

export function RunbookViewer({ runbook }: RunbookViewerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-lg bg-purple-50 p-2 dark:bg-purple-950">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{runbook.title}</CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">{runbook.category}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(runbook.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {runbook.steps.map((step) => (
            <div key={step.order} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.order}
                </span>
                <h3 className="font-medium">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {step.command && (
                <div className="rounded bg-muted p-3">
                  <code className="text-sm">{step.command}</code>
                </div>
              )}
              {step.warning && (
                <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-3 dark:bg-yellow-950">
                  <p className="text-sm text-yellow-900 dark:text-yellow-100">
                    {step.warning}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
