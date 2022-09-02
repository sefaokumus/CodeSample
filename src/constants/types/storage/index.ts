import { AppSettingsModel }   from './appSettingsModel.types'
import { AuthModel }          from './authModel.types'
import { CategoryModel }      from './categoryModel.types'
import { DeckModel }          from './deckModel.types'
import { DeckStructureModel } from './deckStructureModel.types'
import { UserModel }          from './userModel.types'

export * from './authModel.types'
export * from './userModel.types'
export * from './deckModel.types'
export * from './deckStructureModel.types'
export * from './categoryModel.types'
export * from './appSettingsModel.types'

export interface StoreModel{
  auth: AuthModel
  decks: DeckModel
  deckStructures: DeckStructureModel
  categories: CategoryModel
  user : UserModel
  appSettings: AppSettingsModel

}
