import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockProcurement } from '../data/mockData';
import { Card, CardHeader, CardContent, Button, Input, Badge } from '../components/ui';

export function Procurement() {
  const { activeProject } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const records = mockProcurement.filter(p => !activeProject || p.projectId === activeProject.id)
    .filter(p => p.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) || p.requestNo.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500';
      case 'Pending': return 'bg-amber-500';
      case 'Ordered': return 'bg-indigo-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Procurement</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage purchase requests and orders.</p>
        </div>
        <Button className="shrink-0">
          <Plus className="w-4 h-4 mr-2" /> New Request
        </Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="py-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search items or REQ no..." 
              className="pl-9 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="shrink-0 h-9 bg-white">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </CardHeader>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest sticky top-0 z-10">
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left">Request No.</th>
                <th className="px-6 py-3 text-left">Item Description</th>
                <th className="px-6 py-3 text-left">Supplier</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-right">Cost</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 font-medium">
              {records.map((record) => (
                <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-bold font-mono text-slate-500">{record.requestNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getStatusBadgeColor(record.status)}`}></div>
                      <span className="font-semibold text-sm text-slate-800">{record.itemDescription}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{record.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 uppercase tracking-wider">{record.requestDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-indigo-600 font-mono text-right">${record.cost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap uppercase tracking-wider text-[10px] font-bold">
                    {record.status}
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                    No procurement records found.
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
