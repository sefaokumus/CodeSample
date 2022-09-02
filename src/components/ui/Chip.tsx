import React from 'react'

import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import {  IChipProps } from '../../constants/types'
import useTheme        from '../../hooks/useTheme'

import Text from './Text'

const Chip = (props: IChipProps) => {
  const {
    id = 'Chip',
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
    outlined,
    closeable,
    disabled,
    updating,
    onClose,
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

  const chipColor = (colorIndex
    ? colors?.[colorIndex]
    : colors.lightGray)

  const blockStyles = StyleSheet.flatten([
    style,
    {
      flex: 0,
      flexDirection: 'row',
      borderRadius: sizes.xxl,
      paddingHorizontal: sizes.s,
      paddingVertical: sizes.xs,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: sizes.sm
    },
    {
      ...(disabled && { opacity: 0.5 }),
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
      ...(chipColor && { backgroundColor: chipColor }),
      ...(typeof outlined === 'boolean' && {
        borderWidth: sizes.buttonBorder,
        borderColor: chipColor,
        backgroundColor: 'transparent'
      }),
      ...(typeof outlined === 'string' && {
        borderWidth: sizes.buttonBorder,
        borderColor: outlined
      })
    }
  ]) as ViewStyle

  // generate component testID or accessibilityLabel based on Platform.OS
  const blockID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id }
  return (
    <View {...blockID} {...rest} style={blockStyles}>
      <Text color={color} size={size}>{children}</Text>
      {

        closeable && (
          <Pressable onPress={onClose} disabled={disabled} style={{  marginLeft: sizes.sm,  borderRadius: sizes.xxl }} >
            {updating ? (<ActivityIndicator size='small' color={colors.primary} />) : <Ionicons name='ios-close' size={size} color={color} />}
          </Pressable>
        )

      }
    </View>
  )
}

export default React.memo(Chip)
