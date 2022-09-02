import React from 'react'

import Markdown from 'react-native-markdown-display'

import { Ionicons } from '@expo/vector-icons'

import { WINDOW_WIDTH } from '../constants'
import { CardItem  }    from '../constants/types'
import {  useTheme }    from '../hooks'

import { Block,  Text } from './ui'
interface DeckCardProps {
  card: CardItem,
  cardHeaderComponent?: JSX.Element,
}

const DeckCard = ({ card, cardHeaderComponent }: DeckCardProps) => {
  const { colors, sizes } = useTheme()

  return (
    <Block scroll={Boolean(cardHeaderComponent)}  paddingHorizontal={sizes.xs} white  >
      {cardHeaderComponent}
      <Block row flex={0} align='flex-start' paddingRight={sizes.m} >
        <Ionicons name='reader-outline' size={15} color={colors.text} style={{ marginRight: sizes.s }} />
        <Text p>{card.title}</Text>
      </Block>
      <Block  scroll={!cardHeaderComponent} paddingLeft={sizes.md} paddingRight={sizes.xs} >
        <Markdown >
          {card?.body || ''}
        </Markdown>
        {/* to make all markdown visible because of the fix slider */}
        <Block height={80} />
      </Block>
      <Block style={{ backgroundColor: 'transparent' }} position='absolute' bottom={0} left={0} flex={0} height={150} width={WINDOW_WIDTH} />
    </Block>
  )
}

export default React.memo(DeckCard)
