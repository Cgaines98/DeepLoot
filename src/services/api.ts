import axios from 'axios';
import { Card, Deck } from '../types';

const SCRYFALL_API = 'https://api.scryfall.com';
const BACKEND_API = 'http://localhost:8080/api'; // Standard Spring Boot port

export const scryfallService = {
  searchCards: async (query: string): Promise<Card[]> => {
    const response = await axios.get(`${SCRYFALL_API}/cards/search`, {
      params: { q: query }
    });
    return response.data.data;
  }
};

export const deckService = {
  getDecks: async (): Promise<Deck[]> => {
    try {
      const response = await axios.get(`${BACKEND_API}/decks`);
      return response.data;
    } catch (e) {
      console.warn('Backend not available, returning mock data');
      return [{ id: 1, name: 'Sample Deck', cards: [] }];
    }
  },
  saveDeck: async (deck: Deck): Promise<Deck> => {
    const response = await axios.post(`${BACKEND_API}/decks`, deck);
    return response.data;
  },
  getDeck: async (id: string): Promise<Deck> => {
    const response = await axios.get(`${BACKEND_API}/decks/${id}`);
    return response.data;
  }
};
