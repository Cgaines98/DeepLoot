import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDecks } from '../features/deckSlice';

export const DeckList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { decks, status, error } = useAppSelector((state) => state.decks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDecks());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading decks...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Decks</h2>
      {decks.length === 0 ? (
        <p>No decks found. Create one!</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id}>
              <strong>{deck.name}</strong> - {deck.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
