import "@testing-library/jest-dom";
import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '../transferLookup/DataTable';
import mockTransactionsTable from '../../../mockData/mockTransactionsTable.json'
import columns, { Transaction } from "../transferLookup/TableColumnDef";

// mock use router
jest.mock("next/navigation", () => ({
    useRouter: jest.fn().mockReturnValue({
      refresh: jest.fn(),
    }),
  }));

describe('DataTable component', () => {
  it('renders correctly with mock data', () => {
    const transactions: Transaction[] = mockTransactionsTable as Transaction[];
    // Render the DataTable component with mock data and tableCol definitions
    render(<DataTable data={transactions} columns={columns} />); 

    const totalTransactions = screen.getByText("Transaction Type");
    
    expect(totalTransactions).toBeInTheDocument();
    
  });
});
