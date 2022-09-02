import React from 'react'

import {
  Platform,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'

import { IBadgeProps } from '../../constants/types'
import useTheme        from '../../hooks/useTheme'

import Text from './Text'

const Badge = (props: IBadgeProps) => {
  const {
    id = 'Badge',
    children,
    style,
    color,
    primary,
    secondary,
    tertiary,
    black,
    white,
    gray,
    danger,
    warning,
    success,
    info,
    size,
    margin,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    padding,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    paddingRight,
    paddingLeft,
    ...rest
  } = props
  const { colors, sizes } = useTheme()

  const colorIndex = primary
    ? 'primary'
    : secondary
      ? 'secondary'
      : tertiary
        ? 'tertiary'
        : black
          ? 'black'
          : white
            ? 'white'
            : gray
              ? 'gray'
              : danger
                ? 'danger'
                : warning
                  ? 'warning'
                  : success
                    ? 'success'
                    : info
                      ? 'info'
                      : null

  const blockColor = (colorIndex
    ? colors?.[colorIndex]
    : colors.gray)

  const blockStyles = StyleSheet.flatten([
    style,
    {
      flex: 0,
      height: size === 'large' ? sizes.badgeLargeSize : sizes.badgeSmallSize,
      width: size === 'large' ? sizes.badgeLargeSize : sizes.badgeSmallSize,
      borderRadius: size === 'large' ? sizes.badgeLargeRadius : sizes.badgeSmallRadius,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: sizes.sm
    },
    {
      ...(margin !== undefined && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding !== undefined && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(blockColor && { backgroundColor: blockColor })
    }
  ]) as ViewStyle

  // generate component testID or accessibilityLabel based on Platform.OS
  const blockID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id }
  return (
    <View {...blockID} {...rest} style={blockStyles}>
      <Text color={color} size={size === 'large' ? 17 : 12}>{children}</Text>
    </View>
  )
}

export default React.memo(Badge)
