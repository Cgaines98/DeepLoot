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
            <div className="deck-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {deck.cards && deck.cards.length > 0 && deck.cards[0].image_uris && (
                <div style={{ height: '150px', overflow: 'hidden', borderRadius: '4px', marginBottom: '5px' }}>
                  <img 
                    src={deck.cards[0].image_uris.normal} 
                    alt={deck.name} 
                    style={{ width: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} 
                  />
                </div>
              )}
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{deck.name}</h3>
                <p style={{ color: '#aaa', fontSize: '0.85rem', margin: '0 0 5px 0' }}>{deck.format}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{deck.cards?.length || 0} cards</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
