/* eslint-disable no-console */
import React, { useRef } from 'react'
import SelectList, { SelectListRenderItem } from '../components/SelectList'
import ListItemView from '../components/ListItemView'
import Layout from '../components/Layout'
import data, { ListItem } from '../data'

const SingleSelectListPage = () => {
  const selectedRef = useRef<ListItem[]>([data[2]])
  const onSelect = (item: ListItem[]) => {
    selectedRef.current = item
  }

  const renderItem: SelectListRenderItem<ListItem> = ({ item, selected, onChange }) => {
    console.log('renderItem:', item.key, selected)
    return (
      <ListItemView
        selected={selected}
        id={item.key}
        title={item.title}
        subTitle={item.subTitle}
        overline={item.overline}
        onChange={onChange}
      />
    )
  }

  return (
    <Layout label="SingleSelectListPage" onSave={() => {}}>
      <SelectList
        data={data}
        initialSelected={data[2]}
        onSelect={onSelect}
        initialNumToRender={26}
        keyExtractor={(item) => item.key.toString()}
        getItemLayout={(_data, index) => ({ length: 50, offset: 50 * index, index })}
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default SingleSelectListPage
