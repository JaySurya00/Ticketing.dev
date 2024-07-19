"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useRequest from "@/app/hooks/use-request";
import { useUser } from "../../context/userContext";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();
  const { fetchCurrentUser } = useUser(); // Access the fetch function
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: async () => {
      await fetchCurrentUser(); // Re-fetch the current user
      Router.push("/");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
