import { ForgotPasswordFormData, ForgotPasswordResponse, LoginResponse, LogoutResponse, SignInFormData, SignUpFormData } from '../constants/types'

import axios from './axiosInstance'

const setDefaults = () => {
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencode'
  axios.defaults.headers.common.Accept          = 'application/json'
}

const Login = (data: SignInFormData) : Promise<LoginResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    axios.post('/v1/login/', data)
      .then(response =>
        resolve(response.data)
      )
      .catch((error) => { reject(error.response) })
  })
}

const Register = (data: SignUpFormData) => {
  setDefaults()
  return new Promise((resolve, reject) => {
    axios.post('/v1/register/', data)
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const Logout = () : Promise<LogoutResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    axios.post('/v1/logout/')
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const VerifyReaderCode = (data :{ token:string}) => {
  setDefaults()
  return new Promise((resolve, reject) => {
    axios.post('/v1/reader/verify-code', data)
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const ForgotPassword = (data : ForgotPasswordFormData): Promise<ForgotPasswordResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    axios.post('/v1/forgot-password', data)
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const PasswordReset = (data: { email: string; password: string; password_confirmation: string; token : string}) => {
  setDefaults()
  return new Promise((resolve, reject) => {
    axios.post('/v1/password/reset', data)
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

export {
  Login,
  Register,
  Logout,
  VerifyReaderCode,
  ForgotPassword,
  PasswordReset
}
