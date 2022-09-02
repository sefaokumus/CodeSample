import { DeckItem } from '../storage'

//  FetchDecks
export type FetchDecksRequest = {
  token: string | null
}
export interface FetchDecksResponse  {
  status: boolean | string
  data: DeckItem[] | null
  message? : string
}

// GetDeck
export type GetDeckRequest = {
  token: string | null
  id: string,
}

export interface GetDeckResponse {
  status: boolean | string
  data?: DeckItem
  message?: string
}

// GetDeckBySlug
export type GetDeckBySlugRequest = {
  token: string | null
  slug: string,
}

export interface GetDeckBySlugResponse {
  status: boolean | string
  data?: DeckItem
  message?: string
}

// UpdateDeck

export type UpdateDeckRequest = {
  token: string | null
  id: string
  data: DeckItem
}

export interface UpdateResponse {
  status: boolean | string
  data?: DeckItem
  message?: string
}
