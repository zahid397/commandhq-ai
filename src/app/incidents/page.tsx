'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { IncidentCard } from '@/components/incidents/incident-card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store/app-store';
import { useAgents } from '@/hooks/use-agents';
import { Incident, ActivityLog } from '@/lib/types';
import { Plus } from 'lucide-react';

export default function IncidentsPage() {
  const incidents = useAppStore((state) => state.incidents);
  const updateIncident = useAppStore((state) => state.updateIncident);
  const addRunbook = useAppStore((state) => state.addRunbook);
  const addActivityLog = useAppStore((state) => state.addActivityLog);
  const { loading, analyzeIncident, generateRunbook } = useAgents();
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const handleAnalyze = async (incident: Incident) => {
    setAnalyzingId(incident.id);
    try {
      const result = await analyzeIncident(incident);
      
      updateIncident(incident.id, {
        aiAnalysis: result.analysis,
        recommendedAction: result.action,
      });

      // Generate runbook
      const runbook = await generateRunbook(incident);
      addRunbook(runbook);

      // Log activity
      const log: ActivityLog = {
        id: `log-${Date.now()}`,
        type: 'runbook_generated',
        title: 'AI Analysis Complete',
        description: `Generated analysis and runbook for: ${incident.title}`,
        timestamp: new Date().toISOString(),
        agentType: 'incident_commander',
      };
      addActivityLog(log);
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleCreateIncident = async () => {
    const response = await fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'incident' }),
    });
    const incident = await response.json();
    useAppStore.getState().addIncident(incident);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Incidents"
        description="AI-powered incident detection and response"
        actions={
          <Button onClick={handleCreateIncident}>
            <Plus className="mr-2 h-4 w-4" />
            Simulate Incident
          </Button>
        }
      />

      <div className="grid gap-6">
        {incidents.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">
              No incidents detected. Click "Simulate Incident" to create one.
            </p>
          </div>
        ) : (
          incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onAnalyze={handleAnalyze}
            />
          ))
        )}
      </div>
    </div>
  );
}
