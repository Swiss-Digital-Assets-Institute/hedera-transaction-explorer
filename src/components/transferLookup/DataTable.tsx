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

  // TODO update column names to reflect header and not ID

  return (
    <div className="rounded-md text-sm">
      {/* Filters buttons */}
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Filter transactions by ID..."
          value={
            (table.getColumn("transaction_id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table
              .getColumn("transaction_id")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-slate-800"
        />
        <Input
          placeholder="Filter transactions by Type..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-slate-800"
        />
        <Input
          placeholder="Filter transactions by Result..."
          value={(table.getColumn("result")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("result")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-slate-800"
        />
        {/* TODO add date picker filter */}
        <Input
          placeholder="Filter transactions by Date..."
          value={
            (table
              .getColumn("consensus_timestamp")
              ?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table
              .getColumn("consensus_timestamp")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-slate-800"
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
        <TableHeader className="bg-slate-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                columnNames.push();
                return (
                  <TableHead key={header.id} className="text-slate-700">
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
        <TableBody className="text-slate-700 text-wrap">
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
      <p className="font-bold text-right text-xl text-slate-700 pt-2">
        Total transactions: {totalTransactions}
      </p>
    </div>
  );
}
