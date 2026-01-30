import { useEffect, useState } from "react";
import { getEstacionamentos, getVagas } from "../../services/api";

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

export default function Checkin() {
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

        getVagas(estSelecionado).then(data => {
            setVagas(data.data || data.vagas || [])

        }).finally(() => setLoading(false))

    }, [estSelecionado])
    
    {console.log(vagas)}
    return(
        
        <div className="mt-12 w-full flex items-center gap-4 mb-5 flex-wrap justify-between">
              <div >
                
                <h1 className="text-xl font-bold">Vagas do Estacionamento</h1>
                <p className="text-sm text-slate-500">
                    {estSelecionado
                    ? estacionamentos.find(e => e.id_estacionamento === estSelecionado)?.nome
                    : 'Selecione um estacionamento'}
                </p>
              </div>
  
              <select
              className=" border rounded-lg p-2 min-w-[260px]"
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
    );
}