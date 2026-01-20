const API_BASE = "http://192.168.0.10:8080/api/v1";

export async function getEstacionamentos() {
  const res = await fetch(`${API_BASE}/estacionamentos`);
  return res.json();
}

export async function getVagas(estId: number) {
  const res = await fetch(`${API_BASE}/estacionamentos/${estId}/vagas`);
  return res.json();
}

export async function criarVaga(payload: any) {
  return fetch(`${API_BASE}/vagas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function getVaga(vagaId: number) {
  const res = await fetch(`${API_BASE}/vagas/${vagaId}`)
  if (!res.ok) throw new Error('Erro ao buscar vaga')
  const json = await res.json()
  return json.data
}