import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { RequestForm } from '../components/client/RequestForm';
import { QueueStatus } from '../components/client/QueueStatus';
import { ParkingRequest } from '../types';
export function ClientScreen() {
  const [request, setRequest] = useState<ParkingRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Mock function to simulate API call
  const handleRequest = (licensePlate: string) => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const newRequest: ParkingRequest = {
        id: Math.random().toString(36).substr(2, 9),
        licensePlate,
        status: 'pending',
        locationId: 'loc-1',
        timestamp: new Date(),
        estimatedWaitMinutes: 12,
        queuePosition: 4
      };
      setRequest(newRequest);
      setIsLoading(false);
      // Simulate status updates for demo
      simulateStatusUpdates(newRequest);
    }, 1500);
  };
  const simulateStatusUpdates = (req: ParkingRequest) => {
    // After 5 seconds, move to picking up
    setTimeout(() => {
      setRequest(prev => prev ? {
        ...prev,
        status: 'picking_up',
        estimatedWaitMinutes: 5,
        queuePosition: 1
      } : null);
    }, 5000);
    // After 10 seconds, move to arrived
    setTimeout(() => {
      setRequest(prev => prev ? {
        ...prev,
        status: 'arrived',
        estimatedWaitMinutes: 0,
        queuePosition: 0
      } : null);
    }, 10000);
  };
  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel your request?')) {
      setRequest(null);
    }
  };
  return <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl border-0">
        {!request ? <RequestForm onSubmit={handleRequest} isLoading={isLoading} /> : <QueueStatus request={request} onCancel={handleCancel} />}
      </Card>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-blue-600 rounded-b-[3rem] shadow-lg" />
      </div>
    </div>;
}