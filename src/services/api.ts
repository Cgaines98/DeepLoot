import axios from 'axios';
import { Card, Deck, DeckCard } from '../types';

const SCRYFALL_API = 'https://api.scryfall.com';
const BACKEND_API = 'http://localhost:8080/api'; // Standard Spring Boot port

const api = axios.create({
  baseURL: BACKEND_API
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const scryfallService = {
  searchCards: async (query: string): Promise<Card[]> => {
    const response = await axios.get(`${SCRYFALL_API}/cards/search`, {
      params: { q: query }
    });
    return response.data.data;
  }
};

const mapDeck = (deck: any): Deck => ({
  ...deck,
  cards: (deck.mainboard || []).map((entry: any) => {
    const cardData = entry.card;
    let imageUris = undefined;
    
    if (cardData.imageUris) {
      try {
        imageUris = typeof cardData.imageUris === 'string' ? JSON.parse(cardData.imageUris) : cardData.imageUris;
      } catch (e) {
        console.error('Failed to parse imageUris', e);
      }
    }

    return {
      ...cardData,
      id: cardData.oracleId,
      oracle_id: cardData.oracleId,
      name: cardData.name, // Ensure name is present
      quantity: entry.quantity,
      image_uris: imageUris,
      mana_cost: cardData.manaCost,
      type_line: cardData.typeLine
    };
  })
});

export const deckService = {
  getDecks: async (): Promise<Deck[]> => {
    try {
      const response = await api.get('/decks');
      return response.data.map(mapDeck);
    } catch (e) {
      console.warn('Backend not available, returning mock data');
      return [{ id: '1', name: 'Sample Deck', format: 'Standard', mainboard: [], sideboard: [], cards: [] }];
    }
  },
  createDeck: async (deck: Partial<Deck>): Promise<Deck> => {
    const response = await api.post('/decks', {
      name: deck.name,
      format: deck.format,
      description: deck.description
    });
    return mapDeck(response.data);
  },
  updateDeck: async (id: string, deck: Partial<Deck>): Promise<Deck> => {
    const response = await api.put(`/decks/${id}`, {
      name: deck.name,
      format: deck.format,
      description: deck.description
    });
    return mapDeck(response.data);
  },
  upsertCard: async (deckId: string, card: DeckCard, sideboard: boolean = false): Promise<Deck> => {
    const response = await api.put(`/decks/${deckId}/cards`, {
      card: {
        oracleId: card.oracle_id,
        name: card.name,
        setCode: card.set,
        collectorNumber: card.collector_number,
        manaCost: card.mana_cost,
        typeLine: card.type_line,
        imageUris: card.image_uris ? JSON.stringify(card.image_uris) : undefined
      },
      quantity: card.quantity,
      sideboard
    });
    return mapDeck(response.data);
  },
  removeCard: async (deckId: string, oracleId: string, sideboard: boolean = false): Promise<Deck> => {
    const response = await api.delete(`/decks/${deckId}/cards/${oracleId}`, {
      params: { sideboard }
    });
    return mapDeck(response.data);
  },
  getDeck: async (id: string): Promise<Deck> => {
    const response = await api.get(`/decks/${id}`);
    return mapDeck(response.data);
  },
  deleteDeck: async (id: string): Promise<void> => {
    await api.delete(`/decks/${id}`);
  },
  // Keep saveDeck for compatibility but implement it as update or create
  saveDeck: async (deck: Deck): Promise<Deck> => {
    if (deck.id) {
      return deckService.updateDeck(deck.id, deck);
    } else {
      return deckService.createDeck(deck);
    }
  }
};
