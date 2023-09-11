import { nanoid } from "nanoid"

export default function Questions({q,handleClickAnswer,id}) {

    const handleAnswer = (answer) => {
        console.log(answer)
        if(q.checked){
            return  
        }
        handleClickAnswer(id,answer)
    };

    let answers = q.answers;
    const answerElements = answers.map(answer => {
        let id = null;
        if(q.checked){
            if(q.correct === answer){
                id = 'correct'
            }else if(q.selected === answer){
                id = 'incorrect'
            }else{
                id = 'not_selected'
            }
        }
        return (
            <button 
            key={nanoid()}
            id={id}
            className={answer === q.selected ? 'answer selected' : 'answer'}
            onClick={()=>handleAnswer(answer)}>{atob(answer)}</button>
        )
    });
    return (
        <div className="question--container">
            <h3 className="questions">{atob(q.question)}</h3>
            <span className="answers">{answerElements}</span>
            <div className="line"></div>
        </div>
    )
}