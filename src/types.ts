export type Priority = "High" | "Medium" | "Low";
export type Status = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  revenue: number;
  timeTaken: number;
  priority: Priority;
  status: Status;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

export interface DerivedTask extends Task {
  roi: number | null;
  priorityWeight: number;
}

export interface Metrics {
  totalRevenue: number;
  totalTimeTaken: number;
  timeEfficiencyPct: number;
  revenuePerHour: number;
  averageROI: number;
  performanceGrade: "Excellent" | "Good" | "Needs Improvement";
}

export interface ActivityItem {
  id: string;
  ts: number;
  type: "add" | "update" | "delete" | "undo";
  summary: string;
}
