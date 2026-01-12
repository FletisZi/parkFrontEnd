import React from 'react';
import { Select } from '../ui/Select';
import { MapPin } from 'lucide-react';
interface LocationSwitcherProps {
  currentLocation: string;
  onChange: (location: string) => void;
}
export function LocationSwitcher({
  currentLocation,
  onChange
}: LocationSwitcherProps) {
  const locations = [{
    value: 'central',
    label: 'Central Yard'
  }, {
    value: 'sub1',
    label: 'Sub-Level 1'
  }, {
    value: 'sub2',
    label: 'Sub-Level 2'
  }, {
    value: 'vip',
    label: 'VIP Area'
  }];
  return <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm min-w-[200px]">
      <div className="p-2 bg-blue-50 rounded-md text-blue-600">
        <MapPin className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          Current Location
        </p>
        <select value={currentLocation} onChange={e => onChange(e.target.value)} className="w-full bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer text-sm">
          {locations.map(loc => <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>)}
        </select>
      </div>
    </div>;
}