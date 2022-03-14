import React, {useState, useContext} from 'react';
import supabase from '../API/Supabase';
import './admin.css';
import {adminContext} from '../../contexts/admin-context';

const AdminPrompt = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const value = useContext(adminContext);

    const handleEmail = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    async function handleSubmit() {
        setError(null);
        let {data: Users, error } = await supabase
            .from('Users')
            .select("*")
            .match({ username, Password: password });
        if(Users.length === 1) {
            value.setShowAdmin(true);
        }
        if(error) {
            setError(error);
        }
    }

    return (
        <div id="feedback-form">
        <div>
            <input type="text" name="username" placeholder="Username" value={username} onChange={handleEmail}></input>
            <input type="password" name="password" placeholder="Password" value={password} onChange={handlePassword}></input>
            {error && <p className="error">{error.message}</p>}
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </div>        
    )
}

export default AdminPrompt;