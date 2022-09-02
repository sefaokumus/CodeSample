import React, { useEffect } from 'react'

import * as Haptics                            from 'expo-haptics'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import {  Slider as AWSlider }                 from 'react-native-awesome-slider'

import { useSharedValue } from 'react-native-reanimated'

import { useTheme } from '../../hooks'

import Block from './Block'

interface SliderProps {
  cardId: string,
  initialValue : number,
  steps?: number[],
  isLoading?: boolean | string,
  onSlidingStart?: () => void;
  onValueChange?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
}

const defaultSteps = [1, 2, 3, 5, 7, 10, 30, 60, 90, 180]

const Slider = ({
  cardId,
  initialValue,
  steps = defaultSteps,
  isLoading,
  onSlidingStart,
  onValueChange,
  onSlidingComplete,
  ...rest
}: SliderProps) => {
  const { colors, sizes } = useTheme()

  const progress = useSharedValue(1)
  const min      = useSharedValue(0)
  const max      = useSharedValue(defaultSteps.length - 1)

  useEffect(() => {
    if (steps) {
      max.value =  steps.length - 1
    }
  }, [steps])

  useEffect(() => {
    if (initialValue && initialValue > steps.length) {
      progress.value = steps.length - 1
    }
    if (initialValue && initialValue < 0) {
      progress.value = 0
    }

    if (initialValue !== undefined) {
      progress.value = initialValue
    }
  }, [initialValue])

  // const renderScale = () => Array.from({ length: steps.length   }, (_, i) => <Item key={`key_${i}`} width={1} height={21} />)
  const Thumb = ({ isActive }: { isActive: boolean }) => <Block padding={sizes.xs} style={{
    width: sizes.m,
    height: sizes.m,
    borderRadius: sizes.m / 2,
    backgroundColor: isActive ? colors.white : colors.lightGray,
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 5
  }} />

  return (

    <Block margin={sizes.s}>
      {/* <View style={[styles.column]}>
        {renderScale()}
      </View> */}
      <View style={styles.container}>

        <AWSlider
          {...rest}
          step={steps?.length - 1}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          disable={Boolean(isLoading)}
          onSlidingComplete={(value) => { onSlidingComplete && onSlidingComplete(steps[value]) }}
          onValueChange={(value) => { onValueChange && onValueChange(steps[value]) }}
          onSlidingStart={() => { onSlidingStart && onSlidingStart() }}
          markStyle={{ backgroundColor: colors.primary }}
          hapticMode="step"
          onHapticFeedback={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }}
          bubble={(value) => `${steps[value]} days`}
          theme={{
            maximumTrackTintColor: colors.primary as string,
            minimumTrackTintColor: colors.primary as string,
            bubbleBackgroundColor: colors.primary as string
          }}
          thumbWidth={sizes.m}
          bubbleTranslateY={-sizes.md}
          renderThumb={isLoading === cardId ? () => <ActivityIndicator size='large' color={colors.primary} style={{ backgroundColor: colors.white, borderRadius: 200 }} /> : () => <Thumb isActive={Boolean(!isLoading)} />}
        />
      </View>
    </Block>

  )
}
export default Slider

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})
