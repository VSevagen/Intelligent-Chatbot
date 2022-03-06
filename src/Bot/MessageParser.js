// MessageParser starter code in MessageParser.js
class MessageParser {
  constructor(actionProvider, config) {
    this.actionProvider = actionProvider;
    this.config = config;
    // this.setShowAdmin = setShowAdmin;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if(message === "/setQuestions") {
      this.actionProvider.handleAdmin();
    }
    else if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    } else if (
      lowerCaseMessage.includes("describe") ||
      lowerCaseMessage.includes("explain") ||
      lowerCaseMessage.includes("explanaition")
    ) {
      // this is a regular expression used to check whether there is a number in string
      if (/\d/.test(lowerCaseMessage)) {
        let num = lowerCaseMessage.match(/\d+/)[0];
        this.actionProvider.handleDescribe(num);
      } else {
        this.handleEnd();
      }
    } else if (
      lowerCaseMessage.includes("recommend") ||
      lowerCaseMessage.includes("suggest")
    ) {
      this.actionProvider.handleRecommend();
    } else if (
      lowerCaseMessage.includes("trello") ||
      lowerCaseMessage.includes("boards")
    ) {
      this.actionProvider.handleTrello();
    } else if (lowerCaseMessage.includes("tasks") || lowerCaseMessage.includes("task")) {
      if (
        lowerCaseMessage.includes("pending") ||
        lowerCaseMessage.includes("not completed")
      ) {
        this.actionProvider.handlePendingTasks();
      } else if (
        lowerCaseMessage.includes("update") && lowerCaseMessage.includes('completed')
      ) {
        if (/\d/.test(lowerCaseMessage)) {
          let num = lowerCaseMessage.match(/\d+/)[0];
          this.actionProvider.handleUpdateTasks(num);
        }
      } else if (
        lowerCaseMessage.includes("completed") ||
        lowerCaseMessage.includes("finished") ||
        lowerCaseMessage.includes("finish") ||
        lowerCaseMessage.includes("complete")
      ) {
        this.actionProvider.handleCompletedTasks();
      } else {
        this.actionProvider.handleTasks()
      }
    } else if(lowerCaseMessage.includes("speech on")){
      this.actionProvider.speech();
    } else {
      this.actionProvider.handleEnd(message);
    }
  }
}

export default MessageParser;
