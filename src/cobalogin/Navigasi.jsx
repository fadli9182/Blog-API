import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteToken } from "./utils/api";

const Navigasi = () => {
  const navigate = useNavigate();

  function logout() {
    deleteToken();
    // localStorage.removeItem("accesToken");
    Swal.fire("Keluar!", "Anda Berhasil Keluar", "success");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
        <div className="container">
          <h1 className="navbar-brand" href="/">
            YoiBlog
          </h1>
          <ul className="navbar-nav me-auto mb-2 flex-row gap-2 justify-content-center">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Link
              </a>
            </li>
          </ul>
          <form className="d-flex gap-4">
            <Link className="btn btn-primary" to={"/login"}>
              Login
            </Link>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navigasi;
