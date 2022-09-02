
import { action } from 'easy-peasy'

import { AppSettingsModel } from '../constants/types/storage'

export const appSettingsModel: AppSettingsModel = {
  isSplashScreenShown: false,

  setIsSplashScreenShown: action((state, isShown) => {
    state.isSplashScreenShown = isShown
  })
}
