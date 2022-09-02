
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TouchableOpacity }         from 'react-native-gesture-handler'

import { Ionicons } from '@expo/vector-icons'

import {  MainScreenProps,  RootStackParamList } from '../../constants/types'
import { useStoreState, useTheme }               from '../../hooks'
import { countDueCards }                         from '../../utils/helper'
import DecksScreen                               from '../Decks/decks.screen'
import DueTodayScreen                            from '../DueToday/dueToday.screen'
import HomeScreen                                from '../Home/home.screen'
import ScheduledScreen                           from '../Scheduled/scheduled.screen'

const Tab        = createBottomTabNavigator<RootStackParamList>()
const MainScreen = ({ navigation, route }: MainScreenProps) => {
  const screen                     = route?.params?.screen
  const { colors, sizes, weights } = useTheme()
  const { revisionHistory }        = useStoreState(state => state.user)

  const dueCount = countDueCards(revisionHistory).length

  const LeftButton = () => (
    <TouchableOpacity style={{ padding: 8 }} onPress={() => navigation.getParent('LeftDrawer').toggleDrawer() } >
      <Ionicons name="menu" size={30} color={colors.primary} />
    </TouchableOpacity>)

  return (
    <Tab.Navigator
      initialRouteName={screen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'

          if (route.name === 'Home') {
            iconName = 'ios-home'
          } else if (route.name === 'Decks') {
            iconName = 'layers-outline'
          } else if (route.name === 'DueToday') {
            iconName = 'today-outline'
          } else if (route.name === 'Scheduled') {
            iconName = 'browsers-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} style={{ opacity: (dueCount === 0 && route.name === 'DueToday') ? 0.5 : 1 }}  />
        },
        headerLeft: () => <LeftButton />,
        headerTitleAlign: 'center',
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: weights.h4,
          fontSize: sizes.h4
        },
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
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Decks" component={DecksScreen} />
      <Tab.Screen name="DueToday" component={DueTodayScreen}
        options={{
          title: 'Due Today',
          tabBarBadge: dueCount,
          tabBarBadgeStyle: { display: dueCount > 0 ? 'flex' : 'none' }

        }}
        listeners={
          {
            tabPress: (e) => {
              if (dueCount > 0) {
                navigation.navigate('DueToday')
              } else { e.preventDefault() }
            }
          }
        }/>
      <Tab.Screen name="Scheduled" component={ScheduledScreen} />
    </Tab.Navigator>
  )
}

export default MainScreen
