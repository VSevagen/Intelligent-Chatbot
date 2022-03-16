import React, { useState, useEffect } from "react";
import supabase from "../API/Supabase";
import Recommend from "./Recommend";

function RecommendOptions(props) {
  const [Data, setData] = useState(null);
  const [isready, setIsready] = useState(false);
  const data = async () => {
    let { data: Tasks, error } = await supabase
      .from("Tasks")
      .select("Tasks, status, Category")
      .eq("Name", props.user);
    if (error) console.log("Error", error);
    setData(Tasks);
    setIsready(true);
  };

  const analyzeData = () => {
    let pendingEasyTasks = [];
    let pendingMediumTasks = [];
    let pendingHardTasks = [];
    Data[0].Category.map((category, i) =>
      category === "easy" && Data[0].status[i] !== "completed"
        ? pendingEasyTasks.push(Data[0].Tasks[i])
        : category === "medium" && Data[0].status[i] !== "completed"
        ? pendingMediumTasks.push(Data[0].Tasks[i])
        : category === "hard" && Data[0].status[i] !== "completed"
        ? pendingHardTasks.push(Data[0].Tasks[i])
        : ""
    );

    if (pendingEasyTasks.length > 0) {
      let len = pendingEasyTasks.length;
      return (
        <Recommend
          len={len}
          type="easy"
          tasks={pendingEasyTasks}
          action={props}
        ></Recommend>
      );
    } else if (pendingEasyTasks.length === 0 && pendingMediumTasks.length > 0) {
      let len = pendingMediumTasks.length;
      return (
        <Recommend
          len={len}
          type="medium"
          tasks={pendingMediumTasks}
          action={props}
        ></Recommend>
      );
    } else {
      let len = pendingHardTasks.length;
      return (
        <Recommend
          len={len}
          type="hard"
          tasks={pendingHardTasks}
          action={props}
        ></Recommend>
      );
    }
  };

  useEffect(() => {
    data();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>{isready && analyzeData()}</div>
    </div>
  );
}

export default RecommendOptions;
