"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { DatePickerRange } from "../date-pickers/DatePickerRange";
import { consensusTimestampToDate } from "@/utils/consensusTimestampToDate";

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
  const [filteredChartData, setFilteredhartData] = useState<any[]>([]);

  // Set the last and first time stamps to date values and string values
  const lastConsensusTimestamp: string =
    data.length > 0
      ? data[data.length - 1].consensus_timestamp
      : new Date().toISOString().split("T")[0];
  const firstConsensusTimestamp: string =
    data.length > 0
      ? data[0].consensus_timestamp
      : new Date().toISOString().split("T")[0];
  const lastConsensusTimestampDate = consensusTimestampToDate(
    lastConsensusTimestamp
  );
  const firstConsensusTimestampDate = consensusTimestampToDate(
    firstConsensusTimestamp
  );

  // Sets the starting and end dates by default to the data provided
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    lastConsensusTimestampDate
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    firstConsensusTimestampDate
  );

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

  // Sets end and start date based on call
  const handleDateRangeChange = (selectedDateRange: string) => {
    const [start, end] = selectedDateRange.split(" - ");

    const startDateRaw = start.split("/");
    const startYear = parseInt(startDateRaw[2]);
    const startMonth = parseInt(startDateRaw[0]) - 1;
    const startDay = parseInt(startDateRaw[1]);
    const startDate = new Date(startYear, startMonth, startDay, 0, 0, 0);

    const endDateRaw = end.split("/");
    const endYear = parseInt(endDateRaw[2]);
    const endMonth = parseInt(endDateRaw[0]) - 1;
    const endDay = parseInt(endDateRaw[1]);
    const endDate = new Date(endYear, endMonth, endDay, 0, 0, 0);

    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  // Updates the filters and then filters the table based upon the values
  useEffect(() => {
    const minDate = selectedStartDate
      ? selectedStartDate.toISOString().split("T")[0]
      : lastConsensusTimestamp;
    const maxDate = selectedEndDate
      ? selectedEndDate.toISOString().split("T")[0]
      : firstConsensusTimestamp;

    const filteredData = chartData.filter((dataItem) => {
      const date = dataItem.name;
      return date >= minDate && date <= maxDate;
    });

    setFilteredhartData(filteredData);
  }, [selectedStartDate, selectedEndDate]);

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
            dataset={filteredChartData}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "name",
              },
            ]}
            yAxis={[{ scaleType: "linear", dataKey: "left" }]}
            series={series}
            width={800}
            height={600}
          />
        </div>
        <div>
          <p className="font-bold text-lg mb-5">Filters</p>
          <DatePickerRange
            value={firstConsensusTimestamp}
            onChange={handleDateRangeChange}
            firstValue={lastConsensusTimestamp}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsGraph;
