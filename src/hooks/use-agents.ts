'use client';

import { useState } from 'react';
import { Incident, Deployment, AIAnalysis, Runbook } from '@/lib/types';

export function useAgents() {
  const [loading, setLoading] = useState(false);

  const analyzeIncident = async (incident: Incident) => {
    setLoading(true);
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze_incident',
          payload: incident,
        }),
      });
      const data = await response.json();
      return data;
    } finally {
      setLoading(false);
    }
  };

  const planDeployment = async (service: string, version: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'plan_deployment',
          payload: { service, version },
        }),
      });
      const deployment = await response.json();
      return deployment;
    } finally {
      setLoading(false);
    }
  };

  const generateRunbook = async (incident: Incident): Promise<Runbook> => {
    setLoading(true);
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_runbook',
          payload: incident,
        }),
      });
      const runbook = await response.json();
      return runbook;
    } finally {
      setLoading(false);
    }
  };

  const suggestRollback = async (deployment: Deployment): Promise<string> => {
    setLoading(true);
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'suggest_rollback',
          payload: deployment,
        }),
      });
      const data = await response.json();
      return data.suggestion;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    analyzeIncident,
    planDeployment,
    generateRunbook,
    suggestRollback,
  };
}
