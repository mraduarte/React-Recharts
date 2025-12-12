import "./App.css";
import { DashboardExport } from "./components/export/DashboardExport";

function App() {
  return (
    <div className="App" style={{ margin: 50 }}>
      {/* <h1>Faturamento Mensal</h1>
      <SalesChart />
      <h1 style={{ marginTop: "50px" }}>Receita Prevista vs Realizada</h1>
      <RevenueChart />
      <h1 style={{ marginTop: "50px" }}>Tabela</h1>
      <RevenueTable /> */}
      <DashboardExport/>
    </div>
  );
}

export default App;
