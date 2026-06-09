export type Role = 'Admin' | 'Project Manager' | 'Procurement Staff' | 'Payroll Staff' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  status: 'Active' | 'Inactive';
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Planning' | 'Ongoing' | 'Completed' | 'On Hold';
  startDate: string;
  endDate: string;
  budget: number;
  progress: number; // 0-100
}

export interface ProcurementRecord {
  id: string;
  projectId: string;
  requestNo: string;
  itemDescription: string;
  supplier: string;
  requestDate: string;
  cost: number;
  status: 'Pending' | 'Approved' | 'Ordered' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Partial' | 'Paid';
  remarks?: string;
}

export interface Employee {
  id: string;
  projectId: string;
  name: string;
  position: string;
  dailyRate: number;
}

export interface PayrollRecord {
  id: string;
  projectId: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  workDays: number;
  overtimeHours: number;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: 'Draft' | 'Approved' | 'Paid';
}

export interface ScheduleTask {
  id: string;
  projectId: string;
  name: string;
  assignee: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
}

export interface DashboardStats {
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  pendingTasks: number;
  procurementPending: number;
  payrollPending: number;
  reportsGenerated: number;
}
