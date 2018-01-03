import React, { Component } from 'react';
import '../assets/css/app.css';
import card_data from '../assets/helpers/card_data';

import Card from './card';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: card_data,
        };
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard(index) {
        const newCards = this.state.cards.slice();

        newCards[index].flipped = !newCards[index].flipped;

        this.setState({
            cards: newCards
        });
    }

    render() {

        const cardElements = this.state.cards.map((card, index) => {
            return <Card flip={() => { this.flipCard(index) }} key={index} card={card} />
        })

        return (
            <div className="app">
                <h1>Memory Match</h1>
                {cardElements}
            </div>
        );
    }
}

export default App;
