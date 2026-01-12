import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
export function SearchBar() {
  return <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Input placeholder="Search by license plate (e.g. ABC-1234)..." className="pl-12 h-12 text-lg shadow-sm border-slate-200 focus:border-blue-500" leftIcon={<Search className="w-5 h-5 text-slate-400" />} />
      </div>
    </div>;
}