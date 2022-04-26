import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: ${(props) =>
    props.type === "easy"
      ? "#65af32"
      : props.type === "medium"
      ? "#f9bc02"
      : "#ca3c3c"};

  border-radius: 10px;
  font-size: 0.9rem;
  height: 100%;
  padding: 10px;
`;

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

const TaskContainer = styled.ul`
  padding: 0;
  list-style-type: none;
`;

function Recommend(props) {
  const EasyText =
    "Seeing that you have " +
    props.len +
    " easy tasks left, I would suggest you to give those a try :)";
  const MediumText =
    "Congratulation for completing all easy level tasks. You can try out the " +
    props.len +
    " remaining medium level tasks :)";
  const HardText =
    "Good work till now. You only have " +
    props.len +
    " tasks left now. They might be labelled as hard but I'm sure you can do it :)";

  const reply = () => {
    if (props.type === "easy") return EasyText;
    else if (props.type === "medium") return MediumText;
    else return HardText;
  };

  return (
    <Container type={props.type}>
      <div>{reply()}</div>
      <TaskContainer>
        {props.tasks.map((task) => {
          const data = JSON.parse(task);
          return (
            <Item key={data}>
              <Link href={data.url} target="_blank" rel="noopener noreferrer">
                {data.content}
              </Link>
            </Item>
          )})}
        {props.action.scrollIntoView()}
      </TaskContainer>
    </Container>
  );
}

export default Recommend;
