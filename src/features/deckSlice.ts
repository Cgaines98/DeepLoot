import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface CardRef {
  oracleId: string;
  name: string;
}

export interface DeckCardEntry {
  card: CardRef;
  quantity: number;
  sideboard: boolean;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: DeckCardEntry[];
}

interface DeckState {
  decks: Deck[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: DeckState = {
  decks: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch decks from the backend
export const fetchDecks = createAsyncThunk(
  'decks/fetchDecks',
  async () => {
    const response = await fetch('/api/decks');
    if (!response.ok) {
      throw new Error('Failed to fetch decks');
    }
    return (await response.json()) as Deck[];
  }
);

export const deckSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    // We can add sync reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDecks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDecks.fulfilled, (state, action: PayloadAction<Deck[]>) => {
        state.status = 'idle';
        state.decks = action.payload;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default deckSlice.reducer;
