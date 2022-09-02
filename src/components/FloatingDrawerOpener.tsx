import { useNavigation }    from '@react-navigation/core'
import React, { Pressable } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { WINDOW_HEIGHT } from '../constants'

import { NavigationProps } from '../constants/types'
import { useTheme }        from '../hooks'

const FloatingDrawerOpener = () => {
  const navigation        = useNavigation<NavigationProps>()
  const { colors, sizes } = useTheme()
  return  (
    <Pressable onPress={() => navigation.getParent('RightDrawer').openDrawer()}
      style={{
        flex: 0,
        position: 'absolute',
        top: (WINDOW_HEIGHT / 2) - sizes.md,
        padding: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderTopLeftRadius: sizes.md,
        borderBottomLeftRadius: sizes.md,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 11
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 10
      }}
    >
      <Ionicons name="md-chevron-back" size={sizes.m} color={colors.primary}/>
    </Pressable>
  )
}

export default FloatingDrawerOpener
