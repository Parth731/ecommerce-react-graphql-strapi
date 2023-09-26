import React, { useEffect, useState } from "react";
import { LOGIN_USER } from "../gqloperation/mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import request, { GraphQLClient } from "graphql-request";
import { CLIENT_URL } from "../helper";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);

  if (loading) return <h1>logging in...</h1>;

  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
    navigate("/");
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({
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
