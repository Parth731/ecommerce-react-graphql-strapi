import React, { useState } from "react";
import { LOGIN_USER } from "../gqloperation/mutation";
import { useNavigate } from "react-router-dom";
import request from "graphql-request";
import { CLIENT_URL } from "../helper";
import { useMutation } from "react-query";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signupValue, setsignupValue] = useState({});

  // const { isLoading, data, isError, error, mutateAsync }: any =
  //   useMutation(LOGIN_USER);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutateAsync({
    //   variables: {
    //     input: formData,
    //   },
    // });

    setsignupValue({
      variables: {
        input: formData,
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { isLoading, data, error }: any = useMutation(() =>
    request(CLIENT_URL, LOGIN_USER, signupValue)
  );

  if (isLoading) return <h1>logging in...</h1>;

  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
    navigate("/");
  }

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      {error && <div className="card-panel red">{error.message}</div>}
      <h3>Login </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email or username"
          name="identifier"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn blue">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
