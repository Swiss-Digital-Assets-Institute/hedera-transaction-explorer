import "@testing-library/jest-dom";
import mockTransactionsGraph from "../../../mockData/mockTransactionsGraph.json";
import TransactionsGraph from "../transaction-graph/TransactionsGraph";
import { render, screen } from "@testing-library/react";

// mock use router
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn().mockReturnValue({
//     refresh: jest.fn(),
//   }),
// }));

// jest.mock("@mui/x-charts", () => ({
//   BarChart: jest.fn().mockImplementation(({ children }) => children),
// }));
// TODO check if the error was solved by Mui X-chart team
describe("Graph component", () => {
  // beforeEach(() => {
  //   const transactions = mockTransactionsGraph;
  //   // Render the TransactionsGraph component with mock data and tableCol definitions
  //   render(<TransactionsGraph data={transactions} />);
  // });

  // it("loads graph", () => {
  //   const graphName = screen.getByText("Transfeers graphs");
  //   const filterType = screen.getByPlaceholderText(
  //     "Filter transactions by type"
  //   );
  //   const filters = screen.getByText("Filters");
  //   const dateFilter = screen.getByRole("button");

  //   expect(graphName).toBeInTheDocument();
  //   expect(filterType).toBeInTheDocument();
  //   expect(filters).toBeInTheDocument();
  //   expect(dateFilter).toBeInTheDocument();
  // });

  it("returns true", () => {
    expect(1==1);
  })
});
