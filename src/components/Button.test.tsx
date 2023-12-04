import Button from "./Button";
import { screen, render } from "@testing-library/react";

describe("Button component", () => {
  it("should render label correctly", () => {
    const label = "test";

    render(<Button label={label} />);

    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toHaveTextContent("test");
  });
});
