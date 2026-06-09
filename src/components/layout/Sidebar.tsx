import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Calendar, FileText, Settings, LogOut, Shield } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../ui';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ShoppingCart, label: 'Procurement', path: '/procurement' },
  { icon: Users, label: 'Payroll', path: '/payroll' },
  { icon: Calendar, label: 'Schedule', path: '/schedule' },
  { icon: FileText, label: 'Reports', path: '/reports' },
];

const sysItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: Shield, label: 'Access Control', path: '/access' },
];

export function Sidebar() {
  const { logout, user } = useAppContext();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold text-lg">P</div>
        <span className="font-bold tracking-tight text-xl">ProMonitor</span>
      </div>
      
      <nav className="flex-1 mt-6 overflow-y-auto pb-4">
        <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</div>
        <div className="flex flex-col space-y-1 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-6 py-3 transition-colors text-sm group",
                  isActive
                    ? "bg-white/10 border-l-4 border-indigo-500 text-indigo-100"
                    : "text-slate-400 hover:text-white border-l-4 border-transparent"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 flex-shrink-0 opacity-70 transition-colors",
                      isActive ? "text-indigo-100" : "text-slate-400 group-hover:text-white"
                    )}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>
        
        <div className="px-4 py-2 mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</div>
        <div className="flex flex-col space-y-1 mt-2">
          {sysItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-6 py-3 transition-colors text-sm group",
                  isActive
                    ? "bg-white/10 border-l-4 border-indigo-500 text-indigo-100"
                    : "text-slate-400 hover:text-white border-l-4 border-transparent"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 flex-shrink-0 opacity-70 transition-colors",
                      isActive ? "text-indigo-100" : "text-slate-400 group-hover:text-white"
                    )}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-6 border-t border-slate-800 flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold shrink-0">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-medium truncate text-white">{user?.name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold truncate">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-1.5 text-slate-400 hover:text-white transition-colors rounded shrink-0"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
