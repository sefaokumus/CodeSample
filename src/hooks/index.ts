import { createTypedHooks } from 'easy-peasy'

import { StoreModel } from '../constants/types/storage'

import useTheme, { ThemeContext,  ThemeProvider } from './useTheme'
const typedHooks       = createTypedHooks<StoreModel>()
const useStoreActions  = typedHooks.useStoreActions
const useStoreDispatch = typedHooks.useStoreDispatch
const useStoreState    = typedHooks.useStoreState

export {
  ThemeContext,
  ThemeProvider,
  useTheme,
  useStoreActions,
  useStoreDispatch,
  useStoreState
}
