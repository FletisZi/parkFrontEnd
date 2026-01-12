import React from 'react';
import { Button } from '../ui/Button';
import { Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { ParkingRequest } from '../../types';
interface QueueStatusProps {
  request: ParkingRequest;
  onCancel: () => void;
}
export function QueueStatus({
  request,
  onCancel
}: QueueStatusProps) {
  const isReady = request.status === 'arrived' || request.status === 'completed';
  const isPickingUp = request.status === 'picking_up';
  return <div className="text-center space-y-8 animate-fade-in">
      {/* Status Header */}
      <div className="space-y-2">
        {isReady ? <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div> : <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-blue-600 animate-pulse" />
          </div>}

        <h2 className="text-2xl font-bold text-slate-900">
          {isReady ? 'Your car is ready!' : isPickingUp ? 'Valet is on the way' : 'You are in queue'}
        </h2>
        <p className="text-slate-600">
          License Plate:{' '}
          <span className="font-mono font-bold text-slate-900">
            {request.licensePlate}
          </span>
        </p>
      </div>

      {/* Info Cards */}
      {!isReady && <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Position</p>
            <p className="text-3xl font-bold text-blue-600">
              #{request.queuePosition}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Est. Wait</p>
            <p className="text-3xl font-bold text-slate-900">
              {request.estimatedWaitMinutes}
              <span className="text-sm font-normal text-slate-500 ml-1">
                min
              </span>
            </p>
          </div>
        </div>}

      {isReady && <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <p className="text-green-800 font-medium flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" />
            Please proceed to the pickup zone
          </p>
        </div>}

      {/* Actions */}
      <div className="pt-4">
        {!isReady && request.status !== 'picking_up' && <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={onCancel}>
            Cancel Request
          </Button>}
        {isReady && <p className="text-sm text-slate-500">
            Have a safe trip! The valet has handed over the keys.
          </p>}
      </div>
    </div>;
}