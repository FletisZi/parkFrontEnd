import React from 'react';
import { ParkingRequest } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Clock, MapPin, Car, AlertTriangle } from 'lucide-react';
interface CarCardProps {
  request: ParkingRequest;
  onStatusChange: (id: string, status: ParkingRequest['status']) => void;
}
export function CarCard({
  request,
  onStatusChange
}: CarCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="neutral">Pending</Badge>;
      case 'accepted':
        return <Badge variant="info">Accepted</Badge>;
      case 'picking_up':
        return <Badge variant="warning">Picking Up</Badge>;
      case 'arrived':
        return <Badge variant="success">Arrived</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };
  const getActionButtons = () => {
    switch (request.status) {
      case 'pending':
        return <Button size="sm" onClick={() => onStatusChange(request.id, 'accepted')}>
            Accept Request
          </Button>;
      case 'accepted':
        return <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => onStatusChange(request.id, 'picking_up')}>
              Start Pickup
            </Button>
            <Button size="sm" variant="ghost" className="text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </Button>
          </div>;
      case 'picking_up':
        return <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => onStatusChange(request.id, 'arrived')}>
            Mark Arrived
          </Button>;
      case 'arrived':
        return <Button size="sm" variant="success" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => onStatusChange(request.id, 'completed')}>
            Complete
          </Button>;
      default:
        return null;
    }
  };
  // Calculate time elapsed (mock)
  const timeElapsed = Math.floor((new Date().getTime() - request.timestamp.getTime()) / 1000 / 60);
  return <Card className="hover:shadow-md transition-shadow duration-200" noPadding>
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Info */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Car className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold font-mono text-slate-900">
                {request.licensePlate}
              </span>
              {getStatusBadge(request.status)}
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {timeElapsed}m ago
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Spot {request.spotNumber || 'Unassigned'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {getActionButtons()}
        </div>
      </div>
    </Card>;
}