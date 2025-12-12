import html2canvas from "html2canvas";
import { RevenueChart } from "../charts/RevenueChart";
import { RevenueTable } from "../tables/RevenueTable";
import { SalesChart } from "../charts/SalesChart";
import { exportStyledPDF } from "../../utils/exportPDF";

export function DashboardExport() {
  const handleExport = async () => {
    //Pega o elemento do dashboard
    const element = document.getElementById("dashboard-area");

    if (!element) return;

    //Transforma o elemento em canvas
    const canvas = await html2canvas(element, { scale: 2 });

    //Converte o canvas em uma imagem base64
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "dashboard.png";
    link.click();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "flex-start",
          marginBottom: 24,
        }}
      >
        <button
          onClick={handleExport}
          style={{
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#388e3c";
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(60, 180, 80, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Exportar PNG
        </button>
        <button
          onClick={() =>
            exportStyledPDF("dashboard-area", {
              title: "Relatório Financeiro",
              subtitle: "Faturamento Previsto x Realizado",
              orientation: "portrait",
              fileName: "relatorio-financeiro.pdf",
              kpis: [
                { label: "Faturamento", value: "R$ 120.000", color: "#6366f1" },
                { label: "Lucro", value: "R$ 38.000", color: "#10b981" },
                { label: "Clientes Ativos", value: "832", color: "#f59e0b" },
                { label: "Tickets Abertos", value: "12", color: "#ef4444" },
              ],
            })
          }
          style={{
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#594cafff",
            color: "white",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#483f83ff";
            e.currentTarget.style.boxShadow = "0 2px 8px #483f834b";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#594cafff";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Exportar PDF
        </button>
      </div>

      <div id="dashboard-area">
        <h1>Faturamento Mensal</h1>
        <SalesChart />
        <h1 style={{ marginTop: "50px" }}>Receita Prevista vs Realizada</h1>
        <RevenueChart />
        <h1 style={{ marginTop: "50px" }}>Tabela</h1>
        <RevenueTable />
      </div>
    </div>
  );
}
