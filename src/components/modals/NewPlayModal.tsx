import React, { useCallback, useRef, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import moment            from 'moment'

import SegmentedPicker, { PickerColumn } from 'react-native-segmented-picker'

import { DeckItem, NavigationProps, RevisionItem }  from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'
import {   Block, Button, Modal, Text }             from '../ui'

const PlayModal: React.FC<{ visible: boolean, deckItem: DeckItem, toggleModal: () => void }> = ({ visible, deckItem, toggleModal }) => {
  const { colors, sizes }         = useTheme()
  const navigation                = useNavigation<NavigationProps>()
  const segmentedPickerRef        = useRef<SegmentedPicker>(null)
  const [cardCount, setCardCount] = useState<number>(0)

  const { auth: { token }, user: { revisionHistory } } = useStoreState(state => state)
  const { updateRevision }                             = useStoreActions(actions => actions.user)

  const optionsArray = useCallback(() => {
    const options : Array<PickerColumn> = []
    const col : PickerColumn            = { key: 'count', items: [] }
    options.push(col)
    for (let i = 1; i <= deckItem?.cards?.length; i++) {
      col.items.push({ label: `${i} Card${i > 1 ? 's' : ''}`, value: `${i}` })
    }

    return options
  }, [deckItem?.cards])

  const handleProceed = () => {
    toggleModal()

    const chunks : RevisionItem[][] = deckItem.cards.reduce<RevisionItem[][]>((acc, card, i) => {
      const chunkIndex = Math.floor(i / cardCount)
      acc[chunkIndex]  = acc[chunkIndex] || []
      acc[chunkIndex].push(
        {
          id: card.id,
          deck_id: deckItem.id,
          due_date: moment().add(chunkIndex, 'day').format('MM-DD-YYYY'),
          last_revision_date: 'N/A',
          type: 'REVISION', // selectedMode.value === 'learning' ? 'LEARNING' : 'REVISION',
          deckName: deckItem.name,
          name: deckItem.name,
          cardTitle: card.title,
          card
        }
      )
      return acc
    }, [])

    const itemsToReviewToday = [...chunks.slice(0, 1)[0]]

    const newItemsToReview: RevisionItem[] = chunks.reduce((acc, chunk) => [...acc, ...chunk], [])

    const updatedRevisionHistory: RevisionItem[] = [...revisionHistory]

    newItemsToReview.forEach(item => {
      const existingItem = updatedRevisionHistory.find(rev => rev.id === item.id)
      if (existingItem) {
        existingItem.due_date           = item.due_date
        existingItem.last_revision_date = item.last_revision_date
        existingItem.type               = item.type
      } else {
        updatedRevisionHistory.push(item)
      }
    })

    updatedRevisionHistory.sort((a, b) => moment(a.due_date, 'MM-DD-YYYY').diff(moment(b.due_date, 'MM-DD-YYYY')))

    updateRevision({ token, revision_history: updatedRevisionHistory })

    navigation.navigate('DecksPlayer', {
      mode: 'REVISION', // selectedMode.value === 'learning' ? 'LEARNING' : 'REVISION',
      revisionItems: itemsToReviewToday,
      schedule: 'daily'
    })
  }

  return (
    <Modal visible={visible}
      containerProps={{
        color: colors.white,
        style: {
          borderWidth: 1,
          borderColor: colors.lightGray
        }
      }}
      onRequestClose={() => toggleModal()}

    >
      <Text h4 center>Revision Planner</Text>

      <Block flex={0} marginVertical={sizes.sm}>
        <Text bold p center>Please select how many cards you want to revise every day</Text>

        <Button primary marginBottom={sizes.l} marginTop={sizes.m} onPress={() => {
          segmentedPickerRef.current?.show()
        }} >
          <Text white bold>
            {
              cardCount === 0 ? 'Select' : `You will revise ${cardCount} card${cardCount > 1 ? 's' : ''} every day`
            }
          </Text>
        </Button>

      </Block>
      {
        cardCount > 0 && (
          <Button primary outlined onPress={handleProceed}>
            <Text primary bold p>Proceed</Text>
          </Button>
        )
      }
      <SegmentedPicker
        ref={segmentedPickerRef}
        confirmText="Confirm"
        size={0.30}
        onConfirm={(prop) => {
          setCardCount(parseInt(prop.count))
        }}
        confirmTextColor={colors.primary as string}
        pickerItemTextColor={colors.primary as string}
        selectionBackgroundColor={colors.primaryOverlay as string}
        options={optionsArray()}
      />

    </Modal>
  )
}

export default PlayModal
