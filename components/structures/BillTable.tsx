"use client";

interface Bill {
  documentNo: string;
  totalRetailing: number;
  documentDate: string;
}

interface BillTableProps {
  bills: Bill[];
  loading: boolean;
  error: any;
}

export function BillTable({ bills, loading, error }: BillTableProps) {
  if (loading) return <p>Loading last bills...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  if (!bills || bills.length === 0) {
    return <p>No bills found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Document No
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Date
            </th>
            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {bills.map((bill) => (
            <tr key={bill.documentNo}>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                {bill.documentNo}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                {bill.documentDate
                  ? new Date(
                      bill.documentDate.replace(" ", "T")
                    ).toLocaleDateString("en-IN")
                  : "-"}
              </td>
              <td className="px-4 py-2 text-sm text-right text-gray-800 dark:text-gray-200 font-medium">
                {bill.totalRetailing.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
