import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { StackScreenProps }   from '@react-navigation/stack'

import { Ionicons } from '@expo/vector-icons'

import { RevisionItem } from './storage'

export type RootStackParamList = {
  SplashScreen: undefined
  Main: { screen : keyof RootStackParamList}
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  DeckDetails: { id: string }
  Decks: undefined
  DecksPlayer : {count?: number, mode?: 'LEARNING' | 'REVISION', revisionItems?: RevisionItem[], schedule? : string}
  DueToday: undefined
  Home: undefined
  Scheduled: undefined
  Interests: undefined
}

export interface MenuItem {
  name: string,
  to: 'Home' | 'Main' | 'Decks' | 'DueToday' | 'Scheduled' | 'Interests' | 'ContactUs' | 'AboutUs' | 'Logout' | 'SplashScreen' | 'SignIn' | 'SignUp' | 'ForgotPassword',
  icon: keyof typeof Ionicons.glyphMap,
  isActive?: boolean,
  badge?: number
}

export type NavigationProps = BottomTabNavigationProp<RootStackParamList>;

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type DeckScreenProps = StackScreenProps<RootStackParamList, 'Decks'>;
export type DueTodayScreenProps = StackScreenProps<RootStackParamList, 'DueToday'>;
export type DeckDetailsScreenProps = StackScreenProps<RootStackParamList, 'DeckDetails'>;
export type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;
export type ScheduledScreenProps = StackScreenProps<RootStackParamList, 'Scheduled'>;
export type InterestsScreenProps = StackScreenProps<RootStackParamList, 'Interests'>;
export type DecksPlayerScreenProps = StackScreenProps<RootStackParamList, 'DecksPlayer'>;
