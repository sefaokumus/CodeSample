import {  HistoricalRevisionInterface, RevisionItem, UserData, UserDeckInterface, UserInterestsType, UserStatsInerface } from '../storage'

//  GetRevisionHistory
export type GetRevisionHistoryRequest = {
  token: string | null,
}
export interface GetRevisionHistoryResponse  {
  status: boolean | string
  data: RevisionItem[]
  message? : string
}

//  GetUserStats
export type GetUserStatsRequest = {
  token: string | null
}

export interface GetUserStatsRequestResponse extends UserStatsInerface {
}

// GetDeckStructure
export type GetDeckStructureRequest = {
  token: string | null
}

export interface GetDeckStructureResponse  {
  status: boolean | string
  data: UserDeckInterface | null
  message? : string
}

// GetUserInterests
export type GetUserInterestsRequest = {
  token: string | null
}

export interface GetUserInterestsResponse {
  status: boolean | string
  data: UserInterestsType[]
  message?: string
}

// Update Revision
export type UpdateRevisionRequest = {
  token: string | null
  revision_history: RevisionItem[]
  cardId?: string // optional: used to see which deck is being updated
}
export interface UpdateRevisionResponse {
  status: boolean | string
  data: UserData
  message? : string
}

// UpdateUserInterests
export type UpdateUserInterestRequest = {
  token: string | null
  user_interests: UserInterestsType[]
}

export interface UpdateUserInterestResponse {
  status: boolean | string
  data: UserData
  message? : string
}

// UpdateUserStats
export type UpdateUserStatsRequest = {
  token: string | null
  data: UserStatsInerface
}

export interface UpdateUserStatsResponse {
  status: boolean | string
  data: UserStatsInerface
  message?: string
}

// SaveHistoricalRevision

export type SaveHistoricalRevisionRequest = {
  token: string | null
  data: HistoricalRevisionInterface
}

export interface SaveHistoricalRevisionResponse {
  status: boolean | string
  data: HistoricalRevisionInterface
  message?: string
}
