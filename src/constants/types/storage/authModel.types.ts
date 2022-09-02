import { Action, Thunk } from 'easy-peasy'

import { RevisionItem, UserInterestsType } from './userModel.types'

export type SignInFormData = {
  email: string
  password: string
}

export type SignUpFormData = {
  username: string
  email: string
  password: string
  confirm: string
}

export type ForgotPasswordFormData = {
  email: string
}

export type UserData = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  deck_structures: object | null
  revision_history: RevisionItem[]
  type: string
  interest: UserInterestsType[]
  latestCode: string
  phone_number: string | null
  phone_verification_code: string | null
  is_phone_verified: boolean
  username: string
  mobile_installed: boolean
  is_completed_onboarding: boolean,
  connected_account? : any // TODO - not found on the documentation
}

export interface AuthModel{
  data: UserData | null
  token : string |null
  isLoggedIn: boolean
  isLoading: boolean
  error: any

  setData: Action<AuthModel, UserData | null>
  setError: Action<AuthModel, any>
  setToken: Action<AuthModel, string | null>
  setIsLoading: Action<AuthModel, boolean>
  setIsLoggedIn: Action<AuthModel, boolean>
  updateData: Action<AuthModel, UserData>

  login: Thunk<AuthModel, SignInFormData>
  register: Thunk<AuthModel, SignUpFormData>
  forgotPassword: Thunk<AuthModel, ForgotPasswordFormData>
  logout: Thunk<AuthModel>

}
