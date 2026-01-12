import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { ParkingLot } from '../../types';
const MOCK_LOTS: ParkingLot[] = [{
  id: '1',
  name: 'Central Yard',
  capacity: 150,
  occupied: 45,
  status: 'active'
}, {
  id: '2',
  name: 'Sub-Level 1',
  capacity: 80,
  occupied: 78,
  status: 'active'
}, {
  id: '3',
  name: 'Sub-Level 2',
  capacity: 80,
  occupied: 12,
  status: 'maintenance'
}];
export function ParkingLotManager() {
  return <Card title="Parking Locations" description="Manage your parking lots and capacity" action={<Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Add Location
        </Button>} noPadding>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Name</th>
              <th className="px-6 py-3 font-medium text-slate-500">Capacity</th>
              <th className="px-6 py-3 font-medium text-slate-500">
                Occupancy
              </th>
              <th className="px-6 py-3 font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_LOTS.map(lot => <tr key={lot.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {lot.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {lot.capacity} spots
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${lot.occupied / lot.capacity > 0.9 ? 'bg-red-500' : 'bg-blue-500'}`} style={{
                    width: `${lot.occupied / lot.capacity * 100}%`
                  }} />
                    </div>
                    <span className="text-xs text-slate-500">
                      {Math.round(lot.occupied / lot.capacity * 100)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={lot.status === 'active' ? 'success' : 'warning'}>
                    {lot.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </Card>;
}