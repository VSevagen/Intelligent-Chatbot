import React, { useState, useEffect } from "react";
import supabase from "../API/Supabase";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #2898ec;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin: 3px 0px;
  font-size: 0.9rem;
  height: 55px;
`;

const TaskText = styled.span`
  max-width: 80%;
  display: inline-block;
`;

const UpdateContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const UpdateButton = styled.button`
  padding: 0.5rem;
  border-radius: 25px;
  background: transparent;
  border: 1px solid green;
  margin: 3px;
`;

const StatusTag = styled.span`
  float: right;
  color: white;
  background-color: ${(props) =>
    props.color === "Not-started"
      ? "#ca3c3c"
      : props.color === "In-progress"
      ? "#f9bc02"
      : " #65af32"};
  font-size: 0.9em;
  border-radius: 5px;
  padding: 5px;
  margin-top: 0.3rem;
`;

function TasksStatus(props) {
  const [userdata, setData] = useState(null);
  const [isready, setisready] = useState(false);

  const data = async () => {
    let { data: Tasks, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("Name", props.user);
    if (error) console.log("Error ", error);
    setData(Tasks);
    setisready(true);
    props.setState((state) => ({
      ...state,
      loading: false,
      tasksData: Tasks[0].Tasks,
      statusData: Tasks[0].status,
    }));
    props.scrollIntoView();
  };

  useEffect(() => {
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    props.actionProvider.handleUpdateTasks();
    console.log(props);
  };

  return (
    <div>
      {isready &&
        userdata[0].Tasks.map((task, i) => {
          const data = JSON.parse(task);
          return (
            <div>
              <Container>
                <TaskText>{data.content}</TaskText>
                <StatusTag color={userdata[0].status[i]}>
                  {userdata[0].status[i]}
                </StatusTag>
              </Container>
            </div>
          )
      })}
      {isready && (
        <UpdateContainer>
          <UpdateButton onClick={handleClick}>Update a task</UpdateButton>
        </UpdateContainer>
      )}
    </div>
  );
}

export default TasksStatus;
