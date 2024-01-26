import { useMemo } from "react";

type Transaction = {
  datetime: string;
  type: string;
  amount: string;
};

type MonthlySummary = {
  month: string;
  totalCredits: number;
  totalDebits: number;
  totalProfit: number;
};

function summarizeTransactions(transactions: Transaction[]): MonthlySummary[] {
  const monthlySums: { [key: string]: MonthlySummary } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.datetime);
    const monthYear = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    if (isNaN(date.getTime())) {
      return;
    }
    const amount = parseFloat(transaction.amount);

    if (!monthlySums[monthYear]) {
      monthlySums[monthYear] = {
        month: monthYear,
        totalCredits: 0,
        totalDebits: 0,
        totalProfit: 0,
      };
    }

    if (transaction.type === "CREDIT") {
      monthlySums[monthYear].totalCredits += amount;
    } else if (transaction.type === "DEBIT") {
      // デビット（支出）は正の値として処理
      monthlySums[monthYear].totalDebits += Math.abs(amount);
    }

    // 利益 = 収入 - 支出
    monthlySums[monthYear].totalProfit =
      monthlySums[monthYear].totalCredits - monthlySums[monthYear].totalDebits;
  });

  return Object.values(monthlySums);
}

function Table({ data }: { data: unknown[] }) {
  const summary = useMemo(() => {
    return summarizeTransactions(data as Transaction[]);
  }, [data]);
  return (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
            }}
          >
            Month
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
            }}
          >
            Total Credits
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
            }}
          >
            Total Debits
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
            }}
          >
            Total Profit
          </th>
        </tr>
      </thead>
      <tbody>
        {summary.map((row) => (
          <tr key={JSON.stringify(row)}>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              {row.month}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              {row.totalCredits.toFixed(2)}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              {row.totalDebits.toFixed(2)}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              {row.totalProfit.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { Table };
