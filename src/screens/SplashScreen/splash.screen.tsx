import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { ColorValue, ImageSourcePropType } from 'react-native'
import SliderIntro                         from 'react-native-slider-intro'

import { Block,  Image, Text }         from '../../components/ui'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants'
import { NavigationProps }             from '../../constants/types'
import { useStoreActions, useTheme }   from '../../hooks'

type IntroSlide = {
  index: number,
  title: string,
  text: string,
  image: ImageSourcePropType | undefined,
  backgroundColor: ColorValue
}

const SplashScreen = () => {
  const { colors, sizes }          = useTheme()
  const navigation                 = useNavigation<NavigationProps>()
  const { setIsSplashScreenShown } = useStoreActions(actions => actions.appSettings)

  const slides: IntroSlide[] = [
    {
      index: 1,
      title: 'Spaced Repetition',
      text: 'Evidence-based learning technique.',
      image: require('../../../assets/slider/image1.png'),
      backgroundColor: colors.primary
    },
    {
      index: 2,
      title: 'Spaced Repetition',
      text: 'Evidence-based learning technique.',
      image: require('../../../assets/slider/image2.png'),
      backgroundColor: colors.primary
    },
    {
      index: 3,
      title: 'Spaced Repetition',
      text: 'Evidence-based learning technique.',
      image: require('../../../assets/slider/image3.png'),
      backgroundColor: colors.primary
    }
  ]

  const renderDoneButton = () => {
    return (
      <Block
        white
        paddingHorizontal={sizes.l}
        justify='center'
        marginTop={sizes.sm}
        style={{ minHeight: sizes.xl }}
        width={WINDOW_WIDTH * 0.5}
        radius={sizes.buttonRadius} >
        <Text primary size={18} align='center' paddingTop={2}>{"Let's try"}</Text>
      </Block>
    )
  }

  const renderNextButton = () => {
    return (
      <Block white paddingHorizontal={sizes.l} marginTop={sizes.sm} style={{ minHeight: sizes.xl }} radius={sizes.buttonRadius} justify='center'>
        <Text bold primary size={18} align='center' paddingTop={2}>Next</Text>
      </Block>
    )
  }

  const handleOnDone = () => {
    setIsSplashScreenShown(true)
    navigation.navigate('SignIn')
  }

  const _renderItem = ({
    index,
    backgroundColor,
    title,
    text,
    image
  }: IntroSlide) => {
    return (
      <Block key={index} align='center' justify="flex-start" flex={1} style={{ backgroundColor }}>

        <Block
          height={WINDOW_HEIGHT}
          flex={1}
          justify='center'
          align='center'
          paddingTop={sizes.md}
        >
          <Text h3 marginVertical={sizes.l} white >
            {title}
          </Text>

          {image && <Image slider shadow source={image} />}
          <Block paddingVertical={sizes.l}>
            <Text size={sizes.h4} align='center' white>
              {text}
            </Text>
          </Block>
        </Block>
      </Block>
    )
  }
  return (
    <SliderIntro
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      renderSkipButton={() => null}
      navContainerMaxSizePercent={0.3}
      navigationBarHeight={100}
      columnButtonStyle={true}
      data={slides}
      renderItem={_renderItem}
      animatedDotBackgroundColor={colors.white}
      onDone={handleOnDone}

    />
  )
}

export default SplashScreen
