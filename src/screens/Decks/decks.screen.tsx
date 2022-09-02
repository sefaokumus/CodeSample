import React, { useEffect, useMemo } from 'react'

import { RefreshControl } from 'react-native'

import TreeView                                     from '../../components/TreeView'
import {  Spinner }                                 from '../../components/ui'
import { DeckScreenProps }                          from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'

type Item = {
  name: string,
  value: string,
  items?: Item[],
}

const DecksScreen = ({ navigation } : DeckScreenProps) => {
  const { colors } = useTheme()

  const { token }                               = useStoreState(state => state.auth)
  const { structure, isLoading: userIsLoading } = useStoreState(state => state.user)
  // const { data: decksData, isLoading: decksIsLoading } = useStoreState(state => state.decks)

  const { user: { getDeckStructure } } = useStoreActions(state => state)

  useEffect(() => {
    console.log('aaaaa', structure?.rootId)
    if (token) {
      getDeckStructure({ token })
    }
  }, [token])

  // useEffect(() => {
  //   if (!decksData && token) {
  //     fetchDecks({ token })
  //   }
  // }, [token, decksData])

  const tree = useMemo(() => {
    if (!structure) return []

    const rootObjects = structure?.items[Object.keys(structure.items)[0]].children || []

    const handleNested = (children : string[]) :Item[] => {
      return children.map((item) => {
        const child = structure.items[item]

        if (child.children.length > 0) {
          return {
            name: child?.data?.title,
            value: child.id,
            items: handleNested(child.children)
          }
        }
        return { name: child?.data?.title, value: child.id }
      })
    }
    return handleNested(rootObjects)
  }, [structure])

  const handlePress = (id: string) => {
    navigation.navigate('DeckDetails', { id })
  }

  if (userIsLoading) { return <Spinner visible color={colors.primary} size='large' /> }

  return (
    <TreeView
      data={tree}
      refreshControl={<RefreshControl refreshing={userIsLoading} onRefresh={() => { getDeckStructure({ token }) }} />}
      onPress={(id: string) => handlePress(id)} />)
}

export default DecksScreen
