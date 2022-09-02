import React, { useEffect, useState } from 'react'

import { Pressable } from 'react-native'

import { Block, Spinner, Text }                     from '../../components/ui'
import { InterestItem, UserInterestsType }          from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'

const InterestsScreen = () => {
  const { auth: { token }, user: { interests, isLoading } } = useStoreState(state => state)
  const { getUserInterests, updateUserInterests }           = useStoreActions(actions => actions.user)
  const { sizes, colors }                                   = useTheme()

  const [_interests, setInterests] = useState<UserInterestsType[]>([])

  useEffect(() => {
    if (_interests.length === 0) { setInterests(interests) }
  }, [interests])

  useEffect(() => {
    getUserInterests({ token })
  }, [])

  useEffect(() => {
    if (_interests !== interests) {
      updateUserInterests({
        token,
        user_interests: _interests
      })
    }
  }, [_interests])

  const handleInterestClick = (interest: InterestItem) => {
    const updatedInterests = _interests.map(ig => {
      return {
        ...ig,
        interests: ig.interests  ? ig.interests.map(i => {
          return { ...i, selected: i.id === interest.id ? !i.selected : i.selected }
        }) : []
      }
    })

    setInterests(updatedInterests)
  }

  return (<>
    <Spinner visible={isLoading} color={colors.primary} size='large' />
    <Block scroll padding={sizes.s}>
      {
        _interests?.map(interestGroup => (
          <Block key={interestGroup.id} >
            <Text h4>{interestGroup.name}</Text>
            {
              interestGroup.interests && (
                <Block row wrap='wrap'>
                  {
                    interestGroup?.interests.map(interest =>
                      <Pressable
                        key={`${interestGroup.id}-${interest.id}`}
                        onPress={() => handleInterestClick(interest)}
                        style={{
                          backgroundColor: interest.selected ? colors.primary : colors.white,
                          borderWidth: !interest.selected ? 1 : 0,
                          borderColor: colors.light,
                          paddingVertical: sizes.xs,
                          paddingHorizontal: sizes.s,
                          borderRadius: sizes.radius,
                          shadowColor: colors.shadow,
                          shadowOffset: {
                            width: sizes.shadowOffsetWidth,
                            height: sizes.shadowOffsetHeight
                          },
                          shadowOpacity: sizes.shadowOpacity,
                          shadowRadius: sizes.shadowRadius,
                          elevation: sizes.elevation,
                          marginRight: sizes.s,
                          marginBottom: sizes.sm
                        }}>
                        <Text p white={interest.selected} black={!interest.selected}>{interest.name}</Text>
                      </Pressable>)
                  }
                </Block>
              )
            }

          </Block>)
        )
      }

    </Block>
  </>
  )
}

export default InterestsScreen
