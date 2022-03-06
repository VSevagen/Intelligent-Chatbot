import React from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 25px;
  background: transparent;
  border: 1px solid green;
  margin: 3px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

function EntryWidget(props) {
  const options = [
    {
      text: "Tasks List",
      handler: props.actionProvider.handleTasksLists,
      id: 1,
    },
    {
      text: "Tasks status",
      handler: props.actionProvider.handleTasks,
      id: 2,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <Button key={option.id} onClick={option.handler}>
      {option.text}
    </Button>
  ));

  return <Container>{optionsMarkup}</Container>;
}

export default EntryWidget;
