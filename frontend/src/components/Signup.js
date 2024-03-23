import React from 'react';
import { useState } from 'react';
import './Signup.css'
const Signup=()=>{
    const [name,nsetter]=useState("");
    const [email,esetter]=useState("");
    const [pw,pwsetter]=useState(undefined);
    const n=(data)=>{
        nsetter(data);
    }
    const e=(data)=>{
        esetter(data);
    }
    const p=(data)=>{
        pwsetter(data);
    }
    const submit=()=>{
        console.warn({name,email,pw});
    }
    return(
        <div className='register'>
            <h1>register</h1>
            <input type='text' className='textbox' placeholder='enter name' value={name} onChange={(event)=>n(event.target.value)}></input>
            <input type='text' className='textbox' placeholder='enter email' value={email} onChange={(event)=>e(event.target.value)}></input>
            <input type='password' className='textbox' placeholder='enter password' value={pw} onChange={(event)=>p(event.target.value)}></input>
            <button onClick={submit}>sign up</button>
        </div>
    )
}
export default Signup;