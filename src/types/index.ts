export interface Card {
  id: string;
  name: string;
  mana_cost?: string;
  type_line?: string;
  image_uris?: {
    normal: string;
    small: string;
  };
}

export interface DeckCard extends Card {
  quantity: number;
}

export interface Deck {
  id?: number;
  name: string;
  description?: string;
  cards: DeckCard[];
}
