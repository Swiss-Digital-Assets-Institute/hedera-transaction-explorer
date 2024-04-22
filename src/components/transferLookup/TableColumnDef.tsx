"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

// Declare transaction Type to be used in the Column definitions
export type Transaction = {
  transaction_id: string;
  name: string;
  transfers: string;
  consensus_timestamp: string;
};

// Column definitions and filtering
export const columns: ColumnDef<Transaction>[] = [
  {
    // Checkbox column
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    // Transaction ID column
    accessorKey: "transaction_id",
    header: "Transaction ID",
  },
  {
    // Transaction Type column
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    // Content of transaction column
    accessorKey: "transfersString",
    header: "Content",
  },
  {
    // Date stamp column
    accessorKey: "consensus_timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    // Node column
    accessorKey: "node",
    header: "Node",
  },
  {
    // Transaction Result column
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Result
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    // Fees column
    accessorKey: "charged_tx_fee",
    header: "Transaction fee in Hbars",
  },
];

export default columns;
