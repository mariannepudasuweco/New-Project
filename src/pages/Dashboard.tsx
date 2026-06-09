import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { mockDashboardStats } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui';

const data = [
  { name: 'Jan', progress: 45 },
  { name: 'Feb', progress: 52 },
  { name: 'Mar', progress: 58 },
  { name: 'Apr', progress: 65 },
  { name: 'May', progress: 70 },
  { name: 'Jun', progress: 75 },
];

export function Dashboard() {
  const { activeProject } = useAppContext();

  return (
    <div className="flex flex-col gap-6 h-full font-sans">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {activeProject ? (
          <>
            <StatCard label="Project Progress" value={`${activeProject.progress}%`} diff="+5% vs last week" diffColor="text-emerald-600" progress={activeProject.progress} />
            <StatCard label="Budget Used" value={`$${(activeProject.budget * activeProject.progress / 100).toLocaleString()}`} diff="Within limit" diffColor="text-indigo-600" />
            <StatCard label="Procurement Pending" value={5} diff="Action needed" diffColor="text-amber-600" />
            <StatCard label="Active Personnel" value={12} diff="⚠️ 1 absence alert" diffColor="text-amber-600" />
          </>
        ) : (
          <>
            <StatCard label="Total Projects" value={mockDashboardStats.totalProjects} diff="Across all regions" diffColor="text-slate-400" />
            <StatCard label="Ongoing" value={mockDashboardStats.ongoingProjects} diff="Currently active" diffColor="text-emerald-600" />
            <StatCard label="Pending Tasks" value={mockDashboardStats.pendingTasks} diff="Needs attention" diffColor="text-amber-600" />
            <StatCard label="Completed" value={mockDashboardStats.completedProjects} diff="This year" diffColor="text-indigo-600" />
          </>
        )}
      </div>

      {/* Main Visual Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 flex-1">
        {/* Chart */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="py-3">
            <CardTitle>Project Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col min-h-[300px]">
            <div className="flex-1 w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="progress" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="flex flex-col">
          <CardHeader className="py-3">
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <ul className="divide-y divide-slate-100">
              {[
                { title: 'New PO raised', time: '2 hours ago', type: 'Procurement', color: 'bg-indigo-500' },
                { title: 'Task "Foundation" completed', time: '5 hours ago', type: 'Schedule', color: 'bg-emerald-500' },
                { title: 'Payroll approved', time: '1 day ago', type: 'Payroll', color: 'bg-amber-500' },
                { title: 'Project status updated', time: '2 days ago', type: 'System', color: 'bg-slate-400' },
                { title: 'New material delivery', time: '2 days ago', type: 'Procurement', color: 'bg-emerald-500' },
              ].map((activity, i) => (
                <li key={i} className="p-4 flex items-center hover:bg-slate-50 transition-colors cursor-default">
                  <div className={`w-2 h-2 rounded-full ${activity.color} shrink-0 mr-3`} />
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-sm font-semibold text-slate-800 truncate">{activity.title}</p>
                    <p className="text-[10px] uppercase text-slate-400 mt-0.5 tracking-wider font-bold">{activity.time}</p>
                  </div>
                  <Badge variant="default">{activity.type}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Activity Section */}
      <div className="bg-slate-900 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between text-white shadow-lg shrink-0 gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Project Status: On Track</span>
          </div>
          <div className="flex gap-4">
            <div className="text-xs">
              <span className="text-slate-500 block uppercase font-bold text-[9px] tracking-wider mb-0.5">Days Since Start</span>
              <span className="font-mono text-sm leading-none block">142 Days</span>
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block uppercase font-bold text-[9px] tracking-wider mb-0.5">Est. Completion</span>
              <span className="font-mono text-sm leading-none block">Dec 12, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, diff, diffColor, progress }: { label: string; value: string | number; diff?: string; diffColor?: string; progress?: number }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full justify-between">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      {progress !== undefined ? (
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-indigo-500 h-full" style={{ width: `${progress}%` }}></div>
        </div>
      ) : diff ? (
        <div className={`mt-2 text-xs font-medium ${diffColor} flex items-center`}>
           {diff}
        </div>
      ) : null}
    </div>
  );
}
