import { NavBar } from "../../components/ui/NavBar"
import DashboardOcupacao from "./Dashboard"

export function HomeDeashboard() {
    return 
      <div>
          <NavBar />
          <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-5xl mx-auto">
              <DashboardOcupacao />
            </div>
          </div>
        </div>
}