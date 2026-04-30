import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Deck, DeckCard } from '../types';
import { scryfallService, deckService } from '../services/api';
import { Search, Save, Trash2, Plus, Minus } from 'lucide-react';

const DeckEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deck, setDeck] = useState<Deck>({ name: 'New Deck', cards: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Card[]>([]);

  useEffect(() => {
    if (id && id !== 'new') {
      deckService.getDeck(id).then(setDeck);
    }
  }, [id]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const results = await scryfallService.searchCards(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const addCard = (card: Card) => {
    const existing = deck.cards.find(c => c.id === card.id);
    if (existing) {
      setDeck({
        ...deck,
        cards: deck.cards.map(c => c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c)
      });
    } else {
      setDeck({
        ...deck,
        cards: [...deck.cards, { ...card, quantity: 1 }]
      });
    }
  };

  const updateQuantity = (cardId: string, delta: number) => {
    setDeck({
      ...deck,
      cards: deck.cards.map(c => {
        if (c.id === cardId) {
          const newQty = Math.max(0, c.quantity + delta);
          return { ...c, quantity: newQty };
        }
        return c;
      }).filter(c => c.quantity > 0)
    });
  };

  const saveDeck = async () => {
    try {
      await deckService.saveDeck(deck);
      navigate('/');
    } catch (error) {
      alert('Failed to save deck. Is the backend running?');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <input
            style={{ fontSize: '1.5rem', background: 'transparent', border: 'none', borderBottom: '1px solid #333' }}
            value={deck.name}
            onChange={e => setDeck({ ...deck, name: e.target.value })}
          />
          <button onClick={saveDeck} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={18} /> Save Deck
          </button>
        </div>

        <div className="card-list">
          {deck.cards.length === 0 && <p>No cards in deck. Use search to add some!</p>}
          {deck.cards.map(card => (
            <div key={card.id} className="card-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 'bold', width: '20px' }}>{card.quantity}x</span>
                <span>{card.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => updateQuantity(card.id, -1)} style={{ padding: '4px 8px', background: '#444' }}><Minus size={14} /></button>
                <button onClick={() => updateQuantity(card.id, 1)} style={{ padding: '4px 8px', background: '#444' }}><Plus size={14} /></button>
                <button onClick={() => updateQuantity(card.id, -card.quantity)} style={{ padding: '4px 8px', background: '#f44336' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#1f1f1f', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
        <h3>Search Cards</h3>
        <form onSubmit={handleSearch} className="search-container">
          <input
            placeholder="Search Scryfall..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit"><Search size={18} /></button>
        </form>

        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {searchResults.map(card => (
            <div
              key={card.id}
              className="card-item"
              style={{ cursor: 'pointer', marginBottom: '5px', fontSize: '0.9rem' }}
              onClick={() => addCard(card)}
            >
              <span>{card.name}</span>
              <Plus size={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckEditor;
