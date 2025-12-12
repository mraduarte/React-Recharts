import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { salesData } from "../../data/sales";
import { formatCompact, formatBRL } from "../../utils/formatStrings/currency";

export function SalesChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => formatCompact(v)} />
          <Tooltip formatter={(value) => formatBRL(Number(value))} />{" "}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#e546b3ff"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
