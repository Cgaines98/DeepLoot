export interface Card {
  id: string; // This is Scryfall ID
  oracle_id: string;
  name: string;
  mana_cost?: string;
  type_line?: string;
  set?: string;
  collector_number?: string;
  image_uris?: {
    normal: string;
    small: string;
  };
  card_faces?: Array<{
    image_uris?: {
      normal: string;
      small: string;
    };
  }>;
}

export interface DeckCard extends Card {
  quantity: number;
}

export interface Deck {
  id?: string; // UUID from backend
  name: string;
  format: string;
  description?: string;
  mainboard: DeckCard[];
  sideboard: DeckCard[];
  cards?: DeckCard[]; // Legacy support for UI if needed, but we should use mainboard/sideboard
}
