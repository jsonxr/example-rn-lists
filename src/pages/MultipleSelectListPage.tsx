/* eslint-disable no-console */
import React, { useRef } from 'react'
import SelectList from '../components/SelectList'
import ListItemView from '../components/ListItemView'
import Layout from '../components/Layout'
import data, { ListItem } from '../data'

const MultipleSelectListPage = () => {
  const selectedRef = useRef<ListItem[]>([data[2]])
  const onSelect = (items: ListItem[]) => {
    selectedRef.current = items
  }

  return (
    <Layout label="MultipleSelectListPage" onSave={() => {}}>
      <SelectList
        multiple
        data={data}
        initialSelected={[data[2]]}
        onSelect={onSelect}
        initialNumToRender={26}
        keyExtractor={(item) => item.key.toString()}
        getItemLayout={(_data, index) => ({ length: 50, offset: 50 * index, index })}
        renderItem={({ item, selected, onChange }) => {
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
        }}
      />
    </Layout>
  )
}

export default MultipleSelectListPage
