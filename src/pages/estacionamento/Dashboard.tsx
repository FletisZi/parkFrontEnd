import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { NavBar } from "../../components/ui/NavBar";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DashboardOcupacao() {
  const [labels, setLabels] = useState([]);
  const [ocupacoes, setOcupacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://192.168.0.10:8080/api/v1/estacionamentos";

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();

        const estacionamentos = json.data;

        const nomes = [];
        const percentuais = [];

        estacionamentos.forEach(est => {
          nomes.push(est.nome);

          let percentual = 0;
          if (est.total_vagas > 0) {
            percentual = (est.ocupacao / est.total_vagas) * 100;
          }

          percentuais.push(Number(percentual.toFixed(2)));
        });

        setLabels(nomes);
        setOcupacoes(percentuais);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Carregando dados...</span>
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Ocupação (%)",
        data: ocupacoes,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: value => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <NavBar />
      <div className="w-full bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Ocupação dos Estacionamentos
            </h2>

            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
    
  );
}
