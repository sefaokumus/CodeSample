import React from 'react'

import moment from 'moment'

import { RefreshControl } from 'react-native'
import { FlatList }       from 'react-native-gesture-handler'

import RevisionHistoryCard from '../../components/RevisionHistoryCard'
import { Block, Text }     from '../../components/ui'

import { WINDOW_HEIGHT }                            from '../../constants'
import { RevisionItem, ScheduledScreenProps }       from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'

const ScheduledScreen = ({ navigation }: ScheduledScreenProps) => {
  const { sizes }                                                 = useTheme()
  const { user: { revisionHistory, isLoading }, auth: { token } } = useStoreState(state => state)
  const { getRevisionHistory }                                    = useStoreActions(actions => actions.user)
  const sortedRevisionHistory                                     = revisionHistory.sort((a: RevisionItem, b: RevisionItem) => moment(a.due_date, 'MM-DD-YYYY').diff(moment(b.due_date, 'MM-DD-YYYY')))

  const keyExtractor    = (item: RevisionItem, index : number) => `${item.id}-${index}`
  const renderItem      = ({ item, index }: { item: RevisionItem, index: number }) => (<RevisionHistoryCard item={item}  />)
  const renderEmptyList = () => (
    <Block align='center' justify='center' paddingHorizontal={sizes.md} height={WINDOW_HEIGHT * 0.8} >
      <Text h4 center>You have no scheduled revisions</Text>
    </Block>
  )

  return (
    <FlatList
      data={sortedRevisionHistory}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={renderEmptyList}
      windowSize={50}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => { getRevisionHistory({ token }) }} />
      }
    />

  )
}

export default ScheduledScreen
