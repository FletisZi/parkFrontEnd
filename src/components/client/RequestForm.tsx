import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Car } from 'lucide-react';
interface RequestFormProps {
  onSubmit: (licensePlate: string) => void;
  isLoading: boolean;
}
export function RequestForm({
  onSubmit,
  isLoading
}: RequestFormProps) {
  const [plate, setPlate] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate.trim()) {
      setError('Please enter your license plate');
      return;
    }
    if (plate.length < 3) {
      setError('License plate must be at least 3 characters');
      return;
    }
    onSubmit(plate.toUpperCase());
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    // Allow only alphanumeric and hyphens
    if (/^[A-Z0-9-]*$/.test(value)) {
      setPlate(value);
      setError('');
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Request Your Vehicle
        </h2>
        <p className="text-slate-600 mt-2">
          Enter your license plate number to begin
        </p>
      </div>

      <div className="space-y-4">
        <Input label="License Plate" placeholder="ABC-1234" value={plate} onChange={handleChange} error={error} className="text-center text-2xl tracking-widest uppercase font-mono h-14" maxLength={10} />

        <Button type="submit" className="w-full h-14 text-lg" isLoading={isLoading}>
          Request Vehicle
        </Button>
      </div>

      <p className="text-xs text-center text-slate-400 mt-6">
        By requesting, you agree to our terms of service.
      </p>
    </form>;
}