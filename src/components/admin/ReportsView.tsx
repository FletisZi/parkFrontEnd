import React from 'react';
import { Card } from '../ui/Card';
import { BarChart3, Users, Clock, TrendingUp } from 'lucide-react';
export function ReportsView() {
  const metrics = [{
    label: 'Total Requests',
    value: '1,248',
    change: '+12%',
    icon: BarChart3,
    color: 'blue'
  }, {
    label: 'Avg Wait Time',
    value: '8.5m',
    change: '-2%',
    icon: Clock,
    color: 'green'
  }, {
    label: 'Active Valets',
    value: '12',
    change: '0%',
    icon: Users,
    color: 'indigo'
  }, {
    label: 'Efficiency',
    value: '98%',
    change: '+1%',
    icon: TrendingUp,
    color: 'amber'
  }];
  return <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(metric => <Card key={metric.label} className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {metric.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-${metric.color}-50 text-${metric.color}-600`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                {metric.change}
              </span>
              <span className="text-slate-400 ml-2">vs last week</span>
            </div>
          </Card>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Hourly Traffic" className="min-h-[300px]">
          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {[40, 65, 30, 85, 50, 90, 45, 70, 35, 60, 25, 55].map((h, i) => <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group">
                <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600" style={{
              height: `${h}%`
            }} />
              </div>)}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>8AM</span>
            <span>12PM</span>
            <span>4PM</span>
            <span>8PM</span>
          </div>
        </Card>

        <Card title="Wait Time Analysis" className="min-h-[300px]">
          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {[30, 45, 25, 60, 40, 75, 35, 55, 30, 50, 20, 45].map((h, i) => <div key={i} className="w-full bg-slate-100 rounded-t-sm relative group">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-sm transition-all duration-500 group-hover:bg-indigo-600" style={{
              height: `${h}%`
            }} />
              </div>)}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </Card>
      </div>
    </div>;
}