import { Action } from 'easy-peasy'

export interface AppSettingsModel  {
  isSplashScreenShown: boolean

  setIsSplashScreenShown: Action<AppSettingsModel, boolean>

}
