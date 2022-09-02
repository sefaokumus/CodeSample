import React, { useMemo } from 'react'

import { MotiView, MotiText } from 'moti'

import { Pressable } from 'react-native'

import { IAnimatedToggleProps } from '../../constants/types'
import { useTheme }             from '../../hooks'

import { getContrastColor } from '../../utils/helper'

import Block from './Block'
import Text  from './Text'

const AnimatedToggle : React.FC<IAnimatedToggleProps> = ({ options, bgColor, onToggle, ...rest }) => {
  const { sizes, colors, fonts }      = useTheme()
  const [index, setIndex]             = React.useState(0)
  const [buttonWidth, setButtonWidth] = React.useState(0)

  const toggleColor = useMemo(() => {
    return bgColor || colors.primary
  }, [bgColor])

  const contrastColor = useMemo(() => {
    return bgColor ? getContrastColor(bgColor?.toString()) : colors.white
  }, [bgColor])

  if (!options || options.length < 2) return <Text danger>Wrong options data provided</Text>

  const onPress = (index: number) => {
    setIndex(index)
    onToggle?.(options[index])
  }

  return (
    <Block card row height={buttonWidth / 2.5} padding={0} align='center' color={toggleColor} flex={0} onLayout={(event) => {
      const { width } = event.nativeEvent.layout
      setButtonWidth((width / options.length) - (sizes.s * 2))
    }}
    {...rest}
    >
      {
        options.map((option, i) => {
          return (
            <Pressable key={`toggle_${i}`} style={{ flex: 1 }} onPress={() => onPress(i)}>
              <MotiText

                animate={{
                  opacity: index === i ? 1 : 0.7
                }}

                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: fonts.normal,
                  color: index === i ? toggleColor : contrastColor
                }}
              >{option.label}</MotiText>
            </Pressable>
          )
        })
      }

      <MotiView
        from={{
          translateX: 0
        }}
        animate={{
          translateX: (index * buttonWidth) +  sizes.s + (index * sizes.s * 2)
        }}
        exit={{
          translateX: 0
        }}
        style={{
          width: buttonWidth,
          height: buttonWidth / 3.5,
          borderRadius: sizes.cardRadius,
          marginRight: 10,
          backgroundColor: contrastColor,
          zIndex: -1,
          position: 'absolute'
        }}
      />
    </Block>
  )
}

export default AnimatedToggle
