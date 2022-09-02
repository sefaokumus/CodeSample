
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useDrawerStatus,  createDrawerNavigator,  DrawerContentComponentProps,  DrawerContentScrollView } from '@react-navigation/drawer'
import { Animated, StyleSheet }                                                                            from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { Block, Text, Button, Image, Badge }        from '../components/ui'
import { MenuItem }                                 from '../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../hooks'

import { countDueCards } from '../utils/helper'

import StacksNavigator from './StacksNavigator'

const Drawer = createDrawerNavigator()

/* drawer menu screens navigation */
const ScreensStack = () => {
  const { colors }   = useTheme()
  const isDrawerOpen = useDrawerStatus() === 'open'
  const animation    = useRef(new Animated.Value(0)).current

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88]
  })

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16]
  })

  const animatedStyle = {
    borderRadius,
    transform: [{ scale }]
  }

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0
    }).start()
  }, [isDrawerOpen, animation])

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0
        }
      ])}>
      {/*  */}
      <StacksNavigator />
    </Animated.View>
  )
}

/* custom drawer menu */
const DrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation }      = props
  const [active, setActive] = useState('Home')
  const { colors, sizes }   = useTheme()

  const { data: userData }  = useStoreState((state) => state.auth)
  const { revisionHistory } = useStoreState((state) => state.user)
  const { logout }          = useStoreActions(actions => actions.auth)

  const dueCount = countDueCards(revisionHistory).length

  const handleNavigation = useCallback((to) => {
    setActive(to)
    navigation.navigate(to)
  }, [navigation, setActive])

  // screen list for Drawer menu
  const upperScreens: MenuItem[] = [
    { name: 'Home', to: 'Home', icon: 'home-outline' },
    { name: 'Decks', to: 'Decks', icon: 'list' },
    { name: 'Due Today', to: 'DueToday', icon: 'calendar-outline', badge: dueCount },
    { name: 'Scheduled', to: 'Scheduled', icon: 'browsers-outline' }
  ]

  const lowerScreens: MenuItem[] = [
    { name: 'Interests', to: 'Interests', icon: 'heart-outline' },
    { name: 'About Us', to: 'AboutUs', icon: 'information-circle-outline' },
    { name: 'Contact Us', to: 'ContactUs', icon: 'mail-outline' }
  ]

  const ListItem = (props : MenuItem) => (
    <Button
      row
      shadow={false}
      disabled={props.to === 'DueToday' && dueCount === 0}
      justify="space-between"
      marginBottom={sizes.s}
      paddingHorizontal={sizes.padding}
      color={props.isActive ? colors.input : colors.primary}
      onPress={() => handleNavigation(props.to)}>
      <Block
        flex={1}
        radius={6}
        align="center"
        justify="flex-start"
        row
        width={sizes.md}
        height={sizes.md}
        marginRight={sizes.s}>
        <Ionicons name={props.icon} size={sizes.md} color={colors.white} />
        <Text p extraBold color={colors.white} marginLeft={sizes.sm}>
          {props.name}
        </Text>
        {props.badge ? <Badge size="small" white color={colors.primary}>{props.badge}</Badge> : null}
      </Block>

      <Block
        flex={0}
        radius={6}
        align="center"
        justify="center"
        width={sizes.md}
        height={sizes.md}
        marginRight={sizes.s}>
        <Ionicons name="chevron-forward" size={sizes.md} color={colors.white} />
      </Block>

    </Button>
  )

  const handleLogout = () => {
    logout()
    setTimeout(() => {
      navigation.navigate('SignIn')
    }, 200)
  }

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{ paddingBottom: sizes.padding }}>
      <Block paddingHorizontal={sizes.padding}>

        {/* Avatar Section */}
        <Block row align="center" marginBottom={sizes.l}>
          {/* Avatar Image */}
          <Block flex={0} row >
            <Image shadow avatar rounded source={{ uri: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y' }} />
          </Block>

          {/* Avatar texts */}
          <Block padding={sizes.sm} >
            <Text p bold white transform="capitalize">{userData?.name}</Text>
            <Text p bold white>{userData?.email}</Text>
          </Block>

        </Block>

        {upperScreens?.map((screen, index) =>
          <ListItem key={`menu-screen-${screen.name}-${index}`} {...screen} isActive={active === screen.to} />
        )}

        <Block
          flex={0}
          marginRight={sizes.md}
          marginVertical={sizes.xs}
        />

        <Text h5 white transform="uppercase" opacity={0.8}>
          General
        </Text>

        {lowerScreens?.map((screen, index) => <ListItem key={`menu-screen-${screen.name}-${index}`} {...screen} isActive={active === screen.to} />)}

        {/* Logout button */}

        <Button
          row
          shadow={false}
          justify="space-between"
          marginBottom={sizes.s}
          paddingHorizontal={sizes.padding}
          color={colors.primary}
          onPress={() => handleLogout()}>
          <Block
            flex={1}
            radius={6}
            align="center"
            justify="flex-start"
            row
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}>
            <Ionicons name="power" size={sizes.md} color={colors.white} />
            <Text p extraBold color={colors.white} marginLeft={sizes.sm}>
              Logout
            </Text>
          </Block>

        </Button>

      </Block>
    </DrawerContentScrollView>
  )
}

/* drawer menu navigation */
const LeftDrawerNavigator = () => {
  const { colors } = useTheme()
  return (
    <Block >
      <Drawer.Navigator
        id='LeftDrawer'
        screenOptions={{
          drawerType: 'slide',
          swipeEnabled: false,
          sceneContainerStyle: { backgroundColor: 'transparent' },
          drawerStyle: {
            flex: 1,
            width: '70%',
            borderRightWidth: 0,
            backgroundColor: colors.primary
          }
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="StacksScreen" component={ScreensStack} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </Block>
  )
}

export default LeftDrawerNavigator
