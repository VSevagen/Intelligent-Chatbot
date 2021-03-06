import React, { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import supabase from '../API/Supabase';
import '../Admin/styles.css';
import { adminContext } from '../../contexts/admin-context';

const Container = styled.div`
height: 100%;
width: 50%;
float: left;
`;

const Admin = (props) => {

    const value = useContext(adminContext);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [options, setOptions] = useState([]);
    const [task, setTask] = useState(0);
    const [tasks, setTasks] = useState([]);

    const data = async () => {
        const arr = [];
        const arr_questions = questions.split('"').filter(word => word.length>1);
        const arr_options = options.split('"').filter(word => word.length>1);
        const arr_answers = answers.split('"').filter(word => word.length>1);

        if(arr_options.length > 4) {
            for(let i=0;i<arr_options.length;i+=4) {
                const new_arr = arr_options.slice(i, i+4);
                console.log(new_arr);
                arr.push(new_arr);
            }
        }

        let {data: Quiz, error} = await supabase
            .from('Quiz')
            .insert([
                {Questions: arr_questions, Options: arr, Answers: arr_answers, task_id: task}
            ]);
        if(error) console.log("Error ", error);
    };

    function handleSubmit(e) {
        e.preventDefault();
        data()
    }

    const getData = async () => {
        let { data: Tasks, error } = await supabase
          .from("Tasks")
          .select("Tasks");
        if (error) console.log("Error", error);
        setTasks(Tasks[0].Tasks);
    };

    useEffect(() => {
        getData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return(
        <React.Fragment>
            {value.showAdmin &&
                <Container>
                    <div className="form-style-2">
                        <div className="form-style-2-heading">
                            <span>Write your Questions</span>
                            <button className="close" onClick={() => value.setShowAdmin(false)}>X</button>
                        </div>
                        <form>
                        <label for="field1"><span>Questions <span className="required">*</span></span><textarea name="field1" className="textarea-field" value={questions} onChange={(e) => setQuestions(e.target.value)}></textarea></label>
                        <label for="field5"><span>Options <span className="required">*</span></span><textarea name="field3" className="textarea-field" value={options} onChange={(e) => setOptions(e.target.value)}></textarea></label>
                        <label for="field5"><span>Answers <span className="required">*</span></span><textarea name="field5" className="textarea-field" value={answers} onChange={(e) => setAnswers(e.target.value)}></textarea></label>
                        <label for="field6"><span>Task <span className="required">*</span></span>
                            <select className="select-field" onChange={e => setTask(e.target.value)}>
                                <option value="0">Select</option>
                                {tasks.map((task, index) => {
                                    const data = JSON.parse(task);
                                    const content = data.content.split(':')[1];
                                    return <option value={index + 1}>{content}</option>
                                })}
                            </select>
                        </label>
                        <button className="submit" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </Container>
            }
        </React.Fragment>
    )
}

export default Admin;