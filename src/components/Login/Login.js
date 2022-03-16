import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import supabase from '../API/Supabase';
import "./style.css";
import {useAuth} from "../../contexts/Auth"

function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth()

  const history = useHistory()

  function handleUser(evt) {
    setUsername(evt.target.value);
  }

  function handlePass(evt) {
    setPass(evt.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const { error } = await signIn({ email, password })

    if (error) {
        alert('error signing in')
      } else {
        history.push({
            pathname: "/chatbot",
            state: { name: username },
          });
      }


  }

    // @TODO: add login logic


 /* async function handleSubmit() {
    let {data: Users, error } = await supabase
      .from('Users')
      .select("*")
      .match({Email:  username, Password: pass})
    console.log(Users, error);
    if(Users.length === 1) {
      history.push({
        pathname: "/chatbot",
        state: { name: Users[0].username },
      });
    } else {
      setError(true);
      setUsername('');
      setPass('');
    }
  }*/

  return (
    <div id="main" class="main-container">
            <div class="box">
                <h2>Login</h2>
                <form>
                    <div class="input-box">
                        <input type="text" name="gmail"  ref={emailRef} title="gmail" value={username} onChange={handleUser}/>
                        <label>Gmail</label>
                    </div>
                    <div class="input-box">
                    <input type="password" name="password"  ref={passwordRef} title="username"/>
                        <label>Password</label>
                    </div>
                    <input onClick={handleSubmit} id="submit" type="submit" name="" value="Submit"/>
                    
                </form>
                <a href="/Signup">Register</a>
            </div>
            <div id="logged-in"/>
        </div>
  );
}

export default Login;
