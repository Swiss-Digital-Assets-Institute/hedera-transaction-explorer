"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Creates a transaction interface
interface Transaction {
  transaction_id: string;
  name: string;
  transfers: string;
  consensus_timestamp: string;
  result: string;
}

// Creates the prop data
interface TransactionGraphProps {
  data: Transaction[];
}

/*
    This component returns the graph of the transactions based on the data it receives
    It then transforms said data as a Transaction interface and can iterate and group it.
*/
const TransactionsGraph: React.FC<TransactionGraphProps> = ({ data }) => {
  const groupedTransactions: {
    [key: string]: { [key: string]: { success: number; failed: number } };
  } = {};

  // Group transactions by day and name, add if failed or success to count
  data.forEach((transaction) => {
    const timestamp = new Date(transaction.consensus_timestamp);
    const day = timestamp.toISOString().split("T")[0];

    // Checks if there are any transactions for that day, if not empty object
    if (!groupedTransactions[day]) {
      groupedTransactions[day] = {};
    }

    // Checks if there are any transaction type on said day, if not then it puts that day to 0
    if (!groupedTransactions[day][transaction.name]) {
      groupedTransactions[day][transaction.name] = { success: 0, failed: 0 };
    }

    // Adds one to the count to either success or failed depending on result
    if (transaction.result === "SUCCESS") {
      groupedTransactions[day][transaction.name].success++;
    } else {
      groupedTransactions[day][transaction.name].failed++;
    }
  });

  // Map the grouped transactions to generate the series data
  const chartData = Object.keys(groupedTransactions)
    .map((day) => {
      return {
        name: day,
        ...Object.entries(groupedTransactions[day]).reduce(
          (acc, [name, { success, failed }]) => {
            acc[`${name}_Success`] = success;
            acc[`${name}_Failed`] = failed;
            return acc;
          },
          {} as Record<string, number>
        ),
      };
    })
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const series = Object.keys(groupedTransactions).reduce((acc, day) => {
    Object.entries(groupedTransactions[day]).forEach(([name]) => {
      const successLabel = `${name} (Success)`;
      const failedLabel = `${name} (Failed)`;
      // Check if success and failure exist in series
      const successExists = acc.some((s) => s.label === successLabel);
      const failedExists = acc.some((s) => s.label === failedLabel);
      // If not add them to the series
      if (!successExists) {
        acc.push({
          label: successLabel,
          stack: name,
          dataKey: `${name}_Success`,
        });
      }
      if (!failedExists) {
        acc.push({
          label: failedLabel,
          stack: name,
          dataKey: `${name}_Failed`,
        });
      }
    });
    return acc;
  }, [] as { label: string; stack: string; dataKey: string }[]);

  // TODO add dynamic size rendering to table
  return (
    <Card
      className="
            bg-slate-200
            mt-4
            rounded-xl
            shadow-[0_2px_2px]
            shadow-cyan-600
            items-center
            min-w-[300px]
        "
    >
      <CardHeader>
        <CardTitle>Transfers graphs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <BarChart
            dataset={chartData}
            xAxis={[{ scaleType: "band", dataKey: "name" }]}
            yAxis={[{ scaleType: "linear", dataKey: "left" }]}
            series={series}
            width={800}
            height={600}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsGraph;
