import React from "react";
import axios from "axios";
import env from "react-dotenv";

function Button(props) {
  const handleClick = async () => {
    const newdata = await axios.get(
      "https://api.trello.com/1/boards/" +
        props.apiID +
        "/lists?key=" +
        env.API_KEY +
        "&token=" +
        env.TOKEN
    );
    props.actions.actionProvider.handleMessage(newdata, props.url);
  };

  return (
    <div>
      <button className="learning-option-button" onClick={handleClick}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;
