import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Footer from "../footer/Footer";
import React from "react";

describe("Footer component", () => {
  it("renders footer text correctly", () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText(
      `The Hashgraph Association ${new Date().getFullYear()}`
    );
    expect(footerText).toBeInTheDocument();
  });

  it("renders THA Logo image correctly", () => {
    const { getByAltText } = render(<Footer />);
    const logoImage = getByAltText("THA Logo");
    expect(logoImage).toBeInTheDocument();
  });

  it("has correct image source", () => {
    const { getByAltText } = render(<Footer />);
    const logoImage = getByAltText("THA Logo") as HTMLImageElement;
    expect(logoImage.src).toContain("/icon.svg");
  });
});
