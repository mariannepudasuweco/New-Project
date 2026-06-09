import React from 'react';
import { Shield, Plus, MoreVertical } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../components/ui';

export function AccessControl() {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Access Control</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage users, roles, and permissions.</p>
        </div>
        <Button className="shrink-0 font-bold tracking-wide">
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="md:col-span-1 flex flex-col min-h-0">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto">
              <ul className="divide-y divide-slate-100">
                {['Admin', 'Project Manager', 'Procurement Staff', 'Payroll Staff', 'Viewer'].map((role) => (
                  <li key={role} className="p-4 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors">
                    <span className="text-sm font-bold text-slate-700">{role}</span>
                    <Shield className="w-4 h-4 text-slate-300" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col min-h-0">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest sticky top-0 z-10">
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 font-medium">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-200">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{user.name}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold uppercase tracking-wider text-slate-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge variant={user.status === 'Active' ? 'success' : 'default'} className="bg-emerald-50 text-emerald-700 border border-emerald-200">{user.status}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Button variant="ghost" size="sm" className="px-2 py-1.5 h-auto text-slate-400 hover:text-slate-900">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
