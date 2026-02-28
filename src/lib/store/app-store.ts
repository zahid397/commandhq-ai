import { create } from 'zustand';
import { AppState, DashboardStats, Incident, Deployment, InfraMetrics, Runbook } from '@/lib/types';
import mockIncidentsRaw from '@/lib/mock-data/incidents.json';
import mockDeploymentsRaw from '@/lib/mock-data/deployments.json';
import mockInfraMetricsRaw from '@/lib/mock-data/infrastructure.json';
import mockRunbooksRaw from '@/lib/mock-data/runbooks.json';

// Type assertions to ensure JSON matches TypeScript types
const mockIncidents = mockIncidentsRaw as Incident[];
const mockDeployments = mockDeploymentsRaw as Deployment[];
const mockInfraMetrics = mockInfraMetricsRaw as InfraMetrics[];
const mockRunbooks = mockRunbooksRaw as Runbook[];

const calculateStats = (state: Partial<AppState>): DashboardStats => {
  return {
    activeIncidents: state.incidents?.filter(i => i.status === 'open' || i.status === 'investigating').length || 0,
    runningDeployments: state.deployments?.filter(d => d.status === 'running' || d.status === 'pending').length || 0,
    costAlerts: state.costAlerts?.length || 0,
    systemHealth: 98.5,
  };
};

export const useAppStore = create<AppState>((set, get) => ({
  incidents: mockIncidents,
  deployments: mockDeployments,
  infraMetrics: mockInfraMetrics,
  runbooks: mockRunbooks,
  costAlerts: [],
  activityLogs: [],
  stats: calculateStats({ incidents: mockIncidents, deployments: mockDeployments, costAlerts: [] }),
  isSimulating: false,

  addIncident: (incident) => {
    set((state) => {
      const newState = { ...state, incidents: [incident, ...state.incidents] };
      return { ...newState, stats: calculateStats(newState) };
    });
  },

  updateIncident: (id, updates) => {
    set((state) => {
      const newState = {
        ...state,
        incidents: state.incidents.map((i) => (i.id === id ? { ...i, ...updates } : i)),
      };
      return { ...newState, stats: calculateStats(newState) };
    });
  },

  addDeployment: (deployment) => {
    set((state) => {
      const newState = { ...state, deployments: [deployment, ...state.deployments] };
      return { ...newState, stats: calculateStats(newState) };
    });
  },

  updateDeployment: (id, updates) => {
    set((state) => {
      const newState = {
        ...state,
        deployments: state.deployments.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      };
      return { ...newState, stats: calculateStats(newState) };
    });
  },

  addRunbook: (runbook) => {
    set((state) => ({ runbooks: [runbook, ...state.runbooks] }));
  },

  addCostAlert: (alert) => {
    set((state) => {
      const newState = { ...state, costAlerts: [alert, ...state.costAlerts] };
      return { ...newState, stats: calculateStats(newState) };
    });
  },

  addActivityLog: (log) => {
    set((state) => ({
      activityLogs: [log, ...state.activityLogs].slice(0, 50), // Keep last 50
    }));
  },

  updateStats: () => {
    set((state) => ({ stats: calculateStats(state) }));
  },

  setSimulating: (status) => {
    set({ isSimulating: status });
  },

  reset: () => {
    set({
      incidents: mockIncidents,
      deployments: mockDeployments,
      infraMetrics: mockInfraMetrics,
      runbooks: mockRunbooks,
      costAlerts: [],
      activityLogs: [],
      stats: calculateStats({ incidents: mockIncidents, deployments: mockDeployments, costAlerts: [] }),
      isSimulating: false,
    });
  },
}));
