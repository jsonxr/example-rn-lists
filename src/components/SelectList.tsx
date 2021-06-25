/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, FlatListProps, ListRenderItemInfo } from 'react-native'

/**
 * This is the info property passed in the renderItem function
 */
export type SelectListRenderItemInfo<ItemT> = ListRenderItemInfo<ItemT> & {
  // item: ItemT; index: number; separators: {...}
  selected: boolean
  onChange: () => void
}
export type SelectListRenderItem<ItemT> = (info: SelectListRenderItemInfo<ItemT>) => React.ReactElement | null

type RefreshCallback = React.Dispatch<React.SetStateAction<number | undefined>>
type RefreshMapRef = Map<string, RefreshCallback>

//------------------------------------------------------------------------------
// ItemView
// This wraps a renderItem in selection logic to cause renders to happen only
// once on a selected change
//------------------------------------------------------------------------------
type ItemViewProps<ItemT> = Omit<SelectListRenderItemInfo<ItemT>, 'onChange'> & {
  keyExtractor: (item: ItemT, index: number) => string
  selectedRef: React.MutableRefObject<ItemT[]>
  refreshMapRef: React.MutableRefObject<RefreshMapRef>
  onChange: (item: ItemT, index: number, selected: boolean) => void
  renderItem: SelectListRenderItem<ItemT>
}
function ItemView<ItemT>({
  item,
  index,
  onChange,
  keyExtractor,
  selectedRef,
  refreshMapRef,
  separators,
  renderItem,
}: ItemViewProps<ItemT>) {
  // Setup the refresh mechanism
  const [, refresh] = useState<number>()
  const refreshMap = refreshMapRef.current
  refreshMap.set(keyExtractor(item, index), refresh)
  useEffect(() => {
    return () => {
      refreshMap.delete(keyExtractor(item, index))
    }
  }, [refreshMap, keyExtractor, item, index])

  // Are we selected
  const selected = selectedRef.current.includes(item)

  const _onChange = () => {
    onChange && onChange(item, index, !selected)
    refresh(Date.now)
  }

  // Render element
  console.log('ItemView:', keyExtractor(item, index), selected)
  return renderItem({ item, index, separators, selected, onChange: _onChange })
}

/**
 * All the same properties as FlatList plus:
 *  - multiple: default is false so only allow single rendered list
 *  - renderItem: Same as FlatList renderItem but adds selected, and an onChange callback
 */
type SelectListProps<ItemT> = Omit<FlatListProps<ItemT>, 'renderItem'> & {
  multiple?: boolean
  initialSelected?: ItemT[] | ItemT
  onSelect: (items: ItemT[]) => void
  renderItem: SelectListRenderItem<ItemT>
}

/**
 *
 * @param {SelectListProps} props
 */
function SelectList<ItemT>({
  data,
  initialSelected: initialSelectedProp = [],
  multiple = false,
  keyExtractor = (item: ItemT, index: number): string => (item as any)?.key ?? (item as any)?.id ?? index.toString(),
  onSelect,
  renderItem,
  ...props
}: SelectListProps<ItemT>) {
  const selectedRef = useRef<ItemT[]>([])
  const refreshMapRef = useRef<RefreshMapRef>(new Map())
  const initialSelected = Array.isArray(initialSelectedProp) ? initialSelectedProp : [initialSelectedProp]

  if (!multiple && initialSelected.length > 1) {
    throw new Error('SelectList if multiple is set, initialSelected can only be a single item')
  }

  const onChange = (item: ItemT, index: number, selected: boolean) => {
    if (multiple) {
      if (selected) {
        selectedRef.current.push(item)
      } else {
        const oldIndex = selectedRef.current.findIndex((e) => e === item)
        if (oldIndex < 0) {
          throw new Error('Previous element not found')
        }
        selectedRef.current.splice(oldIndex, 1)
      }
    } else {
      if (item !== selectedRef.current[0]) {
        selectedRef.current.forEach((e) => {
          // TODO: Not tracking item's index... need to wrap item with our own structure so we can have entry.item, entry.index to properly extract the key
          const fn = refreshMapRef.current.get(keyExtractor(e, 0))
          if (fn) {
            fn(Date.now())
          }
        })
      }
      selectedRef.current = [item]
    }

    onSelect(selectedRef.current)
  }

  const _renderItem = ({ item, index, separators }: ListRenderItemInfo<ItemT>) => {
    const selected = initialSelected.includes(item)
    return (
      <ItemView<ItemT>
        keyExtractor={keyExtractor}
        item={item}
        index={index}
        separators={separators}
        selectedRef={selectedRef}
        refreshMapRef={refreshMapRef}
        selected={selected}
        renderItem={renderItem}
        onChange={onChange}
      />
    )
  }

  return <FlatList keyExtractor={keyExtractor} data={data} renderItem={_renderItem} {...props} />
}

export default SelectList
