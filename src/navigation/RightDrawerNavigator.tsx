import React from 'react'

import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer'
import { Pressable }                                          from 'react-native'
import { useSafeAreaInsets }                                  from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

import { useGlobalContext }        from '../../GlobalContext'
import { Block, Text }             from '../components/ui'
import { useStoreState, useTheme } from '../hooks'

import LeftDrawer from './LeftDrawerNavigator'

function RightDrawerContent ({ navigation }: DrawerContentComponentProps) {
  const { selectedDeck }  = useStoreState(state => state.decks)
  const { top }           = useSafeAreaInsets()
  const { colors, sizes } = useTheme()
  const gContext          = useGlobalContext()

  const handleScroll = (index: number) => {
    gContext?.decksScreenflatListRef.current?.scrollTo({
      animated: true,
      index
    })

    setTimeout(() => {
      navigation.closeDrawer()
    }, 200)
  }

  return (
    <Block>
      {/* Can be removed since it has no use TOBECHECKED */}
      <Block shadow flex={0} primary paddingTop={top + sizes.s} paddingBottom={sizes.s} >
        <Text bold white center size={sizes.m} lineHeight={30} >Content</Text>
      </Block>
      <Block scroll  >

        {
          selectedDeck?.cards?.map((card, index) => {
            return (
              <Pressable key={index}  style={{
                paddingVertical: sizes.s,
                paddingLeft: sizes.s,
                paddingRight: sizes.sm,
                flexDirection: 'row'

              }} onPress={() => handleScroll(index)}>
                <Ionicons name='menu' size={20} color={colors.primary} />
                <Text numberOfLines={1}>{card.title}</Text>
              </Pressable>
            )
          })
        }
      </Block>
    </Block>

  )
}

const RightDrawer = createDrawerNavigator()

function RightDrawerScreen () {
  return (
    <RightDrawer.Navigator
      useLegacyImplementation
      id="RightDrawer"
      drawerContent={(props) => <RightDrawerContent {...props} />}
      screenOptions={{
        swipeEnabled: false,
        drawerPosition: 'right',
        headerShown: false
      }}>
      <RightDrawer.Screen name="LeftDrawer" component={LeftDrawer} />
    </RightDrawer.Navigator>
  )
}

export default RightDrawerScreen
