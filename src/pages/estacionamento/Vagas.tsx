import { useEffect, useState } from "react"
import { getEstacionamentos, getVagas } from "../../services/api"
import { Pencil, Search } from "lucide-react"

type Estacionamento = {
  id_estacionamento: number
  nome: string
}


type Vaga = {
  id?: number
  numero_vaga?: string | number
  numero?: string | number
  status_vaga?: string
  status?: string
  estado?: string
  situacao?: string
  tipo_vaga?: string
  tipo?: string
  placa?: string
  modelo?: string
  nome_cliente?: string
}

export default function VagasTeste() {
  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([])
  const [estSelecionado, setEstSelecionado] = useState<number | ''>('')
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getEstacionamentos().then(data => {
      setEstacionamentos(data.data || [])
    })
  }, [])

  useEffect(() => {
      if (!estSelecionado) return
  
      setLoading(true)

      getVagas(estSelecionado).then(data => {
        setVagas(data.data || data.vagas || [])
      }).finally(() => setLoading(false))

    }, [estSelecionado])
  

  const normalize = (s?: string) => String(s || '').toLowerCase()

  const mapStatus = (v: Partial<Vaga>) => {
  const raw = normalize(
      v.status_vaga || v.status || v.estado || v.situacao
  )

  if (raw.includes('ocup')) return { key: 'ocupada', text: 'Ocupada', cls: 'bg-red-100 text-red-600' }
  if (raw.includes('reserv')) return { key: 'reservada', text: 'Reservada', cls: 'bg-yellow-100 text-yellow-600' }
  if (raw.includes('manut')) return { key: 'manut', text: 'Manutenção', cls: 'bg-yellow-100 text-yellow-600' }
  if (raw.includes('sinist')) return { key: 'sinistro', text: 'Sinistro', cls: 'bg-purple-100 text-purple-600' }
  if (raw.includes('remov')) return { key: 'removida', text: 'Removida', cls: 'bg-slate-100 text-slate-600' }

  return { key: 'livre', text: 'Livre', cls: 'bg-green-100 text-green-600' }
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
        {/* HEADER */}

        <div className="flex items-center gap-4 mb-5">
            <div>
            <h1 className="text-xl font-bold">Vagas do Estacionamento</h1>
            <p className="text-sm text-slate-500">
                {estSelecionado
                ? estacionamentos.find(e => e.id_estacionamento === estSelecionado)?.nome
                : 'Selecione um estacionamento'}
            </p>
            </div>

            <select
            className="ml-auto border rounded-lg p-2 min-w-[260px]"
            value={estSelecionado}
            onChange={e => setEstSelecionado(Number(e.target.value))}
            >
            <option value="">Selecione...</option>
            {estacionamentos.map(est => (
                <option key={est.id_estacionamento} value={est.id_estacionamento}>
                {est.nome}
                </option>
            ))}
            </select>
            
        </div>

        {/* LISTA DE VAGAS */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
          {vagas.map((v, i) => {
            const st = mapStatus(v)

            return (
              <div
                key={i}
                className="relative group border rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-slate-100 transition"
              >
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 rounded-xl">
                  <button onClick={() => abrirVisualizacao(v)} className="bg-white p-2 rounded">
                    <Search size={16} />
                  </button>
                  <button onClick={() => abrirEdicao(v)} className="bg-white p-2 rounded">
                    <Pencil size={16} />
                  </button>
                </div>

                <div className="font-bold">
                  {v.numero_vaga || v.numero || v.id}
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${st.cls}`}>
                  {st.text}
                </span>

                <div className="text-xs text-slate-500">
                  {v.tipo_vaga || v.tipo}
                </div>
              </div>
            )
          })}
        </div>
    </div>
      
  )
}
