import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styled from '@emotion/styled'
import TaskStatus from '../components/Tasks/TaskStatus'
import Lists from '../components/Tasks/Lists'
import RecommendOptions from '../components/Recommendation/RecommendOptions'
import TrelloApp from '../components/Trello/Trello'

const Text = styled.p`
color: black;
`;

function Speech(props) {

  const [isready, setIsready] = useState(false)

  const {
    finalTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening();

    setTimeout(function() {
        SpeechRecognition.stopListening();
        setIsready(true)
    }, 7000)
  }, [])

  function determineComponent(finalTranscript) {
    const lowerCaseMessage = finalTranscript.toLowerCase();

    if (lowerCaseMessage.includes("recommend") ||
    lowerCaseMessage.includes("suggest")) {
      return <RecommendOptions user={props.user} setState={props.setState} scrollIntoView={props.scrollIntoView} />
    }

    if(lowerCaseMessage.includes("trello") ||
    lowerCaseMessage.includes("boards")) {
      return <TrelloApp setState={props.setState} scrollIntoView={props.scrollIntoView}/>
    }

    if(lowerCaseMessage.includes('task')) {
      if(lowerCaseMessage.includes('pending') || lowerCaseMessage.includes("not completed")) {
        return <Lists user={props.user} setState={props.setState} scrollIntoView={props.scrollIntoView} listType="pending"/>
      } else if (lowerCaseMessage.includes("completed") || lowerCaseMessage.includes("finished") ||
      lowerCaseMessage.includes("finish") ||
      lowerCaseMessage.includes("complete")) {
        return <Lists user={props.user} setState={props.setState} scrollIntoView={props.scrollIntoView} listType="completed"/>
      }
      return <TaskStatus user={props.user} setState={props.setState} scrollIntoView={props.scrollIntoView}/>
    } 
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <Text>{finalTranscript}</Text>
      {/* finalTranscript contains text. We need to filter it out and map to correct component after filtering*/}
      {/* if (finalTranscript.include("task"))  Show Task component*/}
      {isready && determineComponent(finalTranscript)}
      {/* <TaskStatus  user={props.user} setState={props.setState} scrollIntoView={props.scrollIntoView}/> */}
    </div>
  );
};

export default Speech;