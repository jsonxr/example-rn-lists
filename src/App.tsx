/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { SafeAreaView } from 'react-native'
import { NativeRouter as Router, Route } from 'react-router-native'
import Home from './pages/Home'
import FlatListControlledPage from './pages/FlatListControlled'
import FlatListUncontrolledPage from './pages/FlatListUncontrolled'
import SingleSelectListPage from './pages/SingleSelectListPage'
import MultipleSelectListPage from './pages/MultipleSelectListPage'

const App = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/flatlist-controlled" component={FlatListControlledPage} />
        <Route path="/flatlist-uncontrolled" component={FlatListUncontrolledPage} />
        <Route path="/selectlist-single" component={SingleSelectListPage} />
        <Route path="/selectlist-multiple" component={MultipleSelectListPage} />
      </Router>
    </SafeAreaView>
  )
}

export default App
