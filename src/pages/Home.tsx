import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'react-router-native'

// import { View } from 'react-native'
// import { Text } from '../components'

const Home = () => {
  return (
    <View>
      <Link to="/flatlist-controlled">
        <Text>FlatList (Controlled)</Text>
      </Link>
      <Link to="/flatlist-uncontrolled">
        <Text>FlatList (Uncontrolled)</Text>
      </Link>
      <Link to="/selectlist-single">
        <Text>SelectList (single)</Text>
      </Link>
      <Link to="/selectlist-multiple">
        <Text>SelectList (multiple)</Text>
      </Link>
    </View>
  )
}

export default Home
