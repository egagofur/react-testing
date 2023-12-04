import { screen, render } from "@testing-library/react";
import App from "./App";
import { userEvent } from "@testing-library/user-event";

describe("App component", () => {
  it("when form is empty, button should disable", () => {
    render(<App />);

    const buttonEl = screen.getByRole("button", { name: /login/i });
    expect(buttonEl).toBeDisabled();
  });

  it("when form is fill, button should not disable", async () => {
    render(<App />);
    const inputEmail = screen.getByRole("textbox");
    const inputPassword = screen.getByPlaceholderText(/enter password/i);
    const buttonEl = screen.getByRole("button", { name: /login/i });

    await userEvent.type(inputEmail, "email");
    await userEvent.type(inputPassword, "apa");

    expect(buttonEl).not.toBeDisabled();
  });

  it("when email format wrong, should show error message", async () => {
    render(<App />);
    const inputEmail = screen.getByRole("textbox");
    const inputPassword = screen.getByPlaceholderText(/enter password/i);
    const buttonEl = screen.getByRole("button", { name: /login/i });

    await userEvent.type(inputEmail, "ega");
    await userEvent.type(inputPassword, "23");
    await userEvent.click(buttonEl);

    expect(inputEmail).toBeInvalid();
  });

  it("when user not register, should show error message", async () => {
    render(<App />);

    const inputEmail = screen.getByRole("textbox");
    const inputPassword = screen.getByPlaceholderText(/enter password/i);
    const buttonEl = screen.getByRole("button", { name: /login/i });

    await userEvent.type(inputEmail, "saya@gmail.com");
    await userEvent.type(inputPassword, "123");

    await userEvent.click(buttonEl);

    const spanEl = screen.getByText(/user not register/i);
    expect(spanEl).toBeInTheDocument();
  });

  it("when user login sucess, should not show error message", async () => {
    render(<App />);

    const inputEmail = screen.getByRole("textbox");
    const inputPassword = screen.getByPlaceholderText(/enter password/i);
    const buttonEl = screen.getByRole("button", { name: /login/i });

    await userEvent.type(inputEmail, "kamu@gmail.com");
    await userEvent.type(inputPassword, "123");

    await userEvent.click(buttonEl);

    const pEL = screen.getByText(/login berhasil/i);
    expect(pEL).toBeInTheDocument();
  });
});
