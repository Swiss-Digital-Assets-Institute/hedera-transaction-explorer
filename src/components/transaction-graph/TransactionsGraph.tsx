"use client";

import { consensusTimestampToDate } from "@/utils/consensusTimestampToDate";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { DatePickerRange } from "../date-pickers/DatePickerRange";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { logErrorToFile } from "@/utils/errorLogging";

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
  const [filteredChartData, setFilteredChartData] = useState<any[]>([]);

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

  // Declares empty array for all the filters
  let transactionFilters: string[] = [];
  const [transactionTypeFilter, setTransactionTypeFilter] =
    useState<string>("");
  // Sets the transaction type filters when called
  const handleResultFilterChange = (value: string) => {
    setTransactionTypeFilter(value);
  };

  const groupedTransactions: {
    [key: string]: { [key: string]: { success: number; failed: number } };
  } = {};

  // Group transactions by day and name, add if failed or success to count
  data.forEach((transaction) => {
    const timestamp = new Date(consensusTimestampToDate(transaction.consensus_timestamp))

    if (!isNaN(timestamp.getTime())) {
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
    } else {
      const timesamptTransactionsError = `Error invalid timestamp for transaction: ${transaction.consensus_timestamp}`;
      logErrorToFile(timesamptTransactionsError, __filename)
      console.error(
        `Invalid timestamp for transaction: ${transaction.consensus_timestamp}`
      );
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
        transactionFilters.push(successLabel);
        acc.push({
          label: successLabel,
          stack: name,
          dataKey: `${name}_Success`,
        });
      }
      if (!failedExists) {
        transactionFilters.push(failedLabel);
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

  // Updates the filters and then filters the table based upon the date and values
  useEffect(() => {
    const minDate = selectedStartDate
      ? selectedStartDate.toISOString().split("T")[0]
      : lastConsensusTimestamp;
    const maxDate = selectedEndDate
      ? selectedEndDate.toISOString().split("T")[0]
      : firstConsensusTimestamp;

    const filteredData = chartData.filter((dataItem) => {
      const [currentFilter, statusPre] = transactionTypeFilter
        ? transactionTypeFilter.split(" ")
        : [];
      const status = statusPre ? statusPre.split("(")[1].split(")")[0] : "";
      const date = dataItem.name;
      const property = `${currentFilter}_${status}`;
      return (
        date >= minDate &&
        date <= maxDate &&
        (transactionTypeFilter === "" ||
          (property in dataItem && (dataItem as any)[property] > 0))
      );
    });

    setFilteredChartData(filteredData);
    console.log(filteredChartData);
  }, [selectedStartDate, selectedEndDate, transactionTypeFilter]);

  // TODO add dynamic size rendering to table
  return (
    <Card
      className="
            bg-greyBase-200
            mt-4
            rounded-xl
            shadow-[0_2px_2px]
            shadow-brand-800
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
          <div className="flex items-start">
            <DatePickerRange
              value={firstConsensusTimestamp}
              onChange={handleDateRangeChange}
              firstValue={lastConsensusTimestamp}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Input
                  placeholder="Filter transactions by type"
                  className="max-w-sm text-greyCool-800 focus-visible:ring-pink-100 focus-visible:border-brand-400"
                  value={
                    transactionTypeFilter !== ""
                      ? transactionTypeFilter
                      : "Filter transasctions by type"
                  }
                  readOnly
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-greyCool-50 max-h-64 overflow-y-auto"
              >
                {/* Render for each transaction type */}
                {transactionFilters.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    className="capitalize"
                    checked={transactionTypeFilter === type}
                    onCheckedChange={() =>
                      handleResultFilterChange(
                        transactionTypeFilter === type ? "" : type
                      )
                    }
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsGraph;
