import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { DataTable } from "../transferLookup/DataTable";
import mockTransactionsTable from "../../../mockData/mockTransactionsTable.json";
import columns, { Transaction } from "../transferLookup/TableColumnDef";
import { fail } from "assert";

// mock use router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    refresh: jest.fn(),
  }),
}));

describe("DataTable component", () => {
  beforeEach(() => {
    const transactions: Transaction[] = mockTransactionsTable as Transaction[];
    // Render the DataTable component with mock data and tableCol definitions
    render(<DataTable data={transactions} columns={columns} />);
  });

  it("renders table cols", () => {
    const transactionId = screen.getByText("Transaction ID");
    const transactionTypes = screen.getByText("Transaction Type");
    const tranactionContent = screen.getByText("Content");
    const tranactionDate = screen.getByText("Date");
    const tranactionNode = screen.getByText("Node");
    const tranactionResults = screen.getByText("Transaction Result");
    const tranactionFees = screen.getByText("Transaction fee in Hbars");

    expect(transactionId).toBeInTheDocument();
    expect(transactionTypes).toBeInTheDocument();
    expect(tranactionContent).toBeInTheDocument();
    expect(tranactionDate).toBeInTheDocument();
    expect(tranactionNode).toBeInTheDocument();
    expect(tranactionResults).toBeInTheDocument();
    expect(tranactionFees).toBeInTheDocument();
  });

  it("renders filters", () => {
    const filterId = screen.getByPlaceholderText(
      "Filter transactions by ID..."
    );
    const filterType = screen.getByPlaceholderText(
      "Filter transactions by Type"
    );
    const filterResult = screen.getByPlaceholderText(
      "Filter transactions by result"
    );
    const filterDate = document.getElementById("date");
    const filterCols = screen.getByText("Columns");

    expect(filterId).toBeInTheDocument();
    expect(filterType).toBeInTheDocument();
    expect(filterResult).toBeInTheDocument();
    expect(filterDate).toBeInTheDocument();
    expect(filterCols).toBeInTheDocument();
  });

  it("renders data", async () => {
    const dataId = screen.getByText("0.0.2247604-1691871636-590057284");
    const result = screen.findAllByText("SUCCESS");

    expect(dataId).toBeInTheDocument();
    (await result).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
