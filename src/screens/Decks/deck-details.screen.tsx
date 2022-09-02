import React, { useCallback, useEffect, useMemo, useState } from 'react'

import moment                            from 'moment'
import { View }                          from 'moti'
import { MotiPressable  }                from 'moti/interactions'
import { ActivityIndicator,  Pressable } from 'react-native'

import Carousel from 'react-native-reanimated-carousel'

import { Ionicons } from '@expo/vector-icons'

import { useGlobalContext }                               from '../../../GlobalContext'
import DeckCard                                           from '../../components/DeckCard'
import FloatingDrawerOpener                               from '../../components/FloatingDrawerOpener'
import { NewPlayModal, ShareModal }                       from '../../components/modals'
import { Block,  Chip, Slider, Text }                     from '../../components/ui'
import { WINDOW_HEIGHT, WINDOW_WIDTH }                    from '../../constants'
import { CardItem, DeckDetailsScreenProps, RevisionItem } from '../../constants/types'
import { useStoreActions, useStoreState, useTheme }       from '../../hooks'
import { closest }                                        from '../../utils/helper'

import ArrowButton from './arrowButton.component'

const steps = [0, 1, 2, 3, 5, 7, 10, 30, 60, 90, 180]

const DecksDetailsScreen = ({ route, navigation }: DeckDetailsScreenProps) => {
  const did               = route?.params?.id
  const gContext          = useGlobalContext()
  const { colors, sizes } = useTheme()

  const {
    auth: { token },
    decks: { selectedDeck, isLoading, isUpdating },
    user: { revisionHistory, isUpdating: isUpdatingUser }
  } = useStoreState(state => state)
  const { getDeck, updateDeck }       = useStoreActions(state => state.decks)
  const { updateRevision }            = useStoreActions(state => state.user)
  const [isRequested, setIsRequested] = useState(false)

  const [sliderInitialValue, setSliderInitialValue] = useState(0)
  const [sliderIndex, setSliderIndex]               = useState(0)
  const [sliderDisplayValue, setSliderDisplayValue] = useState(0)

  const [showPlayModal, setShowPlayModal]   = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    if (did) {
      getData(did)
      setIsRequested(true)
    }
  }, [did])

  useEffect(() => {
    if (selectedDeck !== undefined) {
      navigation.setOptions({
        title: selectedDeck?.name || '[No Title]',
        headerTitleContainerStyle: { flex: 5, alignItems: 'center' },
        headerRight: () => RightHeaderButton
      }) // Not a good practice because we use the same title just below it TOBECHECKED
    }
  }, [selectedDeck])

  // Set the initial value of the slider if current card is found in revision history
  useEffect(() => {
    if (selectedDeck && revisionHistory.length > 0) {
      const currentCard = selectedDeck?.cards[sliderIndex]

      const found = revisionHistory?.find(rh => rh.id === currentCard.id)

      // If current card found in revisionHistory, set the initial value of the slider
      if (found) {
      // if the diffance is less then 24 hours set the diffrance as one
        let dateDiff = moment(found.due_date, 'MM-DD-YYYY').startOf('day').diff(moment().startOf('day'), 'days', true)

        if (dateDiff < 0) {
          dateDiff = 0
        }

        const closestValueToTheDueDate = closest(steps, dateDiff)
        const index                    = steps.findIndex(step => step === closestValueToTheDueDate)
        setSliderInitialValue(index)
        setSliderDisplayValue(steps[index])
      } else {
        setSliderInitialValue(0)
        setSliderDisplayValue(0)
      }
    }
  }, [sliderIndex, revisionHistory, selectedDeck])

  const getData = (id: string) => {
    getDeck({ token, id })
  }

  const handleTagDelete = (tag: string) => {
    if (selectedDeck && !isUpdating) {
      updateDeck({ token, id: did, data: { ...selectedDeck, tags: selectedDeck.tags.filter(t => t !== tag) } })
    }
  }

  const handleDueDateChange = useCallback(async (valueInDays: number | null) => {
    if (valueInDays === null) return

    const currentCard = selectedDeck?.cards[sliderIndex]

    if (currentCard) {
      let updatedRevisionHistory: RevisionItem[] = []

      // If current card not found in revision history, add it to the revision history
      if (!revisionHistory?.find(rh => rh?.card?.id === currentCard?.id)) {
        updatedRevisionHistory = [
          ...revisionHistory,
          {
            id: currentCard.id,
            deck_id: selectedDeck?.id || '',
            due_date: moment().add(valueInDays, 'days').format('MM-DD-YYYY'),
            last_revision_date: moment().format('MM-DD-YYYY'),
            deckName: selectedDeck?.name || '',
            name: selectedDeck?.name || '',
            cardTitle: currentCard.title,
            card: currentCard,
            type: 'REVISION'
          }]
      } else {
      // If current card found in revision history, update the due_date
        updatedRevisionHistory = revisionHistory?.map((r: RevisionItem) =>
          (
            {
              ...r,
              due_date: r.card.id === currentCard.id ? moment().add(valueInDays, 'days').format('MM-DD-YYYY') : r.due_date
            })) || []
      }

      updateRevision({ token, revision_history: updatedRevisionHistory, cardId: currentCard.id })
    }
  }, [sliderIndex, revisionHistory])

  const MemomizedDeckHeader = useMemo(() => {
    return (
      <Block paddingHorizontal={sizes.sm}>
        <Text p bold >{selectedDeck?.name}</Text>

        <Text p  >{selectedDeck?.description}</Text>
        {
          (selectedDeck?.tags?.length &&
            !(selectedDeck.tags.length === 1 && selectedDeck.tags[0] === '[]')  // Because of the backend bug
          ) && (
            <Block color={colors.card} row flex={0} align='center' paddingVertical={sizes.padding}>
              <Text gray size={sizes.sm} >Tags : </Text>

              <Block
                scroll
                horizontal
                renderToHardwareTextureAndroid
                showsHorizontalScrollIndicator={false}
              >
                {
                  selectedDeck?.tags?.map((tag, index) => {
                    return (
                      <Chip
                        key={`chip-${index}`}
                        marginHorizontal={5}
                        size={sizes.sm}
                        closeable
                        updating={isUpdating}
                        onClose={() =>  handleTagDelete(tag) }>
                        {tag}
                      </Chip>
                    )
                  })}
              </Block>
            </Block>
          )
        }
      </Block>
    )
  }, [selectedDeck, isUpdating])

  const RightHeaderButton = useMemo(() => {
    return (
      <Block row white align='center' justify='center' style={{ width: 70 }}>
        <Pressable onPress={() => {
          setShowPlayModal(true)
        }} >
          <Ionicons  size={30} name="play-circle-outline" color={colors.primary} />
        </Pressable>
        <Pressable onPress={() => {
          setShowShareModal(true)
        }} >
          <Ionicons  size={30} name="ellipsis-horizontal-outline" color={colors.primary} />
        </Pressable>

      </Block>
    )
  }, [])

  const renderItem = ({ item, index }: { item: CardItem, index: number }) => {
    if (!selectedDeck) return <View/>

    return <DeckCard
      card={item}
      cardHeaderComponent={(index === 0) ? MemomizedDeckHeader : undefined}
    />
  }

  if (isLoading || !isRequested) {
    return (
      <Block flex={1} align='center' justify='center' >
        <ActivityIndicator size={'large'} color={colors.primary} />
      </Block>
    )
  }

  if (isRequested) {
    return (<>
      {
        selectedDeck && (
          <>
            <NewPlayModal visible={showPlayModal} deckItem={selectedDeck} toggleModal={() => setShowPlayModal(prev => !prev)}  />
            <ShareModal visible={showShareModal} deckItem={selectedDeck} toggleModal={() => setShowShareModal(prev => !prev)}  />
          </>)
      }

      <Carousel
        ref={gContext?.decksScreenflatListRef}
        loop={false}
        height={WINDOW_HEIGHT - 70}
        vertical
        autoPlay={false}
        data={selectedDeck?.cards || []}
        windowSize={5}
        onSnapToItem={(index) => { setSliderIndex(index) }}
        renderItem={renderItem}
      />

      <Block position='absolute' bottom={120} right={sizes.s} height={100} width={50}  >
        <MotiPressable onPress={() => gContext?.decksScreenflatListRef.current?.prev()} style={{ marginBottom: sizes.sm }}>
          <ArrowButton name="chevron-double-up" size={35} color={colors.primary} style={{ backgroundColor: colors.white }} />
        </MotiPressable>
        <MotiPressable onPress={() => gContext?.decksScreenflatListRef.current?.next()}>
          <ArrowButton name="chevron-double-down" size={35} color={colors.primary} style={{ backgroundColor: colors.white }}/>
        </MotiPressable>

      </Block>

      <Block
        position='absolute'
        bottom={0}
        center
        width={WINDOW_WIDTH}
        paddingHorizontal={sizes.m}
        paddingVertical={sizes.m}
        style={{ backgroundColor: colors.primaryOverlay }}>
        <Block row align='flex-end'>
          <Ionicons name='alarm-outline' size={15} color={colors.text} style={{ marginRight: sizes.s }} />
          <Slider
            cardId={selectedDeck?.cards[sliderIndex]?.id || ''}
            initialValue={sliderInitialValue}
            steps={steps}
            isLoading={isUpdatingUser}
            onSlidingComplete={(value) => {
              handleDueDateChange(value)
            }}
            onValueChange={(value) => {
              setSliderDisplayValue(value)
            }}
          />
        </Block>
        <Text size={12} white bold style={{ textAlign: 'right', marginRight: sizes.s }}  >{`Review Due in ${sliderDisplayValue} days`}</Text>

      </Block>

      <FloatingDrawerOpener />
    </>
    )
  } else return null
}

export default DecksDetailsScreen
