import { useEffect, useState } from 'react'
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import blob from '../src/assets/blob.svg'
import Menu from './Components/Menu'
import axios from 'axios'
import {nanoid} from 'nanoid'
import Questions from './Components/Questions'

function App() {
  const [started,setStarted] = useState(false);
  const [count,setCount] = useState(0);
  const [correct,setCorrect] = useState(0);
  const [checked,setChecked] = useState(false);
  const [ question,setQuestion] = useState([]);

  const start = () => {
    setStarted(!started);
  }; 
  const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5)
  };
  const getQuestions =async () => {
    await axios.get('https://opentdb.com/api.php?amount=5&category=18&encode=base64')
    .then(function (response) {
    const data = response.data;
    let q = [];
    data.results.forEach(question => {
      q.push({
        id: nanoid(),
        question: question.question,
        correct: question.correct_answer,
        selected: null,
        checked: false,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
      });
    });
    setQuestion(q);
    console.log(q);
    })
  }
  useEffect(() => {
    getQuestions()
    },[count]);

  //Check Answer
  const handleCheck = () => {
    let selected = true;
    question.forEach(question => {
      if(question.selected === null){
        selected = false
      }
    })
    if(!selected){
      return
    }
    const checkedAnswers = question.map(question => {
      return {...question,checked: true}
    });
    setQuestion(checkedAnswers);
    setChecked(true);
    let correct = 0;
    question.forEach(question => {
      if(question.correct === question.selected){
        correct += 1;
      }
    })
    setCorrect(correct)
  }
  //Select Answer
  const handleClickAnswer = (id,answer) => {
    const selectedAnswers = question.map(question => {
      return question.id === id ?
      {...question,selected: answer} : question
    })
    console.log(selectedAnswers)
    setQuestion(selectedAnswers)
  };
  //Play Again
  const handlePlayAgain = () => {
    setCount (count => count + 1);
    setChecked(false);
  };
  //Questions
  const questionElements = question ? 
        question.map(question => {
          return (
            <Questions key={question.id} q={question} id={question.id} handleClickAnswer={handleClickAnswer}/>
          )
        }) : [];

  return (
    <div className='main--container'>
     <div className='content--container'>
      {started ? 
      <div className='start--content--container'>
        {questionElements}
        <div className='end--div'>
          {checked && <span className='score'>You scored <span className='fw-bold'>{correct}/5</span> correct answers.</span>}
          <button onClick={checked ? handlePlayAgain : handleCheck}
          className='check--button'>{checked ? 'Play Again' : 'Check Answer'}</button>
        </div>
      </div> : <Menu start={start}/> }
     </div>
     <div className='blob'>
        <img src={blob} className='blob--svg' alt='blob--img'/>
     </div>
    </div>
  )
}
export default App
