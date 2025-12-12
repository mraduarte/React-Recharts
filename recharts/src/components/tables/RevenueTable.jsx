import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { revenueData } from "../../data/revenue";
import { formatMoney } from "../../utils/formatStrings/currency";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("month", {
    header: "Mês",
  }),
  columnHelper.accessor("planned", {
    header: "Previsto",
    cell: (info) => formatMoney(info.getValue()),
  }),
  columnHelper.accessor("actual", {
    header: "Realizado",
    cell: (info) => formatMoney(info.getValue()),
  }),
];

export function RevenueTable() {
  const table = useReactTable({
    data: revenueData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse", border: "1px solid #ccc" }}>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id} style={{ textAlign: "center", padding: 8, verticalAlign: "middle", border: "1px solid #ccc", background: "#f9f9f9" }}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} style={{ textAlign: "center", padding: 8, verticalAlign: "middle", border: "1px solid #ccc" }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
