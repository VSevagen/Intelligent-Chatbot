import getResponse from "./NLP";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.");
    this.updateChatbotState(greetingMessage);
  }

  handleAdmin() {
    const message = this.createChatBotMessage(("Confirming request..."),{
      widget: "adminPrompt"
    });
    this.updateChatbotState(message);
  }

  handleTrello = () => {
    const message = this.createChatBotMessage("Find your boards here", {
      widget: "TrelloLinks",
    });
    this.updateChatbotState(message);
  };

  handleMessage = (data, url) => {
    const message = this.createChatBotMessage("Find you lists below", {
      widget: "TrelloCards",
    });

    this.updateChatbotState(message);
    this.setState((state) => ({
      ...state,
      loading: false,
      messageData: data,
      messageUrl: url,
    }));
  };

  handleTasks = () => {
    const message = this.createChatBotMessage(
      "Find your tasks and status below",
      {
        widget: "TaskStatus",
      }
    );

    this.updateChatbotState(message);
  };

  handleTasksLists = () => {
    const message = this.createChatBotMessage("Find your tasks below", {
      widget: "TasksLists",
    });

    this.updateChatbotState(message);
  };

  handleUpdateTasks = (num) => {
    const message = this.createChatBotMessage("Take the following test to update your tasks", {
      widget: "Quiz",
    });
    this.setState((state) => ({
      ...state,
      loading: false,
      tasksNum: num,
    }));

    this.updateChatbotState(message);
  };

  handleIncrement = (correctAnswer) => {
    console.log("Called")
    this.setState((state) => ({
      ...state,
      loading: false,
      correctAnswer: correctAnswer+1,
    }));
  }

  handleDecrement = (correctAnswer) => {
    this.setState((state) => ({
      ...state,
      loading: false,
      correctAnswer: correctAnswer-1,
    }));
  }

  handlePendingTasks = () => {
    const message = this.createChatBotMessage(
      "Find your pending tasks below..",
      {
        widget: "PendingLists",
      }
    );

    this.updateChatbotState(message);
  };

  handleCompletedTasks = () => {
    const message = this.createChatBotMessage(
      "Find your completed tasks below...",
      {
        widget: "CompletedLists",
      }
    );

    this.updateChatbotState(message);
  };

  handleStatusUpdate = () => {
    const message = this.createChatBotMessage("Updating....Please wait", {
      widget: "Tasks",
    });

    this.updateChatbotState(message);
  };

  handleEnd = (message) => {
    const res = getResponse(message).then((response) => {
      const message = this.createChatBotMessage(response.answer);
      this.updateChatbotState(message);
    });
  };

  handleRecommend = () => {
    const message = this.createChatBotMessage("Fetching data...please wait", {
      widget: "Recommend",
    });
    this.updateChatbotState(message);
  };

  handleDescribe = (num) => {
    const message = this.createChatBotMessage("Fetching data....please wait", {
      widget: "Describe",
    });
    this.setState((state) => ({
      ...state,
      loading: false,
      tasksNum: num,
    }));
    this.updateChatbotState(message);
  };

  handleProblemSolving = () => {
    const message = this.createChatBotMessage("Please find the task below", {
      widget: "RecommendProblemSolving",
    });
    this.updateChatbotState(message);
  };

  speech = () => {
    const message = this.createChatBotMessage("Activated voice recongition", {
      widget: "Speech"
    });
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
