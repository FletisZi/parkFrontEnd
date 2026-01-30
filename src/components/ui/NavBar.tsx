import { ArrowLeftToLine, ChevronDown, CircleParking, FilePen, LayoutGridIcon } from "lucide-react";
import { useState } from "react";

export function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function toggleMenu(menu: string) {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }

  return (
    <header
      className={`
        fixed z-[100] top-[1%]
        sm:static sm:z-auto sm:top-auto

        my-auto mx-[4px] h-[98%] 
        rounded-xl bg-gradient-to-b from-[#04093a] to-[#000647]
        text-white text-sm font-medium
        transition-all duration-300
        font-montserrat
        ${ collapsed ? `
          h-[3rem] w-[3rem] rounded-full
          sm:h-[98%] sm:w-24 sm:rounded-xl`: 
          ` h-[98%] w-64 rounded-xl`
        }
      `}
    >
      {/* BOTÃO RECOLHER */}
      <div className="flex justify-end p-3">
        <button onClick={() => setCollapsed(!collapsed)}>
            <ArrowLeftToLine className={`w-5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}/>

        </button>
      </div>

      {/* MENU */}
      <nav className="px-4">
        <ul className="space-y-4">

          {/* DASHBOARD */}
          <li>
            <a
              href="/deashboard"
              className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-blue-800/40"
            >
              <LayoutGridIcon className="w-5 "/>
              
              {!collapsed && "Dashboard"}
            </a>
          </li>

          {/* CREATE */}
          <li>
            <button
              onClick={() => toggleMenu("create")}
              className="flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-blue-800/40"
            >
              <FilePen className="w-5 "/>  
              
              {!collapsed && (
                <span className="flex w-full justify-between items-center">
                  Create
                  <ChevronDown 
                    className={`w-4 transition-transform ${
                      openMenu === "create" ? "rotate-180" : ""
                    }`} />
                  
                </span>
              )}
            </button>

            {/* SUBMENU */}
            <ul
              className={`
                ml-8 overflow-hidden transition-all duration-300
                ${openMenu === "create" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              
              <li><a href="#create-user" className="block py-1">• Criar Usuário</a></li>
              <li><a href="/create-vagas" className="block py-1">• Criar Vaga</a></li>
              <li><a href="/create-estacionamento" className="block py-1">• Criar Estacionamento</a></li>
            </ul>
          </li>

          {/* ESTACIONAMENTOS */}
          <li>
            <button
              onClick={() => toggleMenu("parking")}
              className="flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-blue-800/40"
            >
              <CircleParking className="w-5" />

              {!collapsed && (
                <span className="flex w-full justify-between items-center">
                  Estacionamentos
 
                  <ChevronDown 
                    className={`w-4 transition-transform ${
                        openMenu === "parking" ? "rotate-180" : ""
                    }`} />  
                </span>
              )}
            </button>

            <ul
              className={`
                ml-8 overflow-hidden transition-all duration-300
                ${openMenu === "parking" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <li><a href="/vagas" className="block py-1">• Vagas</a></li>
              <li><a href="/estacionamentos" className="block py-1">• Editar</a></li>
              <li><a href="#relatorios" className="block py-1">• Relatórios</a></li>
            </ul>
          </li>

        </ul>
      </nav>
    </header>
  );
}
