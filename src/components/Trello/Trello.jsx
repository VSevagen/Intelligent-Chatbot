import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import Button from "./Button";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const TrelloApp = (props) => {
  const [data, setData] = useState(null);
  const [isready, setisready] = useState(false);
  const getData = async () => {
    const data = await axios.get(
      "https://api.trello.com/1/members/me/boards?key=" +
        env.API_KEY +
        "&token=" +
        env.TOKEN
    );
    setData(data);
    setisready(true);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const options = [
    {
      text: isready && data.data[0].name,
      id: 1,
      boardID: isready && data.data[0].id,
      url: isready && data.data[0].shortUrl,
    },
    {
      text: isready && data.data[1].name,
      id: 2,
      boardID: isready && data.data[1].id,
      url: isready && data.data[1].shortUrl,
    },
    {
      text: isready && data.data[2].name,
      id: 3,
      boardID: isready && data.data[2].id,
      url: isready && data.data[2].shortUrl,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <Button
      text={option.text}
      key={option.id}
      apiID={option.boardID}
      actions={props}
      url={option.url}
    ></Button>
  ));

  return <Container>{optionsMarkup}</Container>;
};

export default TrelloApp;
