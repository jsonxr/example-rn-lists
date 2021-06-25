/* eslint-disable no-console */
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Layout from '../../components/Layout'
import data from '../../data'
import ListItemView from '../../components/ListItemView'

const FlatListControlledPage = () => {
  const [selected, setSelected] = useState<number>()
  console.log('FlatListPage=', selected)

  return (
    <Layout label="FlatListControlledPage" onSave={() => console.log(selected)}>
      <FlatList
        data={data}
        initialNumToRender={26}
        getItemLayout={(_data, index) => ({ length: 50, offset: 50 * index, index })}
        renderItem={({ item }) => (
          <ListItemView
            selected={selected === item.key}
            id={item.key}
            title={item.title}
            subTitle={item.subTitle}
            overline={item.overline}
            onChange={() => setSelected(item.key)}
          />
        )}
      />
    </Layout>
  )
}

export default FlatListControlledPage
