import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { RootStackParamList }      from '../constants/types'
import { useStoreState, useTheme } from '../hooks'
import {
  ForgotPassword,
  MainScreen,
  SignIn,
  SignUp,
  SplashScreen,
  DeckDetailsScreen,
  InterestsScreen,
  DecksPlayerScreen
} from '../screens'

const Stack = createStackNavigator<RootStackParamList>()

const StacksNavigator: React.FC = () => {
  const { colors }              = useTheme()
  const { isLoggedIn }          = useStoreState(store => store.auth)
  const { isSplashScreenShown } = useStoreState(store => store.appSettings)

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Main' : isSplashScreenShown ? 'SignIn' : 'SplashScreen'} screenOptions={{
      headerTitleStyle: {
        color: colors.primary
      },
      headerTintColor: colors.primary as string,
      headerStyle: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
      }
    }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeckDetails"
        component={DeckDetailsScreen}
        options={{
          title: 'Loading...',
          headerTitleAlign: 'center'
        }}
      />

      <Stack.Screen
        name="DecksPlayer"
        component={DecksPlayerScreen}
        options={{
          headerTitle: 'Review',
          headerTitleAlign: 'center'
        }}

      />

      <Stack.Screen
        name="Interests"
        component={InterestsScreen}
      />

    </Stack.Navigator>
  )
}

export default StacksNavigator
