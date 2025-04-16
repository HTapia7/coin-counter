import CoinTossPieChart from "@/components/CoinTossPieChart"; // Adjust path if needed
import TableData from "@/components/TableData.jsx";

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Graph Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Graph 1: Coin Toss Pie Chart */}
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow">
          <CoinTossPieChart heads={10} tails={5} />
        </div>

        {/* Graph 2 Placeholder */}
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow">
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            Graph 2
          </div>
        </div>

        {/* Graph 3 Placeholder */}
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow">
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            Graph 3
          </div>
        </div>
      </div>

      {/* Table Section (optional) */}
      <div className="mt-6">
        <TableData />
      </div>
    </div>
  );
}
