import React, { useState, useContext } from "react";
import { useHistory } from 'react-router'
import Bot from "./Bot";
import Admin from '../components/Admin/admin';
import "./bot.css";
import BotButton from "./display.svg";
import { adminContext } from '../contexts/admin-context';
import { useAuth } from "../contexts/Auth"

function BotWrapper() {
  const [showBot, setShowBot] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const value = {showAdmin, setShowAdmin};

  const { user, signOut } = useAuth()

  const history = useHistory()

  function handleClick() {
    setShowBot(!showBot);
    setShowAdmin(false);
  };

  async function handleSignOut() {
    await signOut()

    // Redirects the user to Login page
    history.push('/login')

  }

  return (
    <adminContext.Provider value={value}>
         <button onClick={handleSignOut} style={{float:"right"}}>Sign out</button>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "no-wrap", justifyContent: "space-around", alignItems: "center"}}>
            <React.Fragment>
              <Admin show={showAdmin} setShow={setShowAdmin}>
              </Admin>
              {showBot &&
                <div className="bot">
                  <Bot setShow={setShowAdmin}/>
                </div>
              }
            </React.Fragment>
      </div>
      <input
        className="chat_butt"
        type="image"
        alt="button for chat"
        src={BotButton}
        onClick={handleClick}
      ></input>
    </adminContext.Provider>
  );
}

export default BotWrapper;
