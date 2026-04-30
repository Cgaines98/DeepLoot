import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import deckReducer from '../features/deckSlice';

export const store = configureStore({
  reducer: {
    decks: deckReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
