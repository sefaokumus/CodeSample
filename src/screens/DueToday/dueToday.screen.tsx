import React, { useCallback, useRef } from 'react'

import SegmentedPicker from 'react-native-segmented-picker'

import { Ionicons } from '@expo/vector-icons'

import { Block, Button, Text }     from '../../components/ui'
import { DueTodayScreenProps }     from '../../constants/types'
import { useStoreState, useTheme } from '../../hooks'
import { countDueCards }           from '../../utils/helper'

interface PickerItem {
  label: string;
  value: string;
  key?: string;
  testID?: string;
}
interface PickerColumn {
  key: string;
  items: Array<PickerItem>;
  flex?: number;
  testID?: string;
}

const DueTodayScreen = ({ navigation } : DueTodayScreenProps) => {
  const { colors, sizes }   = useTheme()
  const { revisionHistory } = useStoreState(state => state.user)
  const dueRevisions        = countDueCards(revisionHistory)
  const segmentedPickerRef  = useRef<SegmentedPicker>(null)

  const optionsArray = useCallback(() => {
    const options : Array<PickerColumn> = []
    const col : PickerColumn            = { key: 'count', items: [] }
    options.push(col)
    for (let i = 1; i <= dueRevisions.length; i++) {
      col.items.push({ label: `${i} Card${i > 1 ? 's' : ''}`, value: `${i}` })
    }

    return options
  }, [dueRevisions])

  return (
    <>
      <Block justify='center' paddingHorizontal={sizes.md}>
        <Block flex={0} align='center' >
          <Ionicons name='information-circle' size={50} color={colors.black} />
        </Block>
        <Text p paddingVertical={sizes.sm}   align='center'>Select the number of cards you want to review. The remaining cards will be pushed to tomorrow</Text>

        <Button primary onPress={() => {
          segmentedPickerRef.current?.show()
        }} ><Text white bold>Revise Card(s) </Text></Button>

      </Block>
      <SegmentedPicker
        ref={segmentedPickerRef}
        confirmText="Confirm"
        size={0.30}
        onConfirm={(prop) => navigation.navigate('DecksPlayer', { count: parseInt(prop.count) })}
        confirmTextColor={colors.primary as string}
        pickerItemTextColor={colors.primary as string}
        selectionBackgroundColor={colors.primaryOverlay as string}
        options={optionsArray()}
      />

    </>
  )
}

export default DueTodayScreen
