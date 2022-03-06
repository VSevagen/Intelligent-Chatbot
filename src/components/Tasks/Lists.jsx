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
  color: #fff;
  background-color: ${(props) =>
    props.color === "Not-started"
      ? "#ca3c3c"
      : props.color === "In-progress"
      ? "#f9bc02"
      : "#65af32"};
  padding: 8px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(150, 149, 149, 0.4);
`;

const Container = styled.ul`
  padding: 0;
`;

function Lists(props) {
  const [data, setData] = useState(null);
  const [isready, setIsready] = useState(false);
  const getData = async () => {
    let { data: Tasks, error } = await supabase
      .from("Tasks")
      .select("Tasks, status")
      .eq("Name", props.user);
    if (error) console.log("Error", error);
    setData(Tasks);
    setIsready(true);
  };

  const seperateData = () => {
    let options = [];
    let Status = [];

    props.listType === "pending"
      ? data[0].status.map(
          (status, i) =>
            status !== "completed" &&
            options.push(data[0].Tasks[i]) &&
            Status.push(status)
        )
      : data[0].status.map(
          (status, i) =>
            status === "completed" &&
            options.push(data[0].Tasks[i]) &&
            Status.push(status)
        );

    props.scrollIntoView();
    return [options, Status];
  };

  const optionMarkup = () => {
    let Data = seperateData();
    console.log(Data[1]);
    return Data[0].map((data, i) => (
      <Item key={data}>
        <Link
          color={Data[1][i]}
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data}
        </Link>
      </Item>
    ));
  };

  useEffect(() => {
    getData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container>{isready && optionMarkup()}</Container>
    </div>
  );
}

export default Lists;
