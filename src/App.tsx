import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ClientScreen } from './pages/ClientScreen';
import { ValetScreen } from './pages/ValetScreen';
import { AdminScreen } from './pages/AdminScreen';
import { Car, User, ShieldCheck } from 'lucide-react';
import { Home } from './pages/Home';
import { CreateEstacionamento } from './pages/CreateEstacionamento';
import { ShowEstacionamento } from './pages/estacionamento/ShowEstacionamento';
import DashboardOcupacao from './pages/estacionamento/Dashboard';
import CriarVagas from './pages/CreateVagas';
import Vagas from './pages/estacionamento/Vagas';
import Checkin from './pages/estacionamento/Checkin';
function RoleSelection() {
  return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Park88
          </h1>
          <p className="text-xl text-slate-600">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/client" className="group">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-500 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <Car className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Client</h2>
              <p className="text-slate-500">
                Request your vehicle and track status
              </p>
            </div>
          </Link>

          <Link to="/valet" className="group">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-500 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                <User className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Valet</h2>
              <p className="text-slate-500">
                Manage queue and update vehicle status
              </p>
            </div>
          </Link>

          <Link to="/admin" className="group">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-500 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-slate-200 transition-colors">
                <ShieldCheck className="w-10 h-10 text-slate-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin</h2>
              <p className="text-slate-500">
                System overview and configuration
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>;
}
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<ClientScreen />} />
        <Route path="/valet" element={<ValetScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        
        <Route path="/create-estacionamento" element={<CreateEstacionamento   />} />
        <Route path="/estacionamentos" element={<ShowEstacionamento   />} />
        <Route path="/deashboard" element={<DashboardOcupacao   />} />
        <Route path="/create-vagas" element={<CriarVagas   />} />
        <Route path="/vagas" element={<Vagas />} />
        
        <Route path="/teste" element={<Checkin   />} />

      </Routes>
    </Router>;
}