import React, { useCallback } from 'react'

import {
  Roboto_300Light, Roboto_400Regular,
  Roboto_500Medium, Roboto_700Bold, Roboto_900Black
} from '@expo-google-fonts/roboto'
import { NavigationContainer, DefaultTheme, createNavigationContainerRef } from '@react-navigation/native'
import { useFonts }                                                        from 'expo-font'
import * as SplashScreen                                                   from 'expo-splash-screen'

import { View } from 'react-native'

import { Spinner }                      from '../components/ui'
import { light }                        from '../constants'
import { ITheme, RootStackParamList }   from '../constants/types'
import { ThemeProvider, useStoreState } from '../hooks'

import RightDrawerScreen from './RightDrawerNavigator'

const Navigation = () => {
  const [theme] = React.useState<ITheme>(light)

  const { auth: { isLoading } } = useStoreState((state) => state)
  const navigationRef           = createNavigationContainerRef<RootStackParamList>()

  // load theme fonts
  const [fontsLoaded] = useFonts({
    Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background)
    }
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <Spinner visible={isLoading} color={theme.colors.white} size="large" overlayColor={theme.colors.overlay} textStyle={{ color: theme.colors.white }} />

        <NavigationContainer
          ref={navigationRef}
          theme={navigationTheme}>
          <RightDrawerScreen />
          {/* right drawer contains left drawer,  and left drawer contains bottom tabs navigator */}
        </NavigationContainer>
      </ThemeProvider>
    </View>
  )
}

export default Navigation
