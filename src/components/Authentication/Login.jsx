import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    let [username,setUsername]=useState("");
    let [password,setPassword]=useState("");
    let navigate=useNavigate();
    async function HandleLogin(){
        console.log("username",username);
        console.log("password",password);

       //let res=
       await fetch("http://localhost:3100/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        //const data = await res.json();
        //console.log(data);

        .then(res => res.json())
        .then(data => {
            console.log("Response from server:", data);
            sessionStorage.setItem("username", username);
            //console.log("id",data.id)
            sessionStorage.setItem("id",data.id);
            sessionStorage.setItem("token",data.token);
        })
        .catch(err => {
            console.error("Login error:", err);
        });
        navigate('/')
    
    }
    function HandleCLick(){
        navigate('/Register')
    }
    
    return(
        <>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h2>Login</h2>
            <input type="text"id="username" placeholder="username" value={username}
             onChange={(e)=>{setUsername(e.target.value)}} style={{ margin: "10px", padding: "8px" }}></input>
             <br/>
            <input type="text" id="password" placeholder="password" value={password}
             onChange={(e)=>{setPassword(e.target.value)}} style={{ margin: "10px", padding: "8px" }}></input>
             <br/>
            <button onClick={HandleLogin} style={{ margin: "10px", padding: "8px" }}>Login</button>
            <br/>
            <small>Don't have an account ? {" "}
            <button onClick={HandleCLick} style={{ color: "blue", background: "none",
               border: "none", cursor: "pointer" }}>Register</button>
            </small>
        </div>
        </>
    )
}
export default Login;