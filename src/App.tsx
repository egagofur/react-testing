import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "./components/Button";

type dataType = {
  [key: string]: any;
};

export default function App() {
  const [data, setData] = useState<dataType>({});
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSucess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name;

    setData((old) => ({ ...old, [name]: value }));
  }

  useEffect(() => {
    if (
      Object.prototype.hasOwnProperty.call(data, "email") &&
      Object.prototype.hasOwnProperty.call(data, "password")
    ) {
      if (data.email?.length === 0 || data.password?.length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [data]);

  async function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const { data: user } = await axios(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (user.email !== data.email) return setErrorMsg("user not register");
    setSucess(true);
    target.reset();
    setErrorMsg("");
    setData({});
  }

  return (
    <div>
      <div>
        <h3>Login</h3>
        <span role="alert">{errorMsg}</span>
        {success && <p>Login berhasil</p>}
        <form onSubmit={handleForm}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              onChange={handleChange}
            />
          </div>
          <Button label="Login" type="submit" disabled={disabled} />
        </form>
      </div>
    </div>
  );
}
