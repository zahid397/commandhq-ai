export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type DeploymentStatus = 'pending' | 'running' | 'success' | 'failed' | 'rolled_back';
export type AgentType = 'incident_commander' | 'deployment_orchestrator' | 'runbook_generator' | 'cost_optimizer';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedServices: string[];
  detectedAt: string;
  resolvedAt?: string;
  aiAnalysis?: AIAnalysis;
  recommendedAction?: string;
}

export interface AIAnalysis {
  rootCause: string;
  impactAssessment: string;
  suggestedActions: string[];
  estimatedResolutionTime: string;
  confidence: number;
}

export interface Deployment {
  id: string;
  service: string;
  version: string;
  environment: 'production' | 'staging' | 'development';
  status: DeploymentStatus;
  startedAt: string;
  completedAt?: string;
  triggeredBy: string;
  commits: number;
  timeline: DeploymentEvent[];
  canRollback: boolean;
}

export interface DeploymentEvent {
  id: string;
  stage: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  duration?: number;
  message: string;
}

export interface InfraMetrics {
  id: string;
  service: string;
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
  latency: number;
  cost: number;
  timestamp: string;
  anomaly?: boolean;
}

export interface CostAlert {
  id: string;
  service: string;
  currentCost: number;
  expectedCost: number;
  variance: number;
  anomalyType: 'spike' | 'sustained' | 'unusual_pattern';
  detectedAt: string;
  recommendation?: string;
}

export interface Runbook {
  id: string;
  title: string;
  category: 'incident' | 'deployment' | 'maintenance' | 'optimization';
  content: string;
  steps: RunbookStep[];
  createdAt: string;
  generatedBy: AgentType;
  relatedIncidentId?: string;
}

export interface RunbookStep {
  order: number;
  title: string;
  description: string;
  command?: string;
  warning?: string;
}

export interface ActivityLog {
  id: string;
  type: 'incident' | 'deployment' | 'cost_alert' | 'runbook_generated';
  title: string;
  description: string;
  severity?: IncidentSeverity;
  timestamp: string;
  agentType?: AgentType;
}

export interface DashboardStats {
  activeIncidents: number;
  runningDeployments: number;
  costAlerts: number;
  systemHealth: number;
}

export interface AppState {
  incidents: Incident[];
  deployments: Deployment[];
  infraMetrics: InfraMetrics[];
  runbooks: Runbook[];
  costAlerts: CostAlert[];
  activityLogs: ActivityLog[];
  stats: DashboardStats;
  isSimulating: boolean;
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  addDeployment: (deployment: Deployment) => void;
  updateDeployment: (id: string, updates: Partial<Deployment>) => void;
  addRunbook: (runbook: Runbook) => void;
  addCostAlert: (alert: CostAlert) => void;
  addActivityLog: (log: ActivityLog) => void;
  updateStats: () => void;
  setSimulating: (status: boolean) => void;
  reset: () => void;
}
