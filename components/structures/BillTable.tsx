"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  if (loading)
    return (
      <Card className="mt-6 rounded-2xl shadow-md">
        <CardContent>
          <p className="italic text-gray-500 dark:text-gray-400">
            Loading last bills...
          </p>
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Card className="mt-6 rounded-2xl shadow-md">
        <CardContent>
          <p className="text-red-500">Error: {error.message}</p>
        </CardContent>
      </Card>
    );

  if (!bills || bills.length === 0) {
    return (
      <Card className="mt-6 rounded-2xl shadow-md">
        <CardContent>
          <p className="italic text-gray-500 dark:text-gray-400">
            No bills found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Last Store Bills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2 overflow-hidden">
            <thead className="font-semibold">
              <tr>
                <th className="px-4 py-2">Document No</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2 text-right">Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.documentNo}
                  className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-muted dark:hover:bg-accent transition-colors"
                >
                  <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200 rounded-l-lg">
                    {bill.documentNo}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    {bill.documentDate
                      ? new Date(
                          bill.documentDate.replace(" ", "T")
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100 rounded-r-lg">
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
      </CardContent>
    </Card>
  );
}
