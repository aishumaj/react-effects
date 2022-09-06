import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const DECK_BASE_URL = "https://deckofcardsapi.com/api/deck";

/** Main application for deck of cards. Displays one card at a time from a 
 * shuffled deck on user click.
 * 
 * Props:
 * - none
 * 
 * States:
 * - deck: a shuffled deck of 52 cards, like {id, remaining}
 * - cards: array of card images
 * 
 * App -> DeckApp -> Card
 * 
 */
function DeckApp() {
  const [deck, setDeck] = useState({ id: null, remaining: null });
  const [cards, setCards] = useState([]);

  /** Creates a new deck from API on mount. */
  useEffect(function createShuffledDeck() {
    async function shuffleDeck() {
      const deckResult = await axios.get(`${DECK_BASE_URL}/new/shuffle/?deck_count=1`);
      setDeck({
        id: deckResult.data.deck_id,
        remaining: deckResult.data.remaining
      });
    }

    shuffleDeck();
  }, []);

  /**Draws random card and adds to cards array on each user click, and updates
   * deck.remaining state.
   */
  async function drawCard() {
    const cardResult = await axios.get(`${DECK_BASE_URL}/${deck.id}/draw/?count=1`);
    const newCard = cardResult.data.cards[0].image;
    setCards(cards => [...cards, newCard]);
    setDeck({ ...deck, remaining: cardResult.data.remaining });
  }

  return (
    <div className="cardDeck">
      {deck.remaining === 0 &&
        <h1>Error: no cards remaining!</h1>}
      <button disabled={deck.remaining === 0}
        onClick={drawCard}>
        Draw A Card
      </button>
      <div className="cards">
        {cards.map(card =>
          <Card
            key={card}
            card={card}
          />
        )}
      </div>
    </div>
  );
}

export default DeckApp;