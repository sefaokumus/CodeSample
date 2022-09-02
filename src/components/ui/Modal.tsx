import React from 'react'

import { StyleSheet, Modal as RNModal, ViewStyle, Platform } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { IModalProps } from '../../constants/types'
import { useTheme }    from '../../hooks/'

import { getContrastColor } from '../../utils/helper'

import Block  from './Block'
import Button from './Button'

const Modal = ({
  id = 'Modal',
  children,
  style,
  onRequestClose,
  containerProps,
  ...props
}: IModalProps) => {
  const {  colors, sizes } = useTheme()
  const modalStyles        = StyleSheet.flatten([style, {}]) as ViewStyle

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id }

  return (
    <RNModal
      {...modalID}
      {...props}
      transparent
      style={modalStyles}
      animationType="fade"
      onRequestClose={onRequestClose}>
      <Block justify="flex-end">
        <Block safe  flex={1} justify='center' color="rgba(0,0,0,0.8)" >
          <Block card flex={0} marginVertical={sizes.m} marginHorizontal={sizes.m} padding={sizes.sm}  {...containerProps}>
            <Button
              top={0}
              right={0}
              position="absolute"
              style={{ zIndex: 999 }}
              onPress={() => onRequestClose?.()}>
              <Ionicons name='ios-close' color={ containerProps?.color ? getContrastColor(containerProps.color.toString()) :  colors.white } size={sizes.md} />
            </Button>
            <Block
              flex={0}
              paddingHorizontal={sizes.padding}>
              {children}
            </Block>
          </Block>
        </Block>
      </Block>
    </RNModal>
  )
}

export default React.memo(Modal)
