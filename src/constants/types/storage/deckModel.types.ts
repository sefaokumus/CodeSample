import { Action, Thunk } from 'easy-peasy'

import { FetchDecksRequest, GetDeckBySlugRequest, GetDeckRequest, UpdateDeckRequest } from '../services'

export type CardItem = {
  id: string
  title: string
  body: string
  tags: string
}

export interface DeckItem{
  id: string
  name: string
  public: number
  tags: string[]
  user_id: number
  created_at: string
  updated_at: string
  cards : CardItem[]
  is_public: boolean,
  slug: string
  original_id?: string | number | null,
  description?: string,
  summary?: string,
  question_enabled: boolean,
  summary_structure: { id: string, title: string }[] | null
  is_owner: boolean
}

export interface DeckModel{
  data: DeckItem[] | null
  selectedDeck: DeckItem | null |undefined
  deckCache: { [key : string] : DeckItem | null | undefined }
  isLoading: boolean
  isUpdating: boolean
  error: any

  setData: Action<DeckModel, DeckItem[] | null>
  setSelectedDeck: Action<DeckModel, DeckItem | null | undefined>
  cacheDeck: Action<DeckModel, DeckItem | null | undefined>
  setError: Action<DeckModel, any>
  setIsLoading: Action<DeckModel, boolean>
  setIsUpdating: Action<DeckModel, boolean>

  fetchDecks: Thunk<DeckModel, FetchDecksRequest>
  getDeck: Thunk<DeckModel, GetDeckRequest>
  getDeckBySlug: Thunk<DeckModel, GetDeckBySlugRequest>
  updateDeck : Thunk<DeckModel, UpdateDeckRequest>
}
