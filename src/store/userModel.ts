import {  action,  thunk } from 'easy-peasy'

import { UserModel } from '../constants/types/storage'
import {
  GetDeckStructure,
  GetRevisionHistory,
  GetUserInterests,
  GetUserStats,
  SaveHistoricalRevision,
  UpdateRevision,
  UpdateUserInterests,
  UpdateUserStats
} from '../services/usersService'

export const userModel: UserModel = {
  revisionHistory: [],
  interests: [],
  stats: null,
  structure: null,
  isLoading: false,
  isUpdating: false,
  error: null,

  setRevisionHistory: action((state, revisionHistory) => {
    state.revisionHistory = revisionHistory
  }),
  setStats: action((state, stats) => {
    state.stats = stats
  }),
  setInterests: action((state, interests) => {
    state.interests = interests
  }),
  setStructure: action((state, structure) => {
    state.structure = structure
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

  getRevisionHistory: thunk((actions, payload) => {
    actions.setIsLoading(true)
    GetRevisionHistory(payload).then(res => {
      actions.setIsLoading(false)

      if (res.status) {
        actions.setRevisionHistory(res.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => {
      actions.setError(err)
      actions.setIsLoading(false)
    })
  }),

  getUserStats: thunk((actions, payload) => {
    actions.setIsLoading(true)
    GetUserStats(payload).then(res => {
      actions.setIsLoading(false)

      if (res) {
        actions.setStats(res)
        actions.setError(null)
      }
    }).catch(err => { actions.setError(err); actions.setIsLoading(false) })
  }),

  getDeckStructure: thunk((actions, payload) => {
    actions.setIsLoading(true)
    GetDeckStructure(payload).then(res => {
      actions.setIsLoading(false)

      if (res.status) {
        actions.setStructure(res.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => { actions.setError(err); actions.setIsLoading(false) })
  }),

  getUserInterests: thunk((actions, payload) => {
    actions.setIsLoading(true)
    GetUserInterests(payload).then(res => {
      actions.setIsLoading(false)

      if (res.status) {
        actions.setInterests(res.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => { actions.setError(err); actions.setIsLoading(false) })
  }),

  updateRevision: thunk((actions, payload) => {
    actions.setIsUpdating(payload.cardId || true)

    UpdateRevision(payload).then(res => {
      actions.setIsUpdating(false)

      if (res.status) {
        actions.setRevisionHistory(payload.revision_history)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => {
      actions.setError(err); actions.setIsUpdating(false)
    })
  }),
  updateUserInterests: thunk((actions, payload) => {
    actions.setIsUpdating(true)

    UpdateUserInterests(payload).then(res => {
      actions.setIsUpdating(false)

      if (res.status) {
        actions.setInterests(res.data.interest)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => {
      actions.setError(err); actions.setIsUpdating(false)
    })
  }),
  updateUserStats: thunk((actions, payload) => {
    actions.setIsUpdating(true)

    UpdateUserStats(payload).then(res => {
      actions.setIsUpdating(false)

      if (res.status) {
        actions.setStats(payload.data)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => {
      actions.setError(err); actions.setIsUpdating(false)
    })
  }),
  saveHistoricalRevision: thunk((actions, payload) => {
    actions.setIsUpdating(true)

    SaveHistoricalRevision(payload).then(res => {
      actions.setIsUpdating(false)

      if (res.status) {
        // not saving the result in the  global state
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => {
      actions.setError(err); actions.setIsUpdating(false)
    })
  })
}
