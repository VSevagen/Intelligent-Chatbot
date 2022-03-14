import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import supabase from '../API/Supabase';
import "./style.css";

function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  function handleUser(evt) {
    setUsername(evt.target.value);
  }

  function handlePass(evt) {
    setPass(evt.target.value);
  }

  async function handleSubmit() {
    let {data: Users, error } = await supabase
      .from('Users')
      .select("*")
      .match({ username, Password: pass})
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
  }

  return (
    <div className="log-form">
      <h2>Login to your account</h2>
        <input
          type="text"
          value={username}
          onChange={handleUser}
          placeholder="Username"
          title="username"
        />
        <input
          type="password"
          value={pass}
          onChange={handlePass}
          title="username"
          placeholder="password"
        />
        {error && <span className="cred">Invalid credentials</span>}
        <button type="submit" className="btn" onClick={handleSubmit}>
          Login
        </button>
    </div>
  );
}

export default Login;
