import React from 'react';
import { Card } from '../ui/Card';
import { ParkingSpot } from '../../types';
// Generate mock spots
const generateSpots = (count: number): ParkingSpot[] => {
  return Array.from({
    length: count
  }).map((_, i) => ({
    id: `spot-${i}`,
    number: `A-${i + 1}`,
    status: Math.random() > 0.7 ? 'occupied' : Math.random() > 0.9 ? 'blocked' : 'available',
    locationId: 'central'
  }));
};
const SPOTS = generateSpots(48);
export function SpotManager() {
  return <Card title="Parking Grid View" description="Visual representation of Central Yard">
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
        {SPOTS.map(spot => <div key={spot.id} className={`
              aspect-square rounded-md flex items-center justify-center text-xs font-medium cursor-pointer transition-all hover:scale-105
              ${spot.status === 'available' ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' : ''}
              ${spot.status === 'occupied' ? 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200' : ''}
              ${spot.status === 'blocked' ? 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200' : ''}
            `} title={`Spot ${spot.number}: ${spot.status}`}>
            {spot.number}
          </div>)}
      </div>

      <div className="flex gap-6 mt-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 border border-green-200 rounded" />
          <span className="text-sm text-slate-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border border-red-200 rounded" />
          <span className="text-sm text-slate-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded" />
          <span className="text-sm text-slate-600">Blocked</span>
        </div>
      </div>
    </Card>;
}