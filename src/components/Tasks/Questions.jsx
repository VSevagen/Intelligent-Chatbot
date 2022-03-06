import React,  {useState} from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
font-size: 1rem;
margin-bottom: 10px;
`;

const Questions = (props) => {

    const [optionsState, setOptionState] = useState('');
    const [score, setScore] = useState(0);

    const handleChange = (event) => {
        setOptionState(event.target.value);
        if(event.target.value === props.answer) {
            if(score === 0) {
                props.handleCorrectAnswer();
                setScore(1);
            }
        } else {
            if(score === 1) {
                props.handleWrongAnswer();
                setScore(0);
            }
        }
    }

    return(
        <Container>
            <div>{props.question}</div>
            <select value={optionsState} onChange={handleChange}>
            {props.options?.map((op) => (
                <option value={op} selected={optionsState === op}>{op}</option>
            ))}
            </select>
        </Container>
    )
}

export default Questions;