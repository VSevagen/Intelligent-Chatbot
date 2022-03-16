import React, {useEffect, useState} from 'react';
import supabase from "../API/Supabase";
import styled from '@emotion/styled'
import Questions from './Questions'

const TasksContainer = styled.div`
  background-color: #2898ec;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin: -5px 0px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Message = styled.div`
font-size: 1.2rem;
font-weight: 500;
margin: auto;
margin-top: 20px;
height: 100%;
width: 80%;
text-align: center;
background-color: ${props => props.good ? '#3bb805' : '#dc3545'};
border-radius: 10px;
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

const Quiz = (props) => {


    useEffect(() => {
        const fetchQuiz = async () => {
            let { data: QuizData, error } = await supabase
            .from("Quiz")
            .select('*')
            .eq ("id", props.tasksNum)
            if (error) console.log("Error ", error);

            setData(QuizData)
        }

        const fetchOptions = async () => {
            let { data: Options, error } = await supabase
            .from("Quiz")
            .select('Options')
            .eq ("id", props.tasksNum)
            if (error) console.log("Error ", error);

            setOptions(Options[0]?.Options);
        }

        const fetchAnswers = async () => {
            let { data: Answers, error } = await supabase
            .from("Quiz")
            .select('Answers')
            .eq ("id", props.tasksNum)
            if (error) console.log("Error ", error);

            setAnswers(Answers[0]?.Answers);
        }

        fetchOptions().finally(() => console.log("fetched options", options))
        fetchQuiz().finally(() => console.log("Fetched", data))
        fetchAnswers().finally(() => console.log("Fetched answers", answers, props))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [goodResult, setGoodResult] = useState(false);
    const [badResult, setBadResult] = useState(false);

    const handleCorrectAnswer = () => {
        props.actionProvider.handleIncrement(props.correctAnswer);
    }

    const handleWrongAnswer = () => {
        props.actionProvider.handleDecrement(props.correctAnswer);
    }

    function handleResult () {

        if(props.correctAnswer === 5 ) {
            let statusArray = props.statusData;
            statusArray[props.tasksNum - 1] = 'completed';
            const updateTasks = async (status) => {
                let { data: Tasks, error } = await supabase
                .from("Tasks")
                .update({ status: status })
                .eq("Name", props.user);
                if (error) console.log("Error ", error);
            }
            setGoodResult(true);
            setBadResult(false);
            updateTasks(statusArray).finally(() => props.actionProvider.handleTasks());
        } else {
            setGoodResult(false);
            setBadResult(true);
        }

    }

    return (
    <TasksContainer>
        {data[0]?.Questions.map((q, index) => (
            <Questions question={q} tasksNum={props.tasksNum} options={options[index]} answer={answers[index]} handleCorrectAnswer={handleCorrectAnswer} handleWrongAnswer={handleWrongAnswer}/>
        ))}
        <Button onClick={handleResult}>Submit</Button>
        {goodResult && 
        <Message good>Congratulation, you got everything right !</Message>}
        {badResult && <Message bad>Too bad. Got some wrong answers ! </Message>}

    </TasksContainer>
    )
}

export default Quiz;