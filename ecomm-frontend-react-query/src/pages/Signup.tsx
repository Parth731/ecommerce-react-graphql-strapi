import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { SIGNUP_USER } from "../gqloperation/mutation";
import { useMutation } from "react-query";
import request from "graphql-request";
import { CLIENT_URL } from "../helper";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signupValue, setsignupValue] = useState({});

  // apollo-client
  // const [signupUser, { loading, error, data }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // signupUser({
    //   variables: {
    //     input: formData,
    //   },
    // });

    setsignupValue({
      input: formData,
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { isLoading, data, error }: any = useMutation(() =>
    request(CLIENT_URL, SIGNUP_USER, signupValue)
  );

  console.log(signupValue, data);

  if (isLoading) return <h1>sigining up ...</h1>;
  if (data) {
    localStorage.setItem("jwt", data.register.jwt);
    navigate("/");
  }

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      {error && <div className="card-panel red">{error.message}</div>}
      <h3>Signup </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
