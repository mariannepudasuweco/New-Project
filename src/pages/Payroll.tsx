import React, { useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockPayroll, mockEmployees } from '../data/mockData';
import { Card, CardHeader, CardContent, Button, Input, Badge } from '../components/ui';

export function Payroll() {
  const { activeProject } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const payrolls = mockPayroll.filter(p => !activeProject || p.projectId === activeProject.id)
    .map(p => {
      const emp = mockEmployees.find(e => e.id === p.employeeId);
      return { ...p, employeeName: emp?.name, position: emp?.position };
    })
    .filter(p => p.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500';
      case 'Approved': return 'bg-indigo-500';
      case 'Draft': return 'bg-amber-500';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Payroll</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage employee attendance and compensation.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" className="font-bold"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button className="font-bold tracking-wide"><Plus className="w-4 h-4 mr-2" /> Generate Payroll</Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="py-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search employee..." 
              className="pl-9 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest sticky top-0 z-10">
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left">Employee</th>
                <th className="px-6 py-3 text-left">Period</th>
                <th className="px-6 py-3 text-right">Work Days</th>
                <th className="px-6 py-3 text-right">Gross Pay</th>
                <th className="px-6 py-3 text-right">Deductions</th>
                <th className="px-6 py-3 text-right">Net Pay</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 font-medium">
              {payrolls.map((record) => (
                <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-slate-800">{record.employeeName}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{record.position}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 uppercase tracking-wider">{record.periodStart} - {record.periodEnd}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-slate-500">{record.workDays} d</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-slate-500">${record.grossPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-amber-500">-${record.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-slate-800">${record.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${getStatusBadgeColor(record.status)}`}></div>
                       <span className="text-[10px] uppercase tracking-wider font-bold text-slate-600">{record.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {payrolls.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-500">
                    No payroll records found.
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
