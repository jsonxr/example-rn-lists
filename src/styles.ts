import { Appearance, StyleSheet } from 'react-native'

export const isDarkMode = Appearance.getColorScheme() === 'dark'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    alignContent: 'space-around',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.1,
    color: 'rgba(1,1,1,0.87)',
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 0.1,
    color: 'rgba(1,1,1,0.74)',
  },
  overline: {
    fontSize: 12,
    letterSpacing: 0.1,
    color: 'rgba(1,1,1,0.74)',
  },
})

export const ITEM_HEIGHT = 50
