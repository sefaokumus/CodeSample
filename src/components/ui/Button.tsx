import React, { useCallback } from 'react'

import * as Haptics from 'expo-haptics'
import {
  ViewStyle,
  Vibration,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'

import { IButtonProps } from '../../constants/types'
import useTheme         from '../../hooks/useTheme'

const Button = ({
  id = 'Button',
  children,
  style,
  color,
  primary,
  secondary,
  tertiary,
  black,
  white,
  light,
  dark,
  gray,
  danger,
  warning,
  success,
  info,
  flex,
  radius,
  round,
  rounded,
  disabled,
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
  align,
  justify,
  height,
  width,
  row,
  outlined,
  activeOpacity = 0.7,
  shadow = true,
  position,
  right,
  left,
  top,
  bottom,
  haptic = true,
  vibrate,
  vibrateRepeat,
  onPress,
  ...props
}: IButtonProps) => {
  const { colors, sizes } = useTheme()
  const colorIndex        = primary
    ? 'primary'
    : secondary
      ? 'secondary'
      : tertiary
        ? 'tertiary'
        : black
          ? 'black'
          : white
            ? 'white'
            : light
              ? 'light'
              : dark
                ? 'dark'
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

  const buttonColor = color || (colorIndex
    ? colors?.[colorIndex]
    : 'transparent')

  const buttonStyles = StyleSheet.flatten([
    style,
    {
      minHeight: sizes.xl,
      minWidth: sizes.xl,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor,
      borderRadius: rounded ? sizes.s : sizes.buttonRadius,
      ...(shadow &&
        buttonColor !== 'transparent' && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation
      }),
      ...(row && { flexDirection: 'row' }),
      ...(radius && { borderRadius: radius }),
      ...(flex !== undefined && { flex }),
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
      ...(align && { alignItems: align }),
      ...(justify && { justifyContent: justify }),
      ...(height && { height }),
      ...(width && { width }),
      ...(typeof outlined === 'boolean' && outlined && {
        borderWidth: sizes.buttonBorder,
        borderColor: buttonColor,
        backgroundColor: colors.white
      }),
      ...(typeof outlined === 'string' && {
        borderWidth: sizes.buttonBorder,
        borderColor: outlined
      }),
      ...(disabled && { opacity: 0.5 }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom })
    }
  ]) as ViewStyle

  /* handle onPress event */
  const handlePress = useCallback(
    (event) => {
      onPress?.(event)

      /* vibrate onPress */
      if (vibrate) {
        Vibration.vibrate(vibrate, vibrateRepeat)
      }

      /* haptic feedback onPress */
      if (haptic) {
        Haptics.selectionAsync()
      }
    },
    [haptic, vibrate, vibrateRepeat, onPress]
  )

  if (round) {
    const maxSize             = Math.max(
      Number(buttonStyles.width || 0),
      Number(buttonStyles.minWidth || 0),
      Number(buttonStyles.maxWidth || 0),
      Number(buttonStyles.height || 0),
      Number(buttonStyles.minHeight || 0),
      Number(buttonStyles.maxHeight || 0)
    )
    buttonStyles.maxWidth     = maxSize
    buttonStyles.maxHeight    = maxSize
    buttonStyles.borderRadius = maxSize / 2
  }

  // generate component testID or accessibilityLabel based on Platform.OS
  const buttonID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id }

  return (
    <TouchableOpacity
      {...buttonID}
      activeOpacity={activeOpacity}
      onPress={handlePress}
      {...props}
      style={buttonStyles}>
      {children}
    </TouchableOpacity>
  )
}

export default React.memo(Button)
