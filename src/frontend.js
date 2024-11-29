import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './frontend.scss';

const divsToUpdate = document.querySelectorAll('.cus-frontend-block');

divsToUpdate.forEach(function(div) {
    const data = JSON.parse(div.querySelector('pre').innerHTML)
    console.log(data)
    ReactDOM.render(<Quiz {...data} />, div);
    div.classList.remove('cus-frontend-block');
});

function Quiz(props) {
    const [isCorrect, setIsCorrect] = useState(undefined)
    const [isCorrectDelayed, setIsCorrectDelayed] = useState(undefined)

    useEffect(() => {
        if(isCorrect === false) {
            setTimeout(() => {
                setIsCorrect((undefined))
            }, 2600)
        }

        if(isCorrect === true) {
            setTimeout(() => {
                setIsCorrectDelayed(true)
            }, 0)
        }

    }, [isCorrect])

    function handleAnswer(index) {
        if(index == props.correctAnswer) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    }
    return (
        <div className="cus-frontend-block-ctr" style={{backgroundColor: props.bgColor, textAlign: props.theAlignment}}>
            <p>{props.question}</p>
            <ul>
                {
                    props.answers.map(function(answer, index) {
                        return (
                            <li onClick={isCorrect == true ? undefined : (() => handleAnswer(index))}>
                                {isCorrectDelayed === true && index == props.correctAnswer && ('√ ')}
                                {isCorrectDelayed === true && index != props.correctAnswer && ('× ')}
                                {answer}
                            </li>
                        )
                    })
                }
            </ul>
            <p className={'cusStyle' + (isCorrect == true ? ' correct' : ' notCorrect') }>is correct</p>
        </div>
    );
}