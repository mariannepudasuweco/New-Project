import { DashboardStats, Employee, PayrollRecord, ProcurementRecord, Project, ScheduleTask, User } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Admin', email: 'admin@company.com', role: 'Admin', status: 'Active' },
  { id: 'u2', name: 'Bob Manager', email: 'bob@company.com', role: 'Project Manager', status: 'Active' },
  { id: 'u3', name: 'Charlie Buyer', email: 'charlie@company.com', role: 'Procurement Staff', status: 'Active' },
  { id: 'u4', name: 'Diana Payroll', email: 'diana@company.com', role: 'Payroll Staff', status: 'Active' },
  { id: 'u5', name: 'Eve Viewer', email: 'eve@company.com', role: 'Viewer', status: 'Inactive' },
];

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Alpha Tower Construction', client: 'Alpha Corp', status: 'Ongoing', startDate: '2023-01-15', endDate: '2025-06-30', budget: 15000000, progress: 65 },
  { id: 'p2', name: 'Beta Facility Renovation', client: 'Beta LLC', status: 'Ongoing', startDate: '2023-08-01', endDate: '2024-12-15', budget: 3500000, progress: 80 },
  { id: 'p3', name: 'Gamma Road Extension', client: 'City Municipality', status: 'Planning', startDate: '2024-05-01', endDate: '2025-10-30', budget: 8200000, progress: 10 },
  { id: 'p4', name: 'Delta Bridge Repair', client: 'State Dept', status: 'Completed', startDate: '2022-03-10', endDate: '2023-11-20', budget: 1200000, progress: 100 },
];

export const mockProcurement: ProcurementRecord[] = [
  { id: 'pr1', projectId: 'p1', requestNo: 'REQ-2023-001', itemDescription: 'Steel Rebars (100 tons)', supplier: 'BuildMat Inc', requestDate: '2023-02-10', cost: 120000, status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'pr2', projectId: 'p1', requestNo: 'REQ-2023-045', itemDescription: 'Cement (500 bags)', supplier: 'SolidCrete', requestDate: '2023-08-15', cost: 25000, status: 'Ordered', paymentStatus: 'Partial' },
  { id: 'pr3', projectId: 'p2', requestNo: 'REQ-2023-089', itemDescription: 'HVAC Units', supplier: 'Cooling Systems Co.', requestDate: '2023-10-05', cost: 85000, status: 'Approved', paymentStatus: 'Unpaid' },
  { id: 'pr4', projectId: 'p1', requestNo: 'REQ-2024-012', itemDescription: 'Safety Gear', supplier: 'SafeWork', requestDate: '2024-01-20', cost: 5000, status: 'Pending', paymentStatus: 'Unpaid' },
];

export const mockEmployees: Employee[] = [
  { id: 'e1', projectId: 'p1', name: 'John Doe', position: 'Site Engineer', dailyRate: 200 },
  { id: 'e2', projectId: 'p1', name: 'Jane Smith', position: 'Architect', dailyRate: 250 },
  { id: 'e3', projectId: 'p2', name: 'Mike Ross', position: 'Foreman', dailyRate: 150 },
  { id: 'e4', projectId: 'p1', name: 'Sarah Connor', position: 'Safety Officer', dailyRate: 180 },
];

export const mockPayroll: PayrollRecord[] = [
  { id: 'pay1', projectId: 'p1', employeeId: 'e1', periodStart: '2024-02-01', periodEnd: '2024-02-15', workDays: 12, overtimeHours: 10, grossPay: 2700, deductions: 200, netPay: 2500, status: 'Paid' },
  { id: 'pay2', projectId: 'p1', employeeId: 'e2', periodStart: '2024-02-01', periodEnd: '2024-02-15', workDays: 14, overtimeHours: 5, grossPay: 3687.5, deductions: 300, netPay: 3387.5, status: 'Paid' },
  { id: 'pay3', projectId: 'p1', employeeId: 'e1', periodStart: '2024-02-16', periodEnd: '2024-02-29', workDays: 10, overtimeHours: 0, grossPay: 2000, deductions: 150, netPay: 1850, status: 'Approved' },
];

export const mockTasks: ScheduleTask[] = [
  { id: 't1', projectId: 'p1', name: 'Foundation Work', assignee: 'John Doe', startDate: '2023-01-15', endDate: '2023-05-30', progress: 100, status: 'Completed' },
  { id: 't2', projectId: 'p1', name: 'Structural Framing', assignee: 'Jane Smith', startDate: '2023-06-01', endDate: '2024-02-28', progress: 85, status: 'In Progress' },
  { id: 't3', projectId: 'p1', name: 'Plumbing & Electrical', assignee: 'John Doe', startDate: '2024-01-15', endDate: '2024-08-30', progress: 20, status: 'In Progress' },
  { id: 't4', projectId: 'p1', name: 'Interior Finishing', assignee: 'Jane Smith', startDate: '2024-07-01', endDate: '2025-04-30', progress: 0, status: 'Not Started' },
  { id: 't5', projectId: 'p2', name: 'Demolition', assignee: 'Mike Ross', startDate: '2023-08-01', endDate: '2023-09-15', progress: 100, status: 'Completed' },
];

export const mockDashboardStats: DashboardStats = {
  totalProjects: 12,
  ongoingProjects: 8,
  completedProjects: 3,
  pendingTasks: 45,
  procurementPending: 12,
  payrollPending: 3,
  reportsGenerated: 156,
};
