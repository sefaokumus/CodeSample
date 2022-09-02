
import { action, thunk } from 'easy-peasy'

import {  DeckModel }                                     from '../constants/types/storage'
import { FetchDecks, GetDeck, GetDeckBySlug, UpdateDeck } from '../services/decksService'

export const deckModel: DeckModel = {
  data: null,
  selectedDeck: null,
  deckCache: {},
  isLoading: false,
  isUpdating: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),
  setSelectedDeck: action((state, deck) => {
    state.selectedDeck = deck
  }),
  cacheDeck: action((state, data) => {
    if (data?.id) {
      state.deckCache[data.id] = data
    }
  }),
  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),
  setIsUpdating: action((state, isUpdating) => {
    state.isUpdating = isUpdating
  }),

  fetchDecks: thunk((actions, payload) => {
    actions.setIsLoading(true)
    FetchDecks(payload).then(res => {
      actions.setIsLoading(false)

      if (res.status) {
        actions.setData(res.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => { actions.setError(err); actions.setIsLoading(false) })
  }),
  getDeck: thunk((actions, payload, { getState }) => {
    const state = getState()
    actions.setIsLoading(true)

    // if deck is already in cache, return it
    if (state.deckCache[payload.id]) {
      actions.setSelectedDeck(state.deckCache[payload.id])
      actions.setIsLoading(false)
      return
    }

    GetDeck(payload).then(res => {
      actions.setIsLoading(false)

      if (res.status) {
        actions.setSelectedDeck(res.data)
        actions.cacheDeck(res.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => { actions.setError(err); actions.setIsLoading(false) })
  }),

  getDeckBySlug: thunk((actions, payload) => {
    actions.setIsLoading(true)
    GetDeckBySlug(payload).then(res => {
      actions.setIsLoading(false)

      if (res.status) {
        actions.setSelectedDeck(res.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => { actions.setError(err); actions.setIsLoading(false) })
  }),
  updateDeck: thunk((actions, payload) => {
    actions.setIsUpdating(true)
    UpdateDeck(payload).then(res => {
      actions.setIsUpdating(false)

      if (res.status) {
        actions.setSelectedDeck(res.data)
        actions.cacheDeck(res.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => { actions.setError(err); actions.setIsUpdating(false) })
  })

}
