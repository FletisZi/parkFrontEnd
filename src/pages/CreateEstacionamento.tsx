import { useState } from "react";
import { NavBar } from "../components/ui/NavBar";

export function CreateEstacionamento() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://192.168.0.10:8080/api/v1/estacionamentos",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: nome,
            endereco: endereco
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar estacionamento");
      }

      await response.json();

      setMessage("Estacionamento criado com sucesso!");
      setNome("");
      setEndereco("");
    } catch (err) {
      setError("Não foi possível criar o estacionamento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="ml-72 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Create Estacionamento
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Estacionamento
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white 
              ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {isLoading ? "Criando..." : "Criar Estacionamento"}
          </button>

          {message && (
            <div className="text-green-600 font-medium mt-4">
              {message}
            </div>
          )}

          {error && (
            <div className="text-red-600 font-medium mt-4">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
