import React, { useState, useEffect, useRef } from 'react'

import { MotiView }  from 'moti'
import { Pressable } from 'react-native'
import { FlatList }  from 'react-native-gesture-handler'
import Markdown      from 'react-native-markdown-display'

import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

import { Ionicons } from '@expo/vector-icons'

import { AnimateHeight }                            from '../../components/AnimateHeight'
import DeckCard                                     from '../../components/DeckCard'
import { Block, Button, Slider, Text }              from '../../components/ui'
import { WINDOW_HEIGHT, WINDOW_WIDTH }              from '../../constants'
import { CardItem, RevisionItem }                   from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'

interface CardViewerProps {
  revisionItem: RevisionItem,
  subTitle: string,
  next: () => void,
  onContinue: (id: string, due_date: number) => void,
  isLearning?: boolean
  isLoading?: boolean
}
const CardViewer = ({ revisionItem, subTitle, isLearning, isLoading, next, onContinue }: CardViewerProps) => {
  const [answerVisible, setAnswerVisible]     = useState(false)
  const [sliderValue, setSliderValue]         = useState(0)
  const [initialValue, setInitialValue]       = useState(0)
  const [displayCarousel, setDisplayCarousel] = useState(false)
  const { sizes, colors }                     = useTheme()

  const {
    auth: { token },
    decks: { selectedDeck, isLoading: isDecksLoading }
  } = useStoreState(state => state)
  const { getDeck } = useStoreActions(actions => actions.decks)

  const carouselRef                     = useRef<ICarouselInstance | null>(null)
  const paginationRef                   = useRef<FlatList>(null)
  const [defaultIndex, setDefaultIndex] = useState(0)

  const getDeckData = (id: string) => {
    console.log('called')
    getDeck({ token, id })
  }

  const toggleVisibilty = () => {
    setAnswerVisible(prev => !prev)
  }

  const handlePress = () => {
    setAnswerVisible(false)
    onContinue(revisionItem.id, sliderValue)
    setInitialValue(0)
    next()
  }

  const handleDisplayCarouselPress = () => {
    if (selectedDeck?.cards.length === 0 || (selectedDeck?.id !== revisionItem.deck_id)) {
      console.log('getting new Deck')
      getDeckData(revisionItem.deck_id)
    }
    setDisplayCarousel(prev => !prev)
  }

  useEffect(() => {
    if (selectedDeck?.cards && displayCarousel &&  selectedDeck?.cards?.length > 0) {
      const reviewCardIndexInDeck = selectedDeck?.cards.findIndex(card => card.id === revisionItem.card.id)

      if (reviewCardIndexInDeck !== -1) { setDefaultIndex(reviewCardIndexInDeck) }
    }
  }, [displayCarousel, selectedDeck?.cards])

  return (
    <Block center paddingHorizontal={sizes.sm} justify='flex-start'>
      <Text center h4  >{revisionItem?.deckName || '[No Deck Title]'}</Text>
      <Block row flex={0} paddingVertical={sizes.s} justify='flex-end' align='center'>
        <Pressable
          style={{
            position: 'absolute',
            width: 120,
            margin: sizes.sm,
            left: (WINDOW_WIDTH / 2) - (120 / 2),
            opacity: (answerVisible || isLearning) ? 1 : 0.5
          }}
          disabled={!answerVisible && !isLearning}
          onPress={handleDisplayCarouselPress}>

          <MotiView
            animate={{
              rotateZ: displayCarousel ? '-180deg' : '0deg'
            }}
            style={{ height: sizes.l, width: sizes.l, alignContent: 'center', justifyContent: 'center' }}
          >
            <Ionicons name="ios-chevron-down-circle-outline" size={sizes.l} color={colors.primary} />

          </MotiView>

        </Pressable>
        <Text align='right'>{subTitle}</Text>
      </Block>

      <AnimateHeight style={{
        width: WINDOW_WIDTH,
        marginLeft: -sizes.sm,
        zIndex: 999,
        height: WINDOW_HEIGHT - 160,
        backgroundColor: 'rgba(0,0,0,0.8)'
      }} hide={!displayCarousel || isDecksLoading} enterFrom='bottom'>
        <Carousel
          ref={carouselRef}
          width={WINDOW_WIDTH}
          height={WINDOW_HEIGHT - 150}
          autoPlay={false}
          data={selectedDeck?.cards || []}
          mode='parallax'
          defaultIndex={defaultIndex}
          modeConfig={{
            parallaxScrollingOffset: 70,
            parallaxScrollingScale: 0.9
          }}
          panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
          windowSize={3}
          onProgressChange={(_, absoluteProgress) => {
            paginationRef.current?.scrollToOffset({ offset: absoluteProgress * (WINDOW_WIDTH / 7), animated: false })
          }}
          renderItem={({ item, index }: { item: CardItem, index: number }) => {
            return <Block card white marginHorizontal={sizes.sm} marginVertical={sizes.s} >
              <DeckCard card={item} />
              <Text center>{`${index + 1}/ ${selectedDeck?.cards.length}`}</Text>
            </Block>
          }}
        />

      </AnimateHeight>

      <Block shadow margin={0}>
        <Text p black opacity={0.6} >{revisionItem.cardTitle}</Text>
        {/* Answer section */}
        <Block scroll>
          {
            isLearning
              ? <Block paddingBottom={120}>
                <Markdown>{revisionItem?.card?.body || ''}</Markdown>
              </Block>
              : answerVisible && (

                <Block paddingBottom={120}>
                  <Markdown>
                    {revisionItem?.card?.body || ''}
                  </Markdown>
                </Block>
              )}
        </Block>
      </Block>
      {
        (!answerVisible && !isLearning)
          ? (
            <Block
              position='absolute'
              bottom={0}
              center
              width={WINDOW_WIDTH}
              padding={sizes.m}
              style={{ backgroundColor: colors.primaryOverlay, zIndex: 800 }}>
              <Button white onPress={toggleVisibilty} >
                <Text primary bold transform='uppercase'>Show Answer</Text>
              </Button>
            </Block>
          )
          : (
            <Block
              position='absolute'
              bottom={0}
              center
              width={WINDOW_WIDTH}
              paddingHorizontal={sizes.m}
              paddingVertical={sizes.s}

              style={{ backgroundColor: colors.primaryOverlay }}>
              <Slider
                cardId={revisionItem.card.id}
                initialValue={initialValue}
                isLoading={isLoading}
                steps={[0, 1, 2, 3, 5, 7, 10, 30, 60, 90, 180]}
                onSlidingComplete={(value) => {
                  setSliderValue(value)
                }}

              />
              <Button disabled={isLoading} white onPress={handlePress} marginTop={sizes.sm}>
                <Text primary bold transform='uppercase'>{sliderValue === 0 ? 'Next Card' : `REVIEW ${sliderValue} days`}</Text>
              </Button>
            </Block>
          )
      }

    </Block>
  )
}

export default React.memo(CardViewer)
