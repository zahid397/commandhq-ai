'use client';

import { useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { ActivityLog } from '@/lib/types';

export function useSimulation() {
  const {
    isSimulating,
    setSimulating,
    addIncident,
    addDeployment,
    addCostAlert,
    addActivityLog,
  } = useAppStore();

  const startSimulation = useCallback(() => {
    setSimulating(true);
  }, [setSimulating]);

  const stopSimulation = useCallback(() => {
    setSimulating(false);
  }, [setSimulating]);

  useEffect(() => {
    if (!isSimulating) return;

    // Simulate random events every 10 seconds
    const interval = setInterval(async () => {
      const eventType = Math.random();

      if (eventType < 0.3) {
        // 30% chance of incident
        const response = await fetch('/api/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'incident' }),
        });
        const incident = await response.json();
        addIncident(incident);
        
        const log: ActivityLog = {
          id: `log-${Date.now()}`,
          type: 'incident',
          title: 'New Incident Detected',
          description: incident.title,
          severity: incident.severity,
          timestamp: new Date().toISOString(),
          agentType: 'incident_commander',
        };
        addActivityLog(log);
      } else if (eventType < 0.6) {
        // 30% chance of deployment
        const response = await fetch('/api/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'deployment' }),
        });
        const deployment = await response.json();
        addDeployment(deployment);
        
        const log: ActivityLog = {
          id: `log-${Date.now()}`,
          type: 'deployment',
          title: 'Deployment Started',
          description: `${deployment.service} ${deployment.version}`,
          timestamp: new Date().toISOString(),
          agentType: 'deployment_orchestrator',
        };
        addActivityLog(log);
      } else if (eventType < 0.8) {
        // 20% chance of cost alert
        const response = await fetch('/api/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'cost_alert' }),
        });
        const alert = await response.json();
        addCostAlert(alert);
        
        const log: ActivityLog = {
          id: `log-${Date.now()}`,
          type: 'cost_alert',
          title: 'Cost Anomaly Detected',
          description: `${alert.service} - ${alert.variance}% over budget`,
          timestamp: new Date().toISOString(),
          agentType: 'cost_optimizer',
        };
        addActivityLog(log);
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [isSimulating, addIncident, addDeployment, addCostAlert, addActivityLog]);

  return {
    isSimulating,
    startSimulation,
    stopSimulation,
  };
}
