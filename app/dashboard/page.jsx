import CoinTossPieChart from "@/components/CoinTossPieChart";
import WinLossChart from "@/components/WinLossPieChart";
import TableData from "@/components/TableData.jsx";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-10">
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coin Toss Chart */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow p-6 flex flex-col items-center justify-center h-[340px]">
         
          <CoinTossPieChart />
        </div>

        {/* Win/Loss Chart */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow p-6 flex flex-col items-center justify-center h-[340px]">
         
          <WinLossChart />
        </div>

        {/* Placeholder for Chart 3 */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow p-6 flex items-center justify-center h-[340px] text-gray-500 dark:text-gray-400 text-center">
          Graph 3
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8">
        <TableData />
      </div>
    </div>
  );
}
