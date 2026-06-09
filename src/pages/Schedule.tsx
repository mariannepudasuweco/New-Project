import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockTasks } from '../data/mockData';
import { Card, CardHeader, CardContent, Button } from '../components/ui';
import { format, differenceInDays } from 'date-fns';

export function Schedule() {
  const { activeProject } = useAppContext();
  const [filter, setFilter] = useState('All');

  const tasks = mockTasks.filter(t => !activeProject || t.projectId === activeProject.id)
    .filter(t => filter === 'All' || t.status === filter);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Project Schedule</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Track tasks, milestones, and timelines.</p>
        </div>
        <Button className="shrink-0 font-bold tracking-wide">
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="py-2.5">
          <div className="flex p-0.5 bg-slate-200/50 rounded inline-flex">
            {['All', 'Not Started', 'In Progress', 'Completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors ${filter === f ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 border border-transparent'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </CardHeader>
        
        <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest sticky top-0 z-10">
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left w-1/3 border-r border-slate-100">Task Name</th>
                <th className="px-6 py-3 text-left w-1/6">Assignee</th>
                <th className="px-6 py-3 text-left w-1/4">Timeline</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 font-medium">
              {tasks.map((task) => {
                const days = differenceInDays(new Date(task.endDate), new Date(task.startDate));
                return (
                  <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 border-r border-slate-100">
                       <span className="text-sm font-semibold text-slate-800 block mb-2">{task.name}</span>
                       <div className="flex items-center gap-2">
                           <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative border border-slate-200">
                             <div
                               className={`h-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                               style={{ width: `${task.progress}%` }}
                             ></div>
                           </div>
                           <span className="text-[10px] font-bold font-mono text-slate-500 shrink-0">{task.progress}%</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-bold uppercase tracking-wider">{task.assignee}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-xs font-mono">
                        <span className="text-slate-700">{format(new Date(task.startDate), 'MMM dd')} - {format(new Date(task.endDate), 'MMM dd')}</span>
                        <span className="text-slate-400 font-sans tracking-wide mt-0.5">{days} days total</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded border ${task.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : task.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{task.status}</span>
                    </td>
                  </tr>
                );
              })}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
