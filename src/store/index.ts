import AsyncStorage             from '@react-native-async-storage/async-storage'
import { createStore, persist } from 'easy-peasy'

import { StoreModel } from '../constants/types'

import { appSettingsModel }   from './appSettingsModel'
import { authModel }          from './authModel'
import { categoryModel }      from './categoryModel'
import { deckModel }          from './deckModel'
import { deckStructureModel } from './deckStructreModel'
import { userModel }          from './userModel'

// custom storage object is required to set persist function to keep fetched data in memory when app is closed
// this allows to keep auth data in storage so the user can login again when app is opened
const storage = {
  async getItem (key: string) {
    try {
      return JSON.parse((await AsyncStorage.getItem(key)) || '')
    } catch (e) {
      return null
    }
  },
  async setItem (key: string, data: object) {
    AsyncStorage.setItem(key, JSON.stringify(data))
  },
  async removeItem (key: string) {
    AsyncStorage.removeItem(key)
  }
}

const store = createStore<StoreModel>(
  persist(
    {
      auth: authModel,
      decks: deckModel,
      deckStructures: deckStructureModel,
      categories: categoryModel,
      user: userModel,
      appSettings: appSettingsModel
    },
    {
      storage
    }
  )
)

export default store
