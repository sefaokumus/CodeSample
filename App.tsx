import React from 'react'

import 'react-native-gesture-handler'
import { StoreProvider } from 'easy-peasy'
import Toast             from 'react-native-toast-message'

import { GlobalContextProvider } from './GlobalContext'
import AppNavigation             from './src/navigation'
import store                     from './src/store'

export default function App () {
  return (
    <StoreProvider store={store}>
      <GlobalContextProvider>
        <AppNavigation />
        <Toast />
      </GlobalContextProvider>
    </StoreProvider>
  )
}
