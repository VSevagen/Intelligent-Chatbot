import React from "react";
import Chatbot from "react-chatbot-kit";
import "./main.css";

import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { useLocation } from "react-router-dom";
import { createChatBotMessage } from "react-chatbot-kit";

import TrelloApp from "../components/Trello/Trello";
import RecommendOptions from "../components/Recommendation/RecommendOptions";
import TrelloCards from "../components/Trello/TrelloCards";
import TaskStatus from "../components/Tasks/TaskStatus";
import UpdateTasks from "../components/Tasks/UpdateTasks";
import EntryWidget from "../components/EntryWidget";
import TasksLists from "../components/Tasks/TasksLists";
import Lists from "../components/Tasks/Lists";
import Describe from "../components/Tasks/Describe";
import Speech from '../components/speech'
import Quiz from '../components/Tasks/Quiz';
import AdminPrompt from '../components/Admin/adminPrompt'

function Bot(props) {
  const username = useLocation();

  const config = {
    botName: "AmBot",
    initialMessages: [
      createChatBotMessage(
        "Hi " + username.state.name + ", Welcome to AmFOSS !",
        {
          widget: "EntryWidget",
        }
      ),
    ],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#1f73b3",
      },
      chatButton: {
        backgroundColor: "#1f73b3",
      },
    },
    state: {
      messageData: {},
      messageUrl: "",
      user: username.state.name,
      tasksData: [],
      statusData: [],
      categoryType: "",
      tasksNum: "",
      correctAnswer: 0,
    },
    widgets: [
      {
        widgetName: "adminPrompt",
        widgetFunc: (props) => <AdminPrompt {...props} />,
      },
      {
        widgetName: "Speech",
        widgetFunc: (props) => <Speech {...props} />,
        mapStateToProps: ["user"],
      },
      {
        widgetName: "EntryWidget",
        widgetFunc: (props) => <EntryWidget {...props} />,
      },
      {
        widgetName: "PendingLists",
        widgetFunc: (props) => <Lists {...props} />,
        mapStateToProps: ["user"],
        props: { listType: "pending" },
      },
      {
        widgetName: "CompletedLists",
        widgetFunc: (props) => <Lists {...props} />,
        mapStateToProps: ["user"],
        props: { listType: "completed" },
      },
      {
        widgetName: "TasksLists",
        widgetFunc: (props) => <TasksLists {...props} />,
        mapStateToProps: ["user"],
      },
      {
        widgetName: "TrelloCards",
        widgetFunc: (props) => <TrelloCards {...props} />,
        mapStateToProps: ["messageData", "messageUrl"],
      },
      {
        widgetName: "TaskStatus",
        widgetFunc: (props) => <TaskStatus {...props} />,
        mapStateToProps: ["user"],
      },
      {
        widgetName: "UpdateTasks",
        widgetFunc: (props) => <UpdateTasks {...props} />,
        mapStateToProps: ["tasksData", "statusData", "user"],
      },
      {
        widgetName: "Quiz",
        widgetFunc: (props) => <Quiz {...props} />,
        mapStateToProps: ["user", "tasksNum", "correctAnswer", "statusData"]
      },
      {
        widgetName: "Recommend",
        widgetFunc: (props) => <RecommendOptions {...props} />,
        mapStateToProps: ["user"],
      },
      {
        widgetName: "Describe",
        widgetFunc: (props) => <Describe {...props} />,
        mapStateToProps: ["tasksNum", "user"],
      },
      {
        widgetName: "TrelloLinks",
        widgetFunc: (props) => <TrelloApp {...props} />,
      },
    ],
  };

  return (
    <Chatbot
      config={config}
      actionProvider={ActionProvider}
      messageParser={MessageParser}
    />
  );
}

export default Bot;
