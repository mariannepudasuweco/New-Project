import React from 'react';
import { ChevronDown, Bell } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function Topbar() {
  const { projects, activeProject, setActiveProjectId } = useAppContext();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label htmlFor="project-select" className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Current Project:</label>
          <div className="relative flex items-center bg-slate-100 px-3 py-1.5 rounded border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
            <select
              id="project-select"
              value={activeProject?.id || ''}
              onChange={(e) => setActiveProjectId(e.target.value)}
              className="appearance-none bg-transparent font-semibold text-sm text-slate-700 block w-full sm:w-64 pr-8 focus:outline-none cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>
        </div>
        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
        <div className="text-sm font-medium text-slate-500 hidden md:block">
          Project Phase: <span className="text-indigo-600 ml-1">{activeProject?.status || 'Select Project'}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer hover:bg-slate-50 p-2 rounded-full transition-colors">
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          <Bell className="w-5 h-5 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
