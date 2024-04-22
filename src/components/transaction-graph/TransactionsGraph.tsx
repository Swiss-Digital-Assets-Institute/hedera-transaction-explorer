"use client"

import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Creates a transaction interface
interface Transaction {
    transaction_id: string;
    name: string;
    transfers: string;
    consensus_timestamp: string;
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
    const groupedTransactions: { [key: string]: {[key: string]:number}} = {};

    // Group transactions by day and name
    data.forEach((transaction) => {
        const timestamp = new Date(transaction.consensus_timestamp);
        const day = timestamp.toISOString().split("T")[0];

        // Checks if there are any transactions for that day, if not empty object
        if (!groupedTransactions[day]){
            groupedTransactions[day] = {};
        }

        // Checks if there are any transaction type on said day, if not then it puts that day to 0
        if(!groupedTransactions[day][transaction.name]){
            groupedTransactions[day][transaction.name] = 0;
        }

        // Adds one to the count for said day
        groupedTransactions[day][transaction.name]++;
    });

    // Map the grouped transactions to generate the series data
    const chartData = Object.keys(groupedTransactions).map((day) => {
        return {
            name: day,
            ...Object.entries(groupedTransactions[day]).reduce(
                (acc, [name, count]) => {
                    acc[name] = count;
                    return acc;
                },
                {} as Record<string, number>
            ),
        };
    })
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    // Generate series configuration for BarChart Component
    const series = Object.keys(groupedTransactions).reduce((acc, day) => {
        Object.entries(groupedTransactions[day]).forEach(([name]) => {
            if (!acc.some((s) => s.label === name)) {
                acc.push({ label: name, stack: name});
            }
        });
        return acc;
    }, [] as {label: string; stack: string} []);

    // TODO add dynamic size rendering to table
    return ( 
        <Card className="
            bg-slate-200
            mt-4
            rounded-xl
            shadow-[0_2px_2px]
            shadow-cyan-600
            items-center
            min-w-[300px]
        ">
            <CardHeader>
                <CardTitle>Transfers graphs</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <BarChart 
                        dataset={chartData}
                        xAxis={[{ scaleType: "band", dataKey: "name"}]}
                        yAxis={[{ scaleType: "linear", dataKey: "left"}]}
                        series={series.map((s) => ({ ...s, dataKey: s.label}))}
                        width={800}
                        height={600}
                    />
                </div>
            </CardContent>
        </Card>
     );
}
 
export default TransactionsGraph;
