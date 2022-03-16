import React, {useState, useContext} from 'react';
import supabase from '../API/Supabase';
import './admin.css';
import {adminContext} from '../../contexts/admin-context';

const AdminPrompt = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const value = useContext(adminContext);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    async function handleSubmit() {
        setError(null);
        let user_test = await supabase.auth.user();
        console.log(user_test);
        let { user, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })
        if(user) {
            value.setShowAdmin(true);
        }
        if(error) {
            setError(error);
        }
    }

    return (
        <div id="feedback-form">
        <div>
            <input type="text" name="email" placeholder="Email" value={email} onChange={handleEmail}></input>
            <input type="password" name="password" placeholder="Password" value={password} onChange={handlePassword}></input>
            {error && <p className="error">{error.message}</p>}
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </div>        
    )
}

export default AdminPrompt;