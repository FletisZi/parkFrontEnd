import React, { useState } from 'react';
import { ParkingLotManager } from '../components/admin/ParkingLotManager';
import { SpotManager } from '../components/admin/SpotManager';
import { ReportsView } from '../components/admin/ReportsView';
import { SearchBar } from '../components/admin/SearchBar';
import { LayoutDashboard, Map, BarChart3, Settings, LogOut } from 'lucide-react';
import { NavBar } from '../components/ui/NavBar';
export function AdminScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div className="space-y-8 animate-fade-in">
            <SearchBar />
            <ReportsView />
            <ParkingLotManager />
          </div>;
      case 'spots':
        return <div className="space-y-8 animate-fade-in">
            <SpotManager />
          </div>;
      case 'settings':
        return <div className="flex items-center justify-center h-64 text-slate-400">
            Settings panel placeholder
          </div>;
      default:
        return null;
    }
  };
  const navItems = [{
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard
  }, {
    id: 'spots',
    label: 'Spot Management',
    icon: Map
  }, {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }];
  return <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <NavBar />
      
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 md:min-h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-white font-bold text-lg">ParkAdmin</span>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${activeTab === item.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}
                `}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>)}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-900 capitalize">
            {navItems.find(i => i.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <span className="text-sm font-medium text-slate-700">
              Admin User
            </span>
          </div>
        </header>

        <div className="p-8">{renderContent()}</div>
      </main>
    </div>;
}