'use client';

import { PageHeader } from '@/components/layout/page-header';
import { RunbookViewer } from '@/components/runbooks/runbook-viewer';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store/app-store';

export default function RunbooksPage() {
  const runbooks = useAppStore((state) => state.runbooks);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Runbooks"
        description="AI-generated operational procedures and best practices"
      />

      <div className="grid gap-6">
        {runbooks.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No runbooks yet. Analyze an incident to generate runbooks automatically.
              </p>
            </CardContent>
          </Card>
        ) : (
          runbooks.map((runbook) => (
            <RunbookViewer key={runbook.id} runbook={runbook} />
          ))
        )}
      </div>
    </div>
  );
}
