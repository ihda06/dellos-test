import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HomePage from "../pages";

describe("Test View Homepage", () => {
  it("To match snapshot", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
