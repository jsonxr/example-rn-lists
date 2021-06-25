/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react'
import { Button, Text, View } from 'react-native'
import { Link } from 'react-router-native'

const Layout = ({ label, children, onSave }: { label: string; children: ReactNode; onSave: () => void }) => (
  <View style={{ flex: 1 }}>
    <Text style={{ fontSize: 24 }}>{label}</Text>
    <Link to="/">
      <Text>{' < '} Home</Text>
    </Link>
    {children}
    <Button title="save" onPress={onSave} />
  </View>
)

export default Layout
