import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import supabase from '../API/Supabase';
import "./style.css";
import { useAuth } from "../../contexts/Auth"

function Signup() {
    const [error, setError] = useState(false);
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signUp } = useAuth()

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Calls `signUp` function from the context
        const { error } = await signUp({ email, password })

        if (error) {
            alert('error signing in')
        } else {
        // Redirect user to Dashboard
            history.push('/login')
        }
    
        // Calls `signUp` function from the context
    }



  return (
    <div id="main" class="main-container">
        <div class="box">
            <h2>Signup</h2>
            <form>
                <div class="input-box">
                    <input type="text" name="gmail"  ref={emailRef} title="gmail"/>
                    <label>Gmail</label>
                </div>
                <div class="input-box">
                <input type="password" name="password"  ref={passwordRef} title="username"/>
                    <label>Password</label>
                </div>
                <input onClick={handleSubmit} id="submit" type="submit" name="" value="Submit"/>
                
            </form>
            <a href="/login">Login</a>
        </div>
        <div id="logged-in"/>
        </div>
  );
}

export default Signup;
