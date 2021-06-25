/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from '../styles'

export interface ListItemViewProps {
  id: number
  title: string
  overline: string
  subTitle: string

  selected: boolean
  onChange?: () => void
}
const ListItemView = ({ title, overline, subTitle, selected, onChange }: ListItemViewProps) => {
  return (
    <Pressable onPress={onChange}>
      <View style={styles.row}>
        <View style={{ width: 40, justifyContent: 'center', alignContent: 'center' }}>
          <Text>{selected ? 'yes' : 'no'}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.subtitle}>{subTitle}</Text>
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text style={styles.overline}>{overline}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default memo(ListItemView)
