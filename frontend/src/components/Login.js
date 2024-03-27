import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const [email, esetter] = useState("");
  const [pw, pwsetter] = useState("");
  
  const e = (data) => {
    esetter(data);
  };
  const p = (data) => {
    pwsetter(data);
  };
  const submit=async()=>{
    console.warn("hi from submit");
    console.warn({email,pw});
    const data={
      email:email,
      password:pw
    }
    // api call
    let result = await fetch("http://localhost:3001/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    result=await result.json();
    console.warn(result);
    if(result.name){
      console.warn("found");
      localStorage.setItem("user",JSON.stringify( result));
      navigate("/");
    }
    else{
      navigate('/signup')
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form>
        
        <div>
          <label>email:</label>
          <input type="text" value={email} onChange={(event)=>e(event.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={pw} onChange={(event)=>p(event.target.value)}/>
        </div>
        <button type="button" onClick={submit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
