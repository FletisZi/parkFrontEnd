import React, { useState } from 'react';
import { LocationSwitcher } from '../components/valet/LocationSwitcher';
import { QueueList } from '../components/valet/QueueList';
import { ParkingRequest } from '../types';
import { Card } from '../components/ui/Card';
import { Car, Clock, CheckCircle2 } from 'lucide-react';
// Mock Data
const MOCK_REQUESTS: ParkingRequest[] = [{
  id: '1',
  licensePlate: 'ABC-1234',
  status: 'pending',
  locationId: 'central',
  timestamp: new Date(Date.now() - 1000 * 60 * 5),
  spotNumber: 'A-12'
}, {
  id: '2',
  licensePlate: 'XYZ-9876',
  status: 'accepted',
  locationId: 'central',
  timestamp: new Date(Date.now() - 1000 * 60 * 12),
  spotNumber: 'B-05'
}, {
  id: '3',
  licensePlate: 'LMN-4567',
  status: 'picking_up',
  locationId: 'central',
  timestamp: new Date(Date.now() - 1000 * 60 * 20),
  spotNumber: 'A-08'
}, {
  id: '4',
  licensePlate: 'JFK-5555',
  status: 'arrived',
  locationId: 'central',
  timestamp: new Date(Date.now() - 1000 * 60 * 25),
  spotNumber: 'C-01'
}];
export function ValetScreen() {
  const [location, setLocation] = useState('central');
  const [filter, setFilter] = useState('all');
  const [requests, setRequests] = useState<ParkingRequest[]>(MOCK_REQUESTS);
  const handleStatusChange = (id: string, newStatus: ParkingRequest['status']) => {
    setRequests(prev => prev.map(req => req.id === id ? {
      ...req,
      status: newStatus
    } : req));
  };
  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    active: requests.filter(r => ['accepted', 'picking_up'].includes(r.status)).length,
    completed: requests.filter(r => r.status === 'completed').length
  };
  return <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-900 hidden sm:block">
              Valet Dashboard
            </h1>
            <LocationSwitcher currentLocation={location} onChange={setLocation} />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              {['all', 'pending', 'active', 'completed'].map(f => <button key={f} onClick={() => setFilter(f)} className={`
                    px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all
                    ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}
                  `}>
                  {f}
                </button>)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-100" noPadding>
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-amber-50 border-amber-100" noPadding>
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-amber-600 font-medium">Active</p>
                <p className="text-2xl font-bold text-amber-900">
                  {stats.active}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-green-50 border-green-100" noPadding>
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-900">
                  {stats.completed}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Queue List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {filter === 'all' ? 'All Requests' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
          </h2>
          <QueueList requests={requests} onStatusChange={handleStatusChange} filter={filter} />
        </div>
      </main>
    </div>;
}