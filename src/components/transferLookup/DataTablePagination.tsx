"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SetTransactionsOnSelect from "./SetTransactionOnSelect";

// Interface to read the table data for pagination
interface DataTablePaginationPrps<TData> {
  table: Table<TData>;
}

// TODO update pagination to match design document

/*
    This function checks the data recieved, and has an order on how to display it
    Can dynamically select how many rows to show, and total pages.
    It allows to advance, go back and go to last or first page
*/
export function DataTablePagination<TData>({
  table,
}: DataTablePaginationPrps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const rowData = selectedRows.map((row) => row.original);

  return (
    <div className="flex items-center justify-between px-2 text-sm">
      <div className="flex items-center text-muted-foreground">
        {/* Shows rows selected */}
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
        <div className="ml-2">
          <SetTransactionsOnSelect 
            rowsSelected={table.getFilteredSelectedRowModel().rows.length}
            rowTransactions={rowData}
          />
        </div>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Shows and changes rows per page */}
        <div className="flex items-center space-x-2">
          <p className="font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Shows current page out of total pages */}
        <div className="flex items-center w-[100px] justify-center font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        {/* First, previous, next and last page buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">First Page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous Page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.nextPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Next Page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Last Page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
