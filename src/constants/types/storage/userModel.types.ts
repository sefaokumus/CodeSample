import { Action, Thunk } from 'easy-peasy'

import { GetDeckStructureRequest,  GetRevisionHistoryRequest, GetUserInterestsRequest, GetUserStatsRequest, SaveHistoricalRevisionRequest, UpdateRevisionRequest, UpdateUserInterestRequest, UpdateUserStatsRequest } from '../services'

export type CardData = {
  id: string
  body: string
  tags: string
  title: string
}

export type RevisionItem = {
  id: string
  deck_id: string
  name : string
  due_date: string
  last_revision_date: string
  type : 'LEARNING' | 'REVISION' | undefined
  deckName: string
  cardTitle: string
  card : CardData
}

export type InterestItem = {
  id: number
  name: string
  selected: boolean
  category_id: number
}

export type UserInterestsType = {
  id:number
  name: string
  created_at?:string
  updated_at?: string
  interests: InterestItem[]
}

export interface UserDeckInterface {
  rootId: string
  items: {
    [key: string]: {
      id: string
      children: string[]
      hasChildren: boolean
      isExpanded: boolean
      isChildrenLoading: boolean
      isInEditMode: boolean
      data: {
        title: string
      }
      status : boolean
    }
  }
}

export interface UserStatsInerface {
  id: number
  cards_per_day: { [key : string] : number}[]
  current_streak: number
  best_streak: number
  last_updated: string | null
  user_id: number
  created_at: string
  updated_at: string
}

export interface HistoricalRevisionInterface {
  id: string
  card_id: string
  deck_id: string
  next_revision_in_days: number
  card: {
    body: string
    id: string
    tags: string
    title: string
  },
  updated_at?: string
  created_at?: string
}

export interface UserModel{
  revisionHistory: RevisionItem[]
  stats: UserStatsInerface | null
  interests : UserInterestsType[]
  structure: UserDeckInterface | null
  isLoading: boolean
  isUpdating: boolean | string
  error: any

  setRevisionHistory: Action<UserModel, RevisionItem[]>
  setStats: Action<UserModel, UserStatsInerface | null>
  setInterests: Action<UserModel, UserInterestsType[]>
  setStructure : Action<UserModel, UserDeckInterface | null>
  setError: Action<UserModel, any>
  setIsLoading: Action<UserModel, boolean>
  setIsUpdating: Action<UserModel, boolean|string>

  getRevisionHistory: Thunk<UserModel, GetRevisionHistoryRequest>
  getUserStats: Thunk<UserModel, GetUserStatsRequest>
  getUserInterests: Thunk<UserModel, GetUserInterestsRequest>
  updateUserInterests : Thunk<UserModel, UpdateUserInterestRequest>
  updateRevision: Thunk<UserModel, UpdateRevisionRequest>
  updateUserStats: Thunk<UserModel, UpdateUserStatsRequest>
  saveHistoricalRevision: Thunk<UserModel, SaveHistoricalRevisionRequest>
  getDeckStructure: Thunk<UserModel, GetDeckStructureRequest>
}
