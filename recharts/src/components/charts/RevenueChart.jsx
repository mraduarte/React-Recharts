import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { revenueData } from "../../data/revenue";
import { formatCompact, formatBRL } from "../../utils/formatStrings/currency";

export function RevenueChart() {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={revenueData} margin={{ left: 20, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => formatCompact(v)} />

          <Tooltip content={<CustomTooltip />} />

          <Legend />

          <defs>
            <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
            </linearGradient>

            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.2} />
            </linearGradient>

            <linearGradient id="testeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b94e10ff" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#b94e10ff" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="planned"
            name="Previsto"
            stroke="url(#plannedGradient)"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />

          <Line
            type="monotone"
            dataKey="actual"
            name="Realizado"
            stroke="url(#actualGradient)"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />

          <Line
            type="monotone"
            dataKey="teste"
            name="Teste"
            stroke="url(#testeGradient)"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div
      style={{
        background: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        padding: "10px 14px",
        fontSize: "14px",
      }}
    >
      <strong style={{ display: "block", marginBottom: 6 }}>{label}</strong>

      {payload.map((item) => (
        <div key={item.name} style={{ marginBottom: 4 }}>
          <span style={{ color: item.color }}>{item.name}:</span>{" "}
          <strong>{formatBRL(item.value)}</strong>
        </div>
      ))}
    </div>
  );
};

const CustomDot = (props) => {
  const { cx, cy, stroke } = props;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="white"
      stroke={stroke}
      strokeWidth={3}
    />
  );
};
