import React from 'react';
import '../assets/css/card.css';

export default props => {

    /*
        props = {
            flip: function(){...},
            card: {
                front: 'some/url/',
                back: 'some/url/',
                flipped: true/false
            }
        }
    */

    const { flip, card: { front, back, flipped } } = props;

    return (
        <div className="card">
            <div className="front">
                <img src={front} alt="card front" />
            </div>
            <div onClick={flip} className={`back ? ${flipped ? 'flipped' : ''}`}>
                <img src={back} alt="card back" />
            </div>
        </div>
    )
}