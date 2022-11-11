import Swal from "sweetalert2";

const BASE_URL = "https://jcc.brandingyou.id/api";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function deleteToken() {
  return localStorage.clear();
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function login({ username, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    Swal.fire({
      icon: "error",
      title: "Ehhh",
      text: responseJson.meta.message,
    });
    // alert(responseJson.meta.message);
    return {
      meta: true,
      data: null,
    };
  }

  return {
    meta: false,
    data: responseJson.data,
  };
}

async function register({ name, email, username, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      username,
      password,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    Swal.fire({
      icon: "error",
      title: "Ehhh",
      text: responseJson.meta.message,
    });
    // alert(responseJson.meta.message);
    return {
      meta: true,
    };
  }
  return {
    meta: false,
  };
}

export { getAccessToken, putAccessToken, login, register, deleteToken };
