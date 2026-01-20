import { Pencil, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getVaga } from '../../services/api'

/* ======================= TIPOS ======================= */
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
}

type VagaDetalhada = {
  numero_vaga: string
  tipo_vaga: string
  status_vaga: string
  placa?: string
  modelo?: string
  nome_cliente?: string
}

/* ======================= HELPERS ======================= */
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

const BASE_URL = 'http://192.168.0.10:8080/api/v1/estacionamentos'

/* ======================= COMPONENTE ======================= */
export default function VagasEstacionamento() {
  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([])
  const [estSelecionado, setEstSelecionado] = useState<number | ''>('')
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [loading, setLoading] = useState(false)

  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null)
  const [vagaDetalhada, setVagaDetalhada] = useState<VagaDetalhada | null>(null)
  const [acao, setAcao] = useState<'view' | 'edit' | null>(null)
  const [loadingVaga, setLoadingVaga] = useState(false)

  /* ======================= LOAD ESTACIONAMENTOS ======================= */
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setEstacionamentos(data.data || []))
      .catch(() => setEstacionamentos([]))
  }, [])

  /* ======================= LOAD VAGAS ======================= */
  useEffect(() => {
    if (!estSelecionado) return

    setLoading(true)
    fetch(`${BASE_URL}/${estSelecionado}/vagas`)
      .then(res => res.json())
      .then(data => setVagas(data.data || data.vagas || []))
      .finally(() => setLoading(false))
  }, [estSelecionado])

  /* ======================= RESUMO ======================= */
  const resumo = vagas.reduce(
    (acc, v) => {
      const st = mapStatus(v).key
      acc.total++
      if (st === 'livre') acc.livre++
      if (st === 'ocupada') acc.ocupada++
      if (st === 'reservada') acc.reservada++
      return acc
    },
    { total: 0, livre: 0, ocupada: 0, reservada: 0 }
  )

  /* ======================= AÇÕES ======================= */
  const abrirVisualizacao = async (vaga: Vaga) => {
    if (!vaga.id) return

    setVagaSelecionada(vaga)
    setAcao('view')
    setLoadingVaga(true)

    try {
      const data = await getVaga(vaga.id)
      setVagaDetalhada(data)
    } finally {
      setLoadingVaga(false)
    }
  }

  const abrirEdicao = (vaga: Vaga) => {
    setVagaSelecionada(vaga)
    setAcao('edit')
  }

  const fecharModal = () => {
    setVagaSelecionada(null)
    setVagaDetalhada(null)
    setAcao(null)
  }

  /* ======================= RENDER ======================= */
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

      {/* CARD */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="text-sm text-slate-500 mb-4">
          {loading
            ? 'Carregando...'
            : `Total: ${resumo.total} — Livres: ${resumo.livre} • Ocupadas: ${resumo.ocupada} • Reservadas: ${resumo.reservada}`}
        </div>

        {/* GRID */}
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

      {/* MODAL */}
      {vagaSelecionada && acao && (
        <Modal onClose={fecharModal}>
          {acao === 'view' && (
            <VisualizarVaga vaga={vagaDetalhada} loading={loadingVaga} />
          )}
          {acao === 'edit' && <EditarVaga vaga={vagaSelecionada} />}
        </Modal>
      )}
    </div>
  )
}

/* ======================= AUXILIARES ======================= */

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-5 relative">
        <button onClick={onClose} className="absolute top-3 right-3">✕</button>
        {children}
      </div>
    </div>
  )
}

function VisualizarVaga({
  vaga,
  loading,
}: {
  vaga: VagaDetalhada | null
  loading: boolean
}) {
  if (loading) return <p>Carregando dados...</p>
  if (!vaga) return <p>Dados não encontrados</p>

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Detalhes da Vaga</h2>
      <p><b>Vaga:</b> {vaga.numero_vaga}</p>
      <p><b>Status:</b> {mapStatus(vaga).text}</p>
      <p><b>Tipo:</b> {vaga.tipo_vaga}</p>
      <hr />
      <p><b>Placa:</b> {vaga.placa || '—'}</p>
      <p><b>Modelo:</b> {vaga.modelo || '—'}</p>
      <p><b>Cliente:</b> {vaga.nome_cliente || '—'}</p>
    </div>
  )
}

function EditarVaga({ vaga }: { vaga: Vaga }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Editar Vaga</h2>
      <input className="w-full border p-2 rounded" defaultValue={vaga.numero_vaga} />
      <button disabled className="w-full bg-blue-600 text-white p-2 rounded opacity-50">
        Salvar (API futura)
      </button>
    </div>
  )
}
