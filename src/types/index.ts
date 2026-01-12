export type RequestStatus = 'pending' | 'accepted' | 'picking_up' | 'arrived' | 'completed' | 'cancelled';
export interface ParkingRequest {
  id: string;
  licensePlate: string;
  status: RequestStatus;
  locationId: string;
  timestamp: Date;
  estimatedWaitMinutes?: number;
  queuePosition?: number;
  spotNumber?: string;
}
export interface ParkingLot {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  status: 'active' | 'maintenance' | 'closed';
}
export interface ParkingSpot {
  id: string;
  number: string;
  status: 'available' | 'occupied' | 'blocked';
  locationId: string;
}
export interface UserRole {
  id: 'client' | 'valet' | 'admin';
  label: string;
}