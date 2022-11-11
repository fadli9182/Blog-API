import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../cobalogin/utils/api";
import Swal from "sweetalert2";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onUserNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  function putAccessToken(biji) {
    return localStorage.setItem("accessToken", biji);
  }
  async function onLogin(e) {
    e.preventDefault();
    const { meta, data } = await login({ username, password });
    // setAuthedUser(data);
    if (!meta) {
      loginSuccess(data.token);
      console.log(data.token);
    }
  }
  const loginSuccess = (accessToken) => {
    putAccessToken(accessToken);
    // const { data } = await onLogin({ username, password });
    Swal.fire("Berhasil", "Selamat Datang", "success");
    navigate("/");
  };

  return (
    <>
      <div className="container mt-5 w-50">
        <form onSubmit={(e) => onLogin(e)}>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Username
            </label>
            <input value={username} onChange={onUserNameChangeHandler} type="text" className="form-control" name="username" id="username" aria-describedby="emailHelpId" placeholder="abc@mail.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input value={password} onChange={onPasswordChangeHandler} type="password" className="form-control" name="password" id="password" placeholder="" />
          </div>
          <button className="btn btn-primary me-2">Login</button>
          <Link className="btn btn-success" to="/register" type="submit">
            Register
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
