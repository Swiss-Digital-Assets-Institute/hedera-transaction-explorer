import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "../header/Header";
import useNetworkSelection from "../../../hooks/useNetworkSelection";

// mock session storage
let store: { [key: string]: string } = {};
const sessionStorageMock = (() => {
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

// assign session storage mock
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

// mock resize observer calls
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// mock hook
jest.mock("../../../hooks/useNetworkSelection", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    selectedNetwork: "mainnet",
    updateNetworkSelection: jest.fn(),
  })),
}));

// mock use router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    refresh: jest.fn(),
  }),
}));

// Test header component
describe("Header component", () => {
  beforeEach(() => {
      window.sessionStorage.clear();
      jest.restoreAllMocks();
    });
  it("renders the logo", () => {
    render(<Header />);
    expect(
      screen.getByAltText("The Hashgraph Association Logo")
    ).toBeInTheDocument();
  });

  it("renders the popover with mainnet by default", () => {
    render(<Header />);
    expect(screen.getByRole("combobox")).toHaveTextContent("MainNet");
  });

  it("updates selected network when a network is clicked", async () => {
    render(<Header />);
    const button = screen.getByRole("combobox");
    fireEvent.click(button);
    const testnetOption = screen.getByText("TestNet");
    fireEvent.dblClick(testnetOption);
    await waitFor(() => {
      expect(useNetworkSelection).toHaveBeenCalled();
    });
  });
});
