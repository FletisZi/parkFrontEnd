import React from 'react';
import { ParkingRequest } from '../../types';
import { CarCard } from './CarCard';
import { Inbox } from 'lucide-react';
interface QueueListProps {
  requests: ParkingRequest[];
  onStatusChange: (id: string, status: ParkingRequest['status']) => void;
  filter: string;
}
export function QueueList({
  requests,
  onStatusChange,
  filter
}: QueueListProps) {
  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return req.status !== 'completed';
    if (filter === 'pending') return req.status === 'pending';
    if (filter === 'active') return ['accepted', 'picking_up', 'arrived'].includes(req.status);
    if (filter === 'completed') return req.status === 'completed';
    return true;
  });
  if (filteredRequests.length === 0) {
    return <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Inbox className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">No requests found</p>
        <p className="text-sm">Waiting for new requests...</p>
      </div>;
  }
  return <div className="space-y-4">
      {filteredRequests.map(request => <CarCard key={request.id} request={request} onStatusChange={onStatusChange} />)}
    </div>;
}