import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deckService } from '../services/api';
import { Deck } from '../types';
import { PlusCircle } from 'lucide-react';

const Home: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    deckService.getDecks().then(setDecks);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Decks</h1>
        <Link to="/decks/new">
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={18} /> New Deck
          </button>
        </Link>
      </div>
      <div className="deck-grid">
        {decks.map(deck => (
          <Link key={deck.id} to={`/decks/${deck.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="deck-card">
              <h3>{deck.name}</h3>
              <p>{deck.cards.length} cards</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
