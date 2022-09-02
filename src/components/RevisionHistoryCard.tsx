import React, { useCallback, useEffect } from 'react'

import moment         from 'moment'
import { Pressable  } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { RevisionItem }                             from '../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../hooks'
import { closest }                                  from '../utils/helper'

import { Block,   Slider,  Text } from './ui'

interface RevisionHistoryCardProps {
  item: RevisionItem,
}
const REVISION_HISTORY_CARD_HEIGHT = 120

const steps = [0, 1, 2, 3, 5, 7, 10, 30, 60, 90, 180]

const RevisionHistoryCard = ({ item }: RevisionHistoryCardProps) => {
  const { colors, sizes }                           = useTheme()
  const [initialValue, setInitialValue]             = React.useState(0)
  const [sliderDisplayValue, setSliderDisplayValue] = React.useState(0)
  const [showSlider, setShowSlider]                 = React.useState(true)

  const { auth: { token }, user: { revisionHistory, isUpdating } } = useStoreState(state => state)
  const { updateRevision }                                         = useStoreActions(state => state.user)

  useEffect(() => {
    // If current card found in revisionHistory, set the initial value of the slider
    let dateDiff = moment(item.due_date, 'MM-DD-YYYY').startOf('day').diff(moment().startOf('day'), 'days', true)

    if (dateDiff < 0) {
      dateDiff = 0
    }
    const closestValueToTheDueDate = closest(steps, dateDiff)
    const index                    = steps.findIndex(step => step === closestValueToTheDueDate)
    setInitialValue(index)
    setSliderDisplayValue(steps[index])
  }, [revisionHistory])

  const handleDueDateChange = useCallback(async (valueInDays: number | null) => {
    if (valueInDays === null) return

    const updatedRevisions = revisionHistory?.map((r: RevisionItem) => {
      if (r.card.id !== item.card.id) return r
      return {
        ...r,
        due_date: moment().startOf('day').add(valueInDays, 'days').format('MM-DD-YYYY')
      }
    }
    ).sort((a, b) => moment(a.due_date, 'MM-DD-YYYY').diff(moment(b.due_date, 'MM-DD-YYYY'), 'days')) || []

    updateRevision({ token, revision_history: updatedRevisions, cardId: item.card.id })
  }, [revisionHistory])

  return (
    <Pressable onPress={() => setShowSlider(prev => !prev) }>
      <Block card radius={1} height={REVISION_HISTORY_CARD_HEIGHT} paddingHorizontal={sizes.xs} marginBottom={1}>
        <Block style={{ flexDirection: 'row' }} align='center'  >
          <Ionicons name='reader-outline' size={22} color={colors.text} style={{ marginRight: sizes.s }} />
          <Text p  numberOfLines={1}>{item.deckName}</Text>
        </Block>
        <Block align='flex-start' justify='flex-start' paddingLeft={sizes.md}>
          <Text p>
            {item.cardTitle || 'No title'}
          </Text>
        </Block>

        <Block row align='flex-end'>
          {
            item.card?.id && showSlider && (
              <>
                <Ionicons name='alarm-outline' size={24} color={colors.text} style={{ marginRight: sizes.s }} />
                <Slider
                  cardId={item.card.id}
                  initialValue={initialValue}
                  isLoading={isUpdating}
                  steps={steps}
                  onSlidingComplete={(value) => {
                    handleDueDateChange(value)
                  }}
                  onValueChange={(value) => {
                    setSliderDisplayValue(value)
                  }}
                />
              </>
            )
          }
        </Block>

        <Text size={12} primary style={{ textAlign: 'right', marginRight: sizes.s }}  >{`Review Due in ${sliderDisplayValue} days`}</Text>

      </Block>
    </Pressable>
  )
}

export default React.memo(RevisionHistoryCard)
