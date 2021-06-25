/* eslint-disable no-console */
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import ListItemView from '../../components/ListItemView'
import Layout from '../../components/Layout'
import data, { ListItem } from '../../data'

interface ItemProps {
  item: ListItem
  selectedRef: any
  numColumns: number
  refreshRef: MutableRefObject<Map<number, any>>
}
const Item = ({ item, numColumns = 1, selectedRef, refreshRef }: ItemProps) => {
  const [, refresh] = useState<number>()
  const refreshMap = refreshRef.current
  refreshMap.set(item.key, refresh)

  useEffect(() => {
    return () => {
      console.log('cleanup', item.key)
      refreshMap.delete(item.key)
    }
  }, [refreshMap, item.key])

  const isSelected = selectedRef.current === item.key

  const onChange = useCallback(() => {
    console.log('onChange')
    const old = selectedRef.current
    if (old === item.key) {
      // We were selected, now we aren't
      selectedRef.current = undefined
    } else {
      // Unset existing selection
      const oldRefresh = refreshMap.get(old)
      if (oldRefresh) {
        console.log('refreshing old', old)
        oldRefresh(Date.now())
      }
      selectedRef.current = item.key
    }
    refresh(Date.now())
  }, [item.key, refreshMap, selectedRef])

  return (
    <View style={{ flex: 1 / numColumns }}>
      <ListItemView
        selected={isSelected}
        id={item.key}
        title={item.title}
        subTitle={item.subTitle}
        overline={item.overline}
        onChange={onChange}
      />
    </View>
  )
}

type RefreshCallback = React.Dispatch<React.SetStateAction<number | undefined>>
type RefreshMapRef = Map<number, RefreshCallback>
const FlatListUncontrolledPage = () => {
  const numColumns = 1
  const selectedRef = useRef<number>(2)
  const refreshRef = useRef<RefreshMapRef>(new Map())
  console.log('FlatListPage', selectedRef.current)

  const renderItem = ({ item }: { item: ListItem }) => (
    <Item numColumns={numColumns} item={item} selectedRef={selectedRef} refreshRef={refreshRef} />
  )

  return (
    <Layout label="FlatListUncontrolledPage" onSave={() => console.log('onSave')}>
      <FlatList
        data={data}
        initialNumToRender={26}
        numColumns={numColumns}
        getItemLayout={(_data, index) => ({ length: 50, offset: 50 * index, index })}
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default FlatListUncontrolledPage
