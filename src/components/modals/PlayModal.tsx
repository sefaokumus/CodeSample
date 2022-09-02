import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import moment            from 'moment'
import DropDownPicker    from 'react-native-dropdown-picker'

import { DeckItem, NavigationProps, RevisionItem }    from '../../constants/types'
import { useStoreActions, useStoreState, useTheme }   from '../../hooks'
import { AnimatedToggle, Block, Button, Modal, Text } from '../ui'

type Option = {
  label: string,
  value: string
}
const defaultModes : Option[] = [
  { label: 'Learning Mode', value: 'learning' },
  { label: 'Revision Mode', value: 'revision' }
]

const PlayModal: React.FC<{ visible: boolean, deckItem: DeckItem, toggleModal: () => void }> = ({ visible, deckItem, toggleModal }) => {
  const { colors, sizes }                               = useTheme()
  const navigation                                      = useNavigation<NavigationProps>()
  const [selectedMode, setSelectedMode]                 = useState<Option>(defaultModes[0])
  const [openCardsCountPicker, setOpenCardsCountPicker] = useState(false)
  const [cardCount, setCardCount]                       = useState('1')
  const [openSchedulePicker, setOpenSchedulePicker]     = useState(false)
  const [schedule, setSchedule]                         = useState('today')

  const { auth: { token }, user: { revisionHistory } } = useStoreState(state => state)
  const { updateRevision }                             = useStoreActions(actions => actions.user)

  const cardCountItems: Option[] = deckItem?.cards?.map((card, i) => ({ label: `${i + 1}`, value: `${i + 1}` })) || []
  const scheduleItems: Option[]  = [{ label: 'Daily', value: 'daily' }, { label: 'Today', value: 'today' }]

  const handleProceed = () => {
    toggleModal()

    if (schedule === 'today') {
      navigation.navigate('DecksPlayer', {
        mode: selectedMode.value === 'learning' ? 'LEARNING' : 'REVISION',
        revisionItems: deckItem.cards.slice(0, parseInt(cardCount)).map((card): RevisionItem => (
          {
            id: card.id,
            deck_id: deckItem.id,
            due_date: moment().format('MM-DD-YYYY'),
            last_revision_date: 'N/A',
            type: selectedMode.value === 'learning' ? 'LEARNING' : 'REVISION',
            deckName: deckItem.name,
            name: deckItem.name,
            cardTitle: card.title,
            card
          }
        )),
        schedule
      })
    } else {
      // group deck.cards into chunks of cardCount
      const chunks : RevisionItem[][] = deckItem.cards.reduce<RevisionItem[][]>((acc, card, i) => {
        const chunkIndex = Math.floor(i / parseInt(cardCount))
        acc[chunkIndex]  = acc[chunkIndex] || []
        acc[chunkIndex].push(
          {
            id: card.id,
            deck_id: deckItem.id,
            due_date: moment().add(chunkIndex, 'day').format('MM-DD-YYYY'),
            last_revision_date: 'N/A',
            type: selectedMode.value === 'learning' ? 'LEARNING' : 'REVISION',
            deckName: deckItem.name,
            name: deckItem.name,
            cardTitle: card.title,
            card
          }
        )
        return acc
      }, [])

      const itemsToReviewToday = [...chunks.splice(0, 1)[0]]

      const updatedRevisionHistory: RevisionItem[] = [...revisionHistory, ...chunks.reduce((acc, chunk) => [...acc, ...chunk], [])]
        .sort((a, b) => moment(a.due_date, 'MM-DD-YYYY').diff(moment(b.due_date, 'MM-DD-YYYY')))
      updateRevision({ token, revision_history: updatedRevisionHistory })

      navigation.navigate('DecksPlayer', {
        mode: selectedMode.value === 'learning' ? 'LEARNING' : 'REVISION',
        revisionItems: itemsToReviewToday,
        schedule
      })
    }
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
      <Text h4 center>Mode Settings</Text>
      <AnimatedToggle
        marginVertical={sizes.sm}
        options={defaultModes}
        onToggle={(mode) => { setSelectedMode(mode) }}
      />
      <Text p opacity={0.8} center >
        {
          selectedMode.value === 'learning'
            ? 'In Learning mode you will see the question and the answer at the same time'
            : 'In Revision mode you will see the question and the answer separately'
        }
      </Text>
      <Block
        align='flex-start'
        justify='center'
        flex={0}
        marginVertical={sizes.sm}
        style={{ zIndex: 999 }}>
        <Text bold p  >Please select how many cards that you want to {selectedMode.value === 'learning' ? 'learn' : 'revise'}</Text>

        <DropDownPicker
          open={openCardsCountPicker}
          setOpen={setOpenCardsCountPicker}
          value={cardCount}
          setValue={setCardCount}
          items={cardCountItems}
          listMode={cardCountItems.length < 5 ? 'DEFAULT' : 'MODAL'}
          placeholder={'Please Select Cards'}
          style={{ borderColor: colors.primary }}
          labelStyle={{ color: colors.primary }}
          listItemLabelStyle={{ color: colors.primary }}
          dropDownContainerStyle={{ borderColor: colors.primary }}

        />

      </Block>

      <Block
        align='flex-start'
        justify='center'
        flex={0}
        marginVertical={sizes.sm}
        style={{ zIndex: 899 }}>
        <Text bold p >Please Select a {selectedMode.value === 'learning' ? 'learning' : 'revising'} schedule</Text>

        <DropDownPicker
          open={openSchedulePicker}
          setOpen={setOpenSchedulePicker}
          value={schedule}
          setValue={setSchedule}
          items={scheduleItems}
          placeholder={''}
          dropDownDirection='BOTTOM'
          style={{ borderColor: colors.primary }}
          labelStyle={{ color: colors.primary }}
          listItemLabelStyle={{ color: colors.primary }}
          dropDownContainerStyle={{ borderColor: colors.primary }}
        />
      </Block>

      {
        schedule === 'daily' && <Text p> {cardCount} cards will be scheduled for every day for you to {selectedMode.value === 'learning' ? 'learn' : 'revise'} </Text>
      }

      <Button primary outlined marginTop={sizes.xl} onPress={handleProceed}>
        <Text primary bold p>Proceed</Text>
      </Button>

    </Modal>
  )
}

export default PlayModal
