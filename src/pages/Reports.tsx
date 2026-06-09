import React from 'react';
import { FileText, Download, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../components/ui';

export function Reports() {
  const { activeProject } = useAppContext();

  const reportTypes = [
    { id: '1', title: 'Project Summary Report', icon: TrendingUp, desc: 'Overview of project progress, budget status, and milestones.' },
    { id: '2', title: 'Procurement Report', icon: ShoppingCart, desc: 'Detailed list of POs, spending, and supplier deliveries.' },
    { id: '3', title: 'Payroll Summary', icon: Users, desc: 'Employee attendance, wages, and project labor costs.' },
    { id: '4', title: 'Schedule Variance', icon: FileText, desc: 'Comparison of planned vs. actual task schedule progress.' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Reports</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Generate and export reports for {activeProject ? activeProject.name : 'all projects'}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.id} className="hover:border-indigo-200 transition-colors">
            <CardContent>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <report.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{report.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">{report.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" /> PDF
                    </Button>
                    <Button variant="secondary" size="sm" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none shadow-none">
                      CSV
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Generated Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-slate-100">
            {[
              { name: 'Procurement_Q1_2024.pdf', date: 'Oct 24, 2024', author: 'Charlie Buyer', size: '1.2 MB' },
              { name: 'Payroll_Feb_2024_Final.csv', date: 'Oct 22, 2024', author: 'Diana Payroll', size: '0.8 MB' },
              { name: 'Project_Summary_Alpha_Tower.pdf', date: 'Oct 20, 2024', author: 'Bob Manager', size: '2.5 MB' },
            ].map((item, i) => (
               <li key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
                     <FileText className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                     <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">{item.date} • {item.author}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <span className="text-xs font-mono text-slate-400 font-bold">{item.size}</span>
                   <Button variant="outline" size="sm" className="px-2 py-1.5 h-auto">
                     <Download className="w-4 h-4 text-slate-500" />
                   </Button>
                 </div>
               </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
