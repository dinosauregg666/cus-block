import React from 'react';
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
    return (
        <div className="cus-frontend-block-ctr">
            <p>{props.question}</p>
            <ul>
                {
                    props.answers.map(function(answer) {
                        return <li>{answer}</li>
                    })
                }
            </ul>
        </div>
    );
}