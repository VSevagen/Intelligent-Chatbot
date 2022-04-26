import React, { useState, useEffect } from "react";
import supabase from "../API/Supabase";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #efefef;
  color: #000;
  padding: 10px;
  border-radius: 5px;
  margin: 3px 0px;
  font-size: 0.9rem;
`;

const Title = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Desc = styled.div`
  background-color: #f1f1f1;
  color: #5f5f5f;
  padding: 0.5 0rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  margin-top: 1rem;
  padding-left: 1rem;
  list-style-type: decimal;
`;

const ListItem = styled.li`
  margin: 0;
  padding: 0.2rem 0;
`;

function Describe(props) {
  const [Data, setData] = useState("");
  const [isready, setIsready] = useState(false);

  const data = async () => {
    let { data: Descriptions, error } = await supabase
      .from("Descriptions")
      .select("*")
      .eq("id", props.tasksNum);
    if (error) console.log("Error ", error);
    setData(Descriptions[0]);
    setIsready(true);
  };

  useEffect(() => {
    data();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {isready ? (
        <>
          <Title>{isready && Data.Tasks}</Title>
          <Desc>{isready && Data.description}</Desc>
            Visit the following links for more details<br></br>
          <List>
            {isready &&
              Data.urls.map((url) => (
                <ListItem>
                  <a href={url}>{url}</a>
                </ListItem>
              ))}
          </List>
        </>
      ): (
        <Desc>Loading your task...</Desc>
      )}
    </Container>
  );
}

export default Describe;
