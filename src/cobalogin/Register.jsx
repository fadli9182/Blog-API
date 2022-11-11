import React, { useState } from "react";
import Navigasi from "./Navigasi";
import { useNavigate } from "react-router-dom";
import { register } from "./utils/api";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    const { meta } = await register({
      name: name,
      email: email,
      username: username,
      password: password,
    });
    console.log(username);

    if (!meta) {
      Swal.fire("Berhasil Daftar", "Silahkan Login untuk melanjutkan", "success");
      navigate("/login");
    }
  };

  return (
    <>
      <Navigasi />
      <div className="container mt-5 w-50">
        <form onSubmit={onRegisterHandler}>
          <div class="mb-3">
            <label for="" class="form-label">
              Name
            </label>
            <input value={name} type="text" name="" id="" class="form-control" placeholder="Masukan Nama" onChange={(e) => setName(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              Email
            </label>
            <input value={email} type="email" class="form-control" name="" id="" placeholder="abc@mail.com" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              Username
            </label>
            <input value={username} type="text" name="username" id="username" class="form-control" placeholder="Masukan Password" aria-describedby="helpId" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              Password
            </label>
            <input value={password} type="password" class="form-control" name="password" id="password" placeholder="Masukan Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
