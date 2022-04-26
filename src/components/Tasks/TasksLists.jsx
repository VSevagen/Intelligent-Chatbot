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

const TagHeading = styled.p`
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: 900;
  padding-left: 0.5rem;
`;

const Container = styled.ul`
  padding: 0;
  list-style-type: none;
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
    setTasks(Tasks[0].Tasks);
    setReady(true);
  };

  useEffect(() => {
    data();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tags = ['Problem solving', 'Web', 'Terminal', 'Misc'];

  return (
    <Container>
      {isready ?
        tags.map((tag) => (
          <>
            <TagHeading key={tag}>{tag}</TagHeading>
            {tasks.map((task) => {
              const data = JSON.parse(task);
              if (data.tag === tag) {
                return (
                  <Item key={data.content}>
                    <Link href={data.url} target="_blank" rel="noopener noreferrer">
                      {data.content}
                    </Link>
                  </Item>
                )
              }
            })}
          </>
        )): (
          <Item>Loading your tasks...</Item>
        )}
    </Container>
  );
}

export default TasksLists;
