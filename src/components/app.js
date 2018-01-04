import React, { Component } from 'react';
import '../assets/css/app.css';
import card_data from '../assets/helpers/card_data';
import { doubleArray, shuffleArray } from '../assets/helpers';

import Card from './card';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstCardIndex: null,
            cards: [],
            matches: 0,
            attempts: 0,
            gameState: 'ready'
        };
        this.flipCard = this.flipCard.bind(this);
        this.blockClick = false;
    }

    componentDidMount() {
        this.setState({
            cards: shuffleArray(doubleArray(card_data))
        })
    }

    flipCard(index) {
        const newCards = this.state.cards.slice();

        newCards[index].flipped = !newCards[index].flipped;

        this.setState({
            cards: newCards
        });
    }

    handleCardClick(index) {

        if (this.blockClick) return;
        // if(this.blockClick) {
        //  return;
        // }

        const { firstCardIndex, cards } = this.state;
        let matches = this.state.matches;
        let attempts = this.state.attempts;
        let cardIndex = null;
        let gameState = this.state.gameState;

        if (firstCardIndex === null) {
            console.log('First card clicked');
            cardIndex = index;

            this.flipCard(index);
        } else {
            this.blockClick = true;
            console.log("Second card clicked");
            attempts++;
            const card1 = cards[firstCardIndex].front;
            const card2 = cards[index].front;
            this.flipCard(index);

            if (card1 === card2) {
                console.log('Match');
                matches++;

                if (matches === cards.length / 2) {
                    console.log("Game won!");
                    gameState = 'won';
                }
                this.blockClick = false;

            } else {
                console.log('not a match');

                setTimeout(() => {
                    this.flipCard(firstCardIndex);
                    this.flipCard(index);
                    this.blockClick = false;
                }, 1000);

            }
        }

        this.setState({
            firstCardIndex: cardIndex,
            matches: matches,
            attempts: attempts,
            gameState: gameState
        });

    }

    render() {

        const { cards, attempts, matches, gameState } = this.state;

        const cardElements = cards.map((card, index) => {
            return <Card flip={() => { this.handleCardClick(index) }} key={index} card={card} />
        })

        return (
            <div className="app">
                <h1>Memory Match</h1>
                <h3>Accuracy: {attempts ? ((matches / attempts) * 100).toFixed(2) : 0}%</h3>
                <div className="game-board">
                    {cardElements}
                </div>
                <h1>{gameState === 'won' ? "You won!" : ''}</h1>
            </div>
        );
    }
}

export default App;
