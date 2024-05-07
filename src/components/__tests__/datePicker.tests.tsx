import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DatePickerRange } from "../date-pickers/DatePickerRange";

describe("DatePickerRange component", () => {
  it("renders without crashing", () => {
    render(<DatePickerRange onChange={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("updates date range when selected", async () => {
    const handleChange = jest.fn();
    render(<DatePickerRange onChange={handleChange} />);

    // Opens the calendar pop over
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => screen.getByLabelText("Go to previous month"));
    expect(screen.getByLabelText("Go to next month"))
  });
});
