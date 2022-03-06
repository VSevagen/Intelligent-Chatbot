import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import supabase from "../API/Supabase";

const Item = styled.li`
  text-align: left;
  font-size: 0.9rem;
`;

const Link = styled.a`
  text-decoration: none;
  margin: 6px;
  display: block;
  color: #1d1d1d;
  background-color: #f1f1f1;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(150, 149, 149, 0.4);
`;

const Container = styled.ul`
  padding: 0;
`;

function TasksLists(props) {
  const [tasks, setTasks] = useState(null);
  const [isready, setReady] = useState(false);
  const data = async () => {
    let { data: Tasks, error } = await supabase
      .from("Tasks")
      .select("Tasks")
      .eq("Name", props.user);
    if (error) console.log("Error", error);
    setTasks(Tasks);
    setReady(true);
  };

  useEffect(() => {
    data();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {isready &&
        tasks[0].Tasks.map((data) => (
          <Item key={data}>
            <Link href={data.url} target="_blank" rel="noopener noreferrer">
              {data}
            </Link>
          </Item>
        ))}
    </Container>
  );
}

export default TasksLists;
