import { UserData } from '../storage'

export interface LoginResponse{
  user: UserData,
  token: string,
  message? : string
  status :boolean
}

export interface LogoutResponse {
  message? : string
  status: boolean
}

export interface ForgotPasswordResponse {
  message? : string
  status: boolean
}
