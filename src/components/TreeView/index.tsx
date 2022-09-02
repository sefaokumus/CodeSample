import React, { useState } from 'react'

import { MotiView } from 'moti'

import { RefreshControlProps, ViewStyle } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { useTheme }            from '../../hooks'
import { AnimateHeight }       from '../AnimateHeight'
import { Block, Button, Text } from '../ui'
import Badge                   from '../ui/Badge'

type Item = {
  [key: string]: any
  name: string
  value: string
  items?: Item[]
  displayNodeName?: string
  childrenNodeName?: string
}

type TreeProps = {
  containerStyle?: ViewStyle,
  data: Item[],
  displayNodeName?: string,
  childrenNodeName?: string,
  onPress?: (item: string) => void
  refreshControl? :  React.ReactElement<RefreshControlProps> | undefined;

}

type ListProps = {
  index: number
  label: string
  onPress : () => void
  items : Item[]
  branches : React.ReactNode
}

type ItemsListProps = {
  items: Item[],
  selectedItems: { [key: string]: {} }
  onPress: (data: object, item: Item) => void
  displayNodeName: string
  childrenNodeName: string

}

const TreeView = (props: TreeProps) => {
  const [selectedItems, setSelectedItems] = useState({})

  const {
    containerStyle,
    data,
    displayNodeName,
    childrenNodeName,
    onPress,
    refreshControl,
    ...rest
  } = props
  const dNN = displayNodeName || 'name'
  const cNN = childrenNodeName || 'items'

  const selectAccountFunc = (selectedItems: object, item: Item) => {
    if (item?.items?.length) {
      setSelectedItems({ ...selectedItems })
    } else {
      onPress && onPress(item.value)
    }
  }

  const checkType = data ? (data instanceof Array ? data : []) : []
  return (
    <Block scroll refreshControl={refreshControl}  contentContainerStyle={containerStyle}>
      <ItemsList
        items={checkType}
        selectedItems={selectedItems}
        onPress={selectAccountFunc}
        displayNodeName={dNN}
        childrenNodeName={cNN}
        {...rest}
      />
    </Block>
  )
}

const ItemsList = ({
  items,
  selectedItems,
  onPress,
  ...rest
}: ItemsListProps) => {
  const { sizes }                             = useTheme()
  const { displayNodeName, childrenNodeName } = rest

  const handleParentClicked = (item : Item) => {
    if (selectedItems[item.value]) {
      delete selectedItems[item.value]
    } else {
      selectedItems[item.value] = {}
    }
    onPress(selectedItems, item)
  }

  const handleSubItemsListChange = (subSelections : object, item : Item) => {
    selectedItems[item.value] = subSelections
    onPress(selectedItems, item)
  }

  return (
    <Block>
      {items.map((item, k) => (
        <Block key={`listItem_${k}`} >
          <List
            index={k}
            label={item[displayNodeName] || item.name}
            items={item[childrenNodeName] || item.items}
            onPress={() => {
              handleParentClicked(item)
            }}
            branches= {item[childrenNodeName] &&
              item[childrenNodeName].length > 0 &&
              selectedItems[item.value] && (
              <Block marginLeft={sizes.sm}>
                <ItemsList
                  items={item[childrenNodeName]}
                  selectedItems={selectedItems[item.value]}
                  onPress={(subSelections, opt) => {
                    handleSubItemsListChange(subSelections, opt)
                  }}
                  {...rest}
                />
              </Block>
            ) }
            {...rest}
          />
        </Block>
      ))}
    </Block>
  )
}

const List = ({
  index,
  label,
  onPress,
  items,
  branches
}: ListProps) => {
  const [show, toggle]    = React.useReducer((open) => !open, false)
  const { colors, sizes } = useTheme()

  const handlePress = (hasItems: boolean) => {
    if (hasItems) {
      toggle()
    }
    onPress && onPress()
  }
  return (
    <Block key={index} flex={1}>
      <Button onPress={() => handlePress(items?.length > 0)} row justify='flex-start' align='center' padding={sizes.s} >
        {
          items?.length > 0 ? (
            <MotiView
              style={{ marginRight: sizes.xs }}
              animate={{
                rotateZ: show ? '90deg' : '0deg'
              }}>
              <Ionicons name="chevron-forward" color={colors.primary} size={16} />
            </MotiView>)
            : <Ionicons name="chevron-forward" color={colors.primary} size={16} />
        }

        <Text style={{ flexShrink: 1 }} selectable={false} primary p numberOfLines={1}>
          {label}
        </Text>
        {
          items?.length > 0 && (<Badge color={colors.black} size="small">{items.length}</Badge>)
        }
      </Button>
      <AnimateHeight enterFrom="bottom" hide={!show}>
        {branches}
      </AnimateHeight>
    </Block>
  )
}

export default TreeView
