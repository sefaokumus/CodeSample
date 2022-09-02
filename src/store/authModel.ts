import AsyncStorage        from '@react-native-async-storage/async-storage'
import {  action,  thunk } from 'easy-peasy'

import { AuthModel }                     from '../constants/types/storage'
import { ForgotPassword, Login, Logout } from '../services/authService'

export const authModel: AuthModel = {
  data: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),

  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),
  setIsLoggedIn: action((state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn
  }),

  setToken: action((state, token) => {
    state.token = token
  }),

  updateData: action((state, updatedData) => {
    state.data = { ...state.data, ...updatedData }
  }),

  login: thunk((actions, payload) => {
    actions.setIsLoading(true)
    Login(payload).then(res => {
      actions.setIsLoading(false)

      if (res.status) {
        actions.setData(res.user)
        actions.setToken(res.token)
        actions.setIsLoggedIn(true)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    })
      .catch(err => {
        actions.setError(err); actions.setIsLoading(false)
      })
  }),
  logout: thunk((actions) => {
    actions.setData(null)
    actions.setIsLoggedIn(false)
    actions.setError(null)

    Logout().then(async res => {
      await AsyncStorage.clear() // clear local storage to remove cacheed data
      console.log(res.status ? 'logout success' : 'logout failed')
    })
      .catch(err => {
        actions.setIsLoading(false)
        actions.setError(err)
      })

    // Instead of waiting for the logout to complete, we removed the cached data first then send logout request to the api
    // actions.setIsLoading(true)

    // Logout().then(res => {
    //   actions.setIsLoading(false)

    //   if (res.status) {
    //     store.persist.flush()
    //     actions.setData(null)
    //     actions.setIsLoggedIn(false)
    //     actions.setError(null)
    //   } else {
    //     actions.setError(res.message)
    //   }
    // })
    //   .catch(err => {
    //     actions.setIsLoading(false)
    //     actions.setError(err)
    //   })
  }),
  register: thunk((actions, payload) => {
    // actions.setIsLoading(true)
    // Register(payload).then(res => {
    //   if (res.status) {
    //     actions.setData(res.user)
    //     actions.setIsLoggedIn(true)
    //      actions.setError(null)
    //   } else {
    //     actions.setError(res.message)
    //   }
    // }).catch(err => { actions.setError(err) }).finally(() => { actions.setIsLoading(false) })
  }),
  forgotPassword: thunk((actions, payload) => {
    actions.setIsLoading(true)
    ForgotPassword(payload).then(res => {
      if (res.status) {
        actions.setIsLoggedIn(true)
        actions.setError(null)
      } else {
        actions.setError(res.message)
      }
    }).catch(err => { actions.setError(err) }).finally(() => { actions.setIsLoading(false) })
  })
}
