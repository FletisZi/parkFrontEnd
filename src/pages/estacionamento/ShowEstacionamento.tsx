import { useEffect, useState } from "react";
import { NavBar } from "../../components/ui/NavBar";

const API_URL = "http://192.168.0.10:8080/api/v1/estacionamentos";

export function ShowEstacionamento() {
  const [estacionamentos, setEstacionamentos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");

  // 🔹 Carregar lista
  useEffect(() => {
    carregarEstacionamentos();
  }, []);

  const carregarEstacionamentos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEstacionamentos(data.data);
  };

  // 🔹 Abrir modal
  const abrirModal = (est) => {
    setSelectedId(est.id_estacionamento);
    setNome(est.nome);
    setEndereco(est.endereco);
    setIsOpen(true);
  };

  // 🔹 Salvar edição
  const salvar = async () => {
    await fetch(`${API_URL}/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, endereco }),
    });

    setIsOpen(false);
    carregarEstacionamentos();
  };

  return (
    <div>
      <NavBar />

      <div className="ml-72 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Lista de Estacionamentos
        </h1>

        {/* Lista */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {estacionamentos.map((est) => (
            <div
              key={est.id_estacionamento}
              onClick={() => abrirModal(est)}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:scale-[1.02] transition"
            >
              <strong className="block text-lg">{est.nome}</strong>
              <p className="text-gray-600">{est.endereco}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[350px]">
            <h2 className="text-xl font-semibold mb-4">
              Editar Estacionamento
            </h2>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              className="w-full border rounded p-2 mb-3"
            />

            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço"
              className="w-full border rounded p-2 mb-4"
            />

            <button
              onClick={salvar}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Salvar
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-gray-300 mt-2 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
