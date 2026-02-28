'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { DeploymentCard } from '@/components/deployments/deployment-card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store/app-store';
import { useAgents } from '@/hooks/use-agents';
import { Deployment, ActivityLog } from '@/lib/types';
import { Rocket } from 'lucide-react';

export default function DeploymentsPage() {
  const deployments = useAppStore((state) => state.deployments);
  const updateDeployment = useAppStore((state) => state.updateDeployment);
  const addActivityLog = useAppStore((state) => state.addActivityLog);
  const { suggestRollback } = useAgents();

  const handleStartDeployment = async () => {
    const response = await fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'deployment' }),
    });
    const deployment = await response.json();
    useAppStore.getState().addDeployment(deployment);

    const log: ActivityLog = {
      id: `log-${Date.now()}`,
      type: 'deployment',
      title: 'Deployment Initiated',
      description: `${deployment.service} ${deployment.version}`,
      timestamp: new Date().toISOString(),
      agentType: 'deployment_orchestrator',
    };
    addActivityLog(log);
  };

  const handleRollback = async (deployment: Deployment) => {
    const suggestion = await suggestRollback(deployment);
    alert(suggestion);

    updateDeployment(deployment.id, {
      status: 'rolled_back',
    });

    const log: ActivityLog = {
      id: `log-${Date.now()}`,
      type: 'deployment',
      title: 'Deployment Rolled Back',
      description: `${deployment.service} ${deployment.version}`,
      timestamp: new Date().toISOString(),
      agentType: 'deployment_orchestrator',
    };
    addActivityLog(log);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Deployments"
        description="Automated deployment orchestration and monitoring"
        actions={
          <Button onClick={handleStartDeployment}>
            <Rocket className="mr-2 h-4 w-4" />
            Start Deployment
          </Button>
        }
      />

      <div className="grid gap-6">
        {deployments.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">
              No deployments. Click "Start Deployment" to begin.
            </p>
          </div>
        ) : (
          deployments.map((deployment) => (
            <DeploymentCard
              key={deployment.id}
              deployment={deployment}
              onRollback={handleRollback}
            />
          ))
        )}
      </div>
    </div>
  );
}
