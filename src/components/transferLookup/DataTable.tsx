"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DatePickerRange } from "../date-pickers/DatePickerRange";
import tableFilters from "../../utils/tableFilters.json";
import dateBetweenFilterFn from "@/utils/dateBetweenFilterFn";

// Create an interface for the table
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

/*
    This function accepts the table interface. It allows for sorting of the table,
    adding filters for each column, hide and show extra columns, and select rows. It also
    shows total transactions
*/
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Sets the operations that can be done in the table
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      dateBetweenFilterFn: dateBetweenFilterFn,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const totalTransactions = data.length;
  let columnNames: any[] = [];

  const resultColumnValues: any[] = [];
  data.forEach((row: any) => {
    const resultValue = row.result;
    if (resultValue && !resultColumnValues.includes(resultValue)) {
      resultColumnValues.push(resultValue);
    }
  });

  const lastRowIndex = table.getRowCount() > 0 ? table.getRowCount() - 1 : 0;
  const lastConsensusTimestamp: string = table
    .getRow(lastRowIndex.toString())
    .getValue("consensus_timestamp");

  const firstConsensusTimestamp : string = table.getRow('0'.toString()).getValue("consensus_timestamp");

  // Creates a drowdown menu for the Result column filter options
  const resultFilterDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Input
          placeholder="Filter transactions by result"
          className="max-w-sm text-greyCool-800"
          value={
            (table.getColumn("result")?.getFilterValue() as
              | string
              | undefined) || "Filter transactions by result"
          }
          onChange={(event) =>
            table.getColumn("result")?.setFilterValue(event.target.value)
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
        {/* Render checkbox for result type */}
        {resultColumnValues.map((value) => (
          <DropdownMenuCheckboxItem
            key={value}
            className="capitalize"
            checked={table.getColumn("result")?.getFilterValue() === value}
            onCheckedChange={() => {
              const currentFilter = table.getColumn("result")?.getFilterValue();
              if (currentFilter === value) {
                table.getColumn("result")?.setFilterValue(undefined);
              } else {
                table.getColumn("result")?.setFilterValue(value);
              }
            }}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Assigns the new filter to the transaction type
  const handleTransactionTypeFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedTransactionType = event.target.value;
    table.getColumn("name")?.setFilterValue(selectedTransactionType);
  };

  // Creates a dropdown menu for the transactions type selection
  const transactionTypeDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Input
          placeholder="Filter transactions by Type"
          className="max-w-sm text-greyCool-800"
          value={
            (table.getColumn("name")?.getFilterValue() as string | undefined) ||
            "Filter by transaction type"
          }
          onChange={handleTransactionTypeFilter}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
        {/* Render checkbox items for each transaction type */}
        {Object.entries(tableFilters.transactionTypes).map(([name, label]) => (
          <DropdownMenuCheckboxItem
            key={name}
            className="capitalize"
            checked={table.getColumn("name")?.getFilterValue() === name}
            onCheckedChange={() => {
              const currentFilter = table.getColumn("name")?.getFilterValue();
              if (currentFilter === name) {
                table.getColumn("name")?.setFilterValue(undefined);
              } else {
                table.getColumn("name")?.setFilterValue(name);
              }
            }}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Sets the data table to use the selectedRange string
  const handleDateRangeChange = (selectedRange: string) => {
    table.getColumn("consensus_timestamp")?.setFilterValue(selectedRange);
  };
  // TODO update column names to reflect header and not ID

  return (
    <div className="rounded-md text-sm">
      {/* Filters buttons */}
      <div className="flex items-center py-4 space-x-4">
        {/* Filter by ID */}
        <Input
          placeholder="Filter transactions by ID..."
          value={
            (table.getColumn("transaction_id")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("transaction_id")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-greyCool-800"
        />
        {/* Filter by Type */}
        {transactionTypeDropdown}
        {/* Filter transaction by Result */}
        {resultFilterDropdown}
        {/* TODO allow input to be defined by date picker */}
        <DatePickerRange
          className="max-w-sm text-greyCool-800"
          value={firstConsensusTimestamp}
          onChange={handleDateRangeChange}
          firstValue={lastConsensusTimestamp}
        />
        {/* Allows to hide or show columns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {/* TODO show column header not ID */}
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table */}
      <Table className="border max-w-[1980px] text-wrap">
        {/* Headers */}
        <TableHeader className="bg-greyCool-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                columnNames.push();
                return (
                  <TableHead key={header.id} className="text-greyCool-700">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* Table body, shows no results in case a search gives empty*/}
        <TableBody className="text-greyCool-700 text-wrap">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          {/* Pagination */}
          <TableRow className="sticky bottom-0">
            <TableCell colSpan={columns.length}>
              <DataTablePagination table={table} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* Total transactions */}
      <p className="font-bold text-right text-xl text-greyCool-700 pt-2">
        Total transactions: {totalTransactions}
      </p>
    </div>
  );
}
