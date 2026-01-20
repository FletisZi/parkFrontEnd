import { useEffect, useState } from "react";
import { criarVaga, getEstacionamentos, getVagas } from "../services/api";
import { NavBar } from "../components/ui/NavBar";

type Estacionamento = {
  id_estacionamento: number;
  nome: string;
  endereco: string;
};

export default function CriarVagas() {
  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
  const [estId, setEstId] = useState<number | "">("");
  const [vagasExistentes, setVagasExistentes] = useState<string[]>([]);
  const [modo, setModo] = useState("simples");
  const [tipo, setTipo] = useState("normal");
  const [numero, setNumero] = useState("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    getEstacionamentos().then(res => setEstacionamentos(res.data));
  }, []);

  useEffect(() => {
    if (estId) {
      getVagas(estId).then(res =>
        setVagasExistentes(res.vagas.map((v: any) => v.numero_vaga))
      );
    }
  }, [estId]);

  async function criarSimples() {
    if (!estId || !numero) return alert("Preencha os campos");

    if (vagasExistentes.includes(numero)) {
      return alert("Vaga já existe");
    }

    setLoading(true);

    await criarVaga({
      id_estacionamento: estId,
      numero_vaga: numero,
      tipo_vaga: tipo,
      status_vaga: "livre",
      observacao: null,
    });

    setVagasExistentes(prev => [...prev, numero]);
    setNumero("");
    setLoading(false);
    setMensagem("Vaga criada com sucesso");
  }

  async function criarSequencial() {
    if (!estId || quantidade <= 0) return alert("Preencha os campos");

    setLoading(true);

    for (let i = 1; i <= quantidade; i++) {
      const num = i.toString();
      if (vagasExistentes.includes(num)) continue;

      await criarVaga({
        id_estacionamento: estId,
        numero_vaga: num,
        tipo_vaga: tipo,
        status_vaga: "livre",
        observacao: null,
      });
    }

    setLoading(false);
    setMensagem("Vagas criadas com sucesso");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <NavBar />
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Criar Vagas</h1>

        <select
          className="w-full p-2 border rounded"
          value={estId}
          onChange={e => setEstId(Number(e.target.value))}
        >
          <option value="">Selecione o estacionamento</option>
          {estacionamentos.map(e => (
            <option key={e.id_estacionamento} value={e.id_estacionamento}>
              {e.nome} - {e.endereco}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="gerencia">Gerência</option>
          <option value="PCD">PCD</option>
          <option value="carga/descarga">Carga/Descarga</option>
          <option value="suporte">Suporte</option>
        </select>

        <select
          className="w-full p-2 border rounded"
          value={modo}
          onChange={e => setModo(e.target.value)}
        >
          <option value="simples">Simples</option>
          <option value="sequencial">Sequencial</option>
        </select>

        {modo === "simples" && (
          <>
            <input
              className="w-full p-2 border rounded"
              placeholder="Número da vaga"
              value={numero}
              onChange={e => setNumero(e.target.value)}
            />
            <button
              disabled={loading}
              onClick={criarSimples}
              className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Criar vaga"}
            </button>
          </>
        )}

        {modo === "sequencial" && (
          <>
            <input
              type="number"
              min={1}
              className="w-full p-2 border rounded"
              value={quantidade}
              onChange={e => setQuantidade(Number(e.target.value))}
            />
            <button
              disabled={loading}
              onClick={criarSequencial}
              className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Criar vagas"}
            </button>
          </>
        )}

        {mensagem && <p className="text-green-600">{mensagem}</p>}
      </div>
    </div>
  );
}
