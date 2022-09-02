import React, { useState, useEffect } from 'react'

import { Modal, ActivityIndicator } from 'react-native'

import { ISpinnerProps } from '../../constants/types'
import { useTheme }      from '../../hooks'

import Block from './Block'
import Text  from './Text'

const Spinner = (props : ISpinnerProps) => {
  const {
    cancelable, customIndicator, color, size, indicatorStyle, textStyle, overlayColor, spinnerKey, animationType, textContent, children, visible
  } = props
  const [_visible, setVisible]         = useState(visible)
  const [_textContent, setTextContent] = useState(textContent)

  useEffect(() => {
    setVisible(visible)
  }, [visible])
  useEffect(() => {
    setTextContent(textContent)
  }, [textContent])

  const close = () => setVisible(false)

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close()
    }
  }

  const _renderDefaultContent = () => {
    return (
      <Block align='center' justify='center' bottom={0} left={0} right={0} top={0} position="absolute">
        {customIndicator || (
          <ActivityIndicator
            color={color}
            size={size}
            style={{
              flex: 1,
              ...indicatorStyle
            }}
          />
        )}

        <Block align='center' justify='center' flex={1} bottom={0} left={0} right={0} top={0} position="absolute" style={indicatorStyle}>
          <Text h4 top={80} lineHeight={50} white style={textStyle}>
            {_textContent || 'Please Wait...'}
          </Text>
        </Block>
      </Block>
    )
  }

  const _renderSpinner = () => {
    const { colors } = useTheme()
    const spinner    = (
      <Block
        bottom={0}
        left={0}
        right={0}
        top={0}
        position="absolute"
        style={{ backgroundColor: overlayColor || colors.overlay }}
        key={
          spinnerKey || `spinner_${Date.now()}`
        }
      >
        {children || _renderDefaultContent()}
      </Block>
    )

    return (
      <Modal
        animationType={animationType}
        onRequestClose={() => _handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={_visible}
        statusBarTranslucent
      >
        {spinner}
      </Modal>
    )
  }

  return _renderSpinner()
}

export default Spinner
