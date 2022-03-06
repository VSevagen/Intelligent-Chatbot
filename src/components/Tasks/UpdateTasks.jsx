import React, { useState } from "react";
import supabase from "../API/Supabase";
import styled from "@emotion/styled";

const TasksContainer = styled.div`
  background-color: #2898ec;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin: -5px 0px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Heading = styled.h2`
  font-size: 1rem;
  margin: 0 0 8px 0;
`;

const Button = styled.button`
  display: block;
  margin: 12px auto;
  background-color: #fff;
  padding: 8px;
  border-radius: 5px;
  font-weight: bold;
  color: #2898ec;
  width: 120px;
  border: none;
`;

const Label = styled.label`
  margin-left: 30px;
  font-weight: bold;
`;

function UpdateTasks(props) {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");

  const TasksOption = () => {
    return props.tasksData.map((data, index) => {
      return (
        <option key={index} value={index}>
          Task {index + 1}
        </option>
      );
    });
  };

  function handleChangeTasks(evt) {
    setTask(evt.target.value);
  }

  function handleChangeStatus(evt) {
    setStatus(evt.target.value);
  }

  function handleConfirm() {
    let statusArray = props.statusData;
    statusArray[task] = status;
    updateStatus(statusArray);
    props.actionProvider.handleStatusUpdate();
  }

  const updateStatus = async (status) => {
    let { data: Tasks, error } = await supabase
      .from("Tasks")
      .update({ status: status })
      .eq("Name", props.user);
    if (error) console.log("Error ", error);
  };

  return (
    <TasksContainer>
      <Heading>Tasks</Heading>
      <Label>Choose a task: </Label>
      <select onChange={handleChangeTasks}>
        <option>--</option>
        {TasksOption()}
      </select>
      <Label>Status: </Label>
      <select onChange={handleChangeStatus}>
        <option>--</option>
        <option>Not-started</option>
        <option>In-progress</option>
        <option>completed</option>
      </select>
      <Button onClick={handleConfirm}>Confirm</Button>
    </TasksContainer>
  );
}

export default UpdateTasks;
