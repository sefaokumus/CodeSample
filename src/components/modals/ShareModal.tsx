import React, { useEffect } from 'react'

import Constants from 'expo-constants'

import { ActivityIndicator } from 'react-native'
import Toast                 from 'react-native-toast-message'

import { Ionicons } from '@expo/vector-icons'

import { DeckItem }                                 from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'
import { Block, Modal, Switch, Text }               from '../ui'

const ShareModal: React.FC<{ visible: boolean, deckItem: DeckItem, toggleModal: () => void }> = ({ visible, deckItem, toggleModal }) => {
  const { colors, sizes }                                                           = useTheme()
  const [isPublic, setIsPublic]                                                     = React.useState(false)
  const [link, setLink]                                                             = React.useState<string | null>(null)
  const { decks: { data: userDecks, isUpdating }, auth: { token, data: userData } } = useStoreState(state => state)
  const { updateDeck }                                                              = useStoreActions(state => state.decks)

  const handleVisibilitySwitch = () => {
    setIsPublic(prev => !prev)
    const decksWithTheSameTitle = userDecks?.filter((deck) => (deck.id !== deckItem.id && deck.name === deckItem.name)) || []

    if (decksWithTheSameTitle.length > 0) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Multiple decks with the same name, kindly rename the deck',
        visibilityTime: 4000
      })
    }

    updateDeck({ token,  data: { ...deckItem,  is_public: !deckItem.is_public }, id: deckItem.id })
  }

  useEffect(() => {
    if (deckItem.is_public) {
      setIsPublic(true)
      setLink((Constants?.manifest?.extra?.api + '/public/' + userData?.username + '/' + deckItem.slug).toLowerCase())
    }
  }, [deckItem])

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
      <Text h4 center>Share Modal</Text>

      <Block row flex={0} justify='space-between' marginVertical={sizes.m}>
        <Block row >
          <Ionicons name='globe-outline' size={sizes.l} color={colors.gray} />
          <Block marginLeft={sizes.s}>
            <Text p>Share to the public</Text>
            <Text p size={10}>Publish and share link with anyone</Text>
          </Block>
        </Block>
        <Switch checked={isPublic} onPress={handleVisibilitySwitch} />
      </Block>
      { isUpdating && <ActivityIndicator size='small' color={colors.primary} /> }
      { (isPublic && link && !isUpdating) && <Text p copyable size={12} >{link}</Text> }
    </Modal>
  )
}

export default ShareModal
