import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const [name, nsetter] = useState("");
  const [email, esetter] = useState("");
  const [pw, pwsetter] = useState("");
  const n = (data) => {
    nsetter(data);
  };
  const e = (data) => {
    esetter(data);
  };
  const p = (data) => {
    pwsetter(data);
  };
  const submit = async () => {
    const data = { name:name,email: email,password: pw };
    // api integration post api
    // with fetch, could do with axios too
    let result = await fetch("http://localhost:3001/register", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    
    result = result.json();
    localStorage.setItem("user", JSON.stringify(await result));
    if (result) {
      console.warn(await result);
      // redirect after sign up
      navigate("/");
    }
    //console.warn({name,email,pw});
    //console.warn("result",result);
  };
  return (
    <div className="register">
      <h1>register</h1>
      <input
        type="text"
        className="textbox"
        placeholder="enter name"
        value={name}
        onChange={(event) => n(event.target.value)}
      ></input>
      <input
        type="text"
        className="textbox"
        placeholder="enter email"
        value={email}
        onChange={(event) => e(event.target.value)}
      ></input>
      <input
        type="password"
        className="textbox"
        placeholder="enter password"
        value={pw}
        onChange={(event) => p(event.target.value)}
      ></input>
      <button onClick={submit}>sign up</button>
    </div>
  );
};
export default Signup;
