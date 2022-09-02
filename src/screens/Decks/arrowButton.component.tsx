
import React from 'react'

import { MotiView }                               from 'moti'
import { useMotiPressable }                       from 'moti/interactions'
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useTheme } from '../../hooks'

type ArrowButtonProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap,
  size: number,
  color: string | OpaqueColorValue | undefined,
  style?: StyleProp<ViewStyle>
}

const ArrowButton = ({ name, size, color, style } : ArrowButtonProps) => {
  const state             = useMotiPressable(({ pressed }) => {
    'worklet'
    return {
      opacity: pressed ? 1 : 0.5
    }
  })
  const { sizes, colors } = useTheme()

  return (
    <MotiView state={state} style={[{
      alignItems: 'center',
      justifyContent: 'center',
      height: (size + sizes.sm),
      width: (size + sizes.sm),
      borderRadius: (size + sizes.sm) / 2,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: sizes.shadowOffsetWidth,
        height: sizes.shadowOffsetHeight
      },
      shadowOpacity: sizes.shadowOpacity,
      shadowRadius: sizes.shadowRadius,
      elevation: sizes.elevation
    }, style]}>
      <MaterialCommunityIcons size={size} name={name} color={color} />
    </MotiView>)
}
export default ArrowButton
