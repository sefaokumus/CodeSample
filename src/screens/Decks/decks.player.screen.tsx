import React, { useMemo, useState, useEffect, useCallback } from 'react'

import moment from 'moment'

import { ActivityIndicator } from 'react-native'

import { Block, Button, Text }                      from '../../components/ui'
import { WINDOW_WIDTH }                             from '../../constants'
import { DecksPlayerScreenProps, RevisionItem }     from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'
import { countDueCards, handleUserStatsUpdate  }    from '../../utils/helper'

import CardViewer from './card-viewer.component'

const DecksPlayerScreen = ({ route, navigation }: DecksPlayerScreenProps) => {
  const count         = route?.params?.count
  const revisionItems = route?.params?.revisionItems
  const mode          = route?.params?.mode

  const { auth: { token }, user: { revisionHistory, stats } } = useStoreState(state => state)
  const { updateUserStats, updateRevision }                   = useStoreActions(actions => actions.user)
  const { colors, sizes }                                     = useTheme()
  const [index, setIndex]                                     = useState(0)
  const [itemsToPlay, setItemsToPlay]                         = useState<RevisionItem[]>([])
  // const [actions, setActions]                                 = useState<{ id : string, nextRevisionInDays : number  }[]>([])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button shadow={false} paddingHorizontal={sizes.sm} onPress={() => { navigation.navigate('Home') }}>
          <Text h5 danger transform='uppercase'>EXIT</Text>
        </Button>)
    })
    // if revisionItems are set through the route params, then set them as items to play. Otherwise, use the cards in the revision history that are due today
    if (revisionItems) {
      setItemsToPlay(revisionItems)
    } else {
      setItemsToPlay(countDueCards(revisionHistory).slice(0, count))
    }
  }, [])

  const handleNext = () => {
    if (index <= itemsToPlay.length) { setIndex(index + 1) }
  }

  const updateRevisionHistory = (id: string, nextRevisionInDays: number) => {
    const updatedStats = handleUserStatsUpdate(stats)

    // update the user stats
    if (updatedStats) { updateUserStats({ token, data: updatedStats }) }

    let updatedRevisionHistory // new revision history object

    // remove from revisionHistory if nextRevisionInDays is 0
    if (nextRevisionInDays === 0) {
      updatedRevisionHistory = revisionHistory.filter(item => item.id !== id)
    } else {
      updatedRevisionHistory = revisionHistory.map(item => {
        if (item.id === id) {
          return {
            ...item,
            due_date: moment().startOf('day').add(nextRevisionInDays, 'days').format('MM-DD-YYYY')
          }
        }
        return item
      })
    }

    updatedRevisionHistory.sort((a, b) => moment(a.due_date, 'MM-DD-YYYY').diff(moment(b.due_date, 'MM-DD-YYYY'))) // sort by due date
    updateRevision({ token, revision_history: updatedRevisionHistory })
  }

  // const updateRevisionHistory = useCallback(async () => {
  //   const updatedStats = handleUserStatsUpdate(stats)

  //   // update the user stats
  //   if (updatedStats) { updateUserStats({ token, data: updatedStats }) }

  //   let updatedRevisionHistory // new revision history object

  //   // first remove the revisionItems from history those are not set to be reviewed in the future
  //   const idsToRemoveFromRevisionHistory = actions.filter(action => action.nextRevisionInDays === 0).map(action => action.id)
  //   updatedRevisionHistory               = revisionHistory?.filter(rh => !idsToRemoveFromRevisionHistory.includes(rh.id))

  //   // If itemsToPlay is set through the play modal, We have to check if current revisionItem is in revisionHistory of user
  //   // incase user wants to review that card in the future
  //   const idsThatMustBeInRevisionHistory = actions.filter(action => ((action.nextRevisionInDays > 0) && (!revisionHistory.map(r => r.id).includes(action.id)))).map(action => action.id)

  //   if (idsThatMustBeInRevisionHistory.length > 0) {
  //     updatedRevisionHistory = [
  //       ...updatedRevisionHistory,
  //       ...itemsToPlay.filter(item => idsThatMustBeInRevisionHistory.includes(item.id))]
  //       .sort((a, b) => moment(a.due_date, 'MM-DD-YYYY').diff(moment(b.due_date, 'MM-DD-YYYY'))) // sort by due date
  //   }

  //   // then update the items in the revision history with the new due dates
  //   updatedRevisionHistory = updatedRevisionHistory?.map((r: RevisionItem) => {
  //     const action = actions.find(action => action.id === r.id)
  //     if (action) {
  //       r.due_date = moment().add(action.nextRevisionInDays, 'days').format('MM-DD-YYYY')
  //     }
  //     return r
  //   })

  //   // TODO Must be edited on the backend side. Current shape is not a good practice
  //   // const saveHistoricalRevisionPromies = updatedRevisionHistory.map(rh => SaveHistoricalRevision({
  //   //   token,
  //   //   data: {
  //   //     id: uuid(),
  //   //     deck_id: rh.deck_id,
  //   //     next_revision_in_days: actions.find(action => action.id === rh.id)?.nextRevisionInDays || 0,
  //   //     card_id: rh.card.id,
  //   //     card: rh.card
  //   //   }
  //   // })
  //   // )

  //   // await Promise.all(saveHistoricalRevisionPromies)
  //   updateRevision({ token, revision_history: updatedRevisionHistory })

  //   navigation.navigate('Home')
  // }, [actions])

  const pressToContinueButton = useCallback((onPress, title = 'Press To Continue') => (
    <Block
      position='absolute'
      bottom={0}
      center
      width={WINDOW_WIDTH}
      padding={sizes.m}
      style={{ backgroundColor: colors.primaryOverlay }}>
      <Button white onPress={onPress} >
        <Text primary bold transform='uppercase'>{title}</Text>
      </Button>
    </Block>), [])

  const renderCongrats = useMemo(() => (
    <Block center padding={sizes.sm} justify='flex-start'>
      <Text h3 primary center marginVertical={sizes.m}>Congratulations!</Text>
      <Text h4 center>You have reviewed all the cards</Text>
      {pressToContinueButton(() => navigation.navigate('Home'), 'Go back home')}
    </Block>
  ), [itemsToPlay.length])

  if (index >= 0 && index < itemsToPlay.length) {
    return <CardViewer
      revisionItem={itemsToPlay[index]}
      subTitle={`${index + 1} / ${itemsToPlay.length} cards`}
      isLearning={mode === 'LEARNING'}
      next={handleNext}
      onContinue={(id, due_date) => {
        updateRevisionHistory(id, due_date)
        // setActions([...actions, { id,  nextRevisionInDays: due_date }])
      }}
    />
  }

  if (index !== 0 && index >= itemsToPlay.length) {
    return renderCongrats
  }

  return <Block flex={1} justify='center' align='center'><ActivityIndicator size="large" color={colors.primary} /></Block>
}

export default DecksPlayerScreen
