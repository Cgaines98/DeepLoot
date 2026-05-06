import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deckService } from '../services/api';
import { Deck } from '../types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (token) {
      loadDecks();
    }
  }, [token]);

  const loadDecks = () => {
    deckService.getDecks()
      .then(setDecks)
      .catch(err => {
        console.error('Failed to load decks', err);
        // Optionally handle 401 specifically if it still happens
      });
  };

  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deckService.deleteDeck(id);
        loadDecks();
      } catch (error) {
        console.error('Failed to delete deck', error);
        alert('Failed to delete deck');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>My Decks</h1>
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }}>Welcome back, {user?.name}</p>
        </div>
        <Link to="/decks/new">
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={18} /> New Deck
          </button>
        </Link>
      </div>
      <div className="deck-grid">
        {decks.map(deck => (
          <Link key={deck.id} to={`/decks/${deck.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="deck-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
              <button 
                onClick={(e) => handleDelete(e, deck.id!, deck.name)}
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  zIndex: 2,
                  padding: '5px',
                  background: 'rgba(244, 67, 54, 0.8)',
                  borderRadius: '4px'
                }}
                title="Delete Deck"
              >
                <Trash2 size={16} />
              </button>
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
