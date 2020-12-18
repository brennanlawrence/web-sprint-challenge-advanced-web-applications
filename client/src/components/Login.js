import React, { useState } from "react";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const initialState = {
  username: "",
  password: "",
};

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleLogin = (evt) => {
    evt.preventDefault();
    axiosWithAuth().post("/login", loginState)
    .then((res) => {
      console.log(res.data.payload);
      localStorage.setItem("token", res.data.payload);
      setLoginState(initialState);
      props.history.push("/bubble-page");
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div>
      <h3>Log in</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={loginState.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginState.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
