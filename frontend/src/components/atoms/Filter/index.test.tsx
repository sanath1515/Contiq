import { screen, render } from "@testing-library/react";
import { Filter } from ".";

describe("Filter atom testcases", () => {
  it("Filter component renders as ecpected", () => {
    render(<Filter />);
    const gridIcon = screen.getByTestId("grid-icon");
    expect(gridIcon).toBeInTheDocument();
    const listIcon = screen.getByTestId("list-icon");
    expect(listIcon).toBeInTheDocument();
  });
});
