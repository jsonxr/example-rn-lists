export interface ListItem {
  key: number
  title: string
  overline: string
  subTitle: string
}

const range = (size: number) => Array.from(Array(size).keys())

const data: ListItem[] = range(100).map((key) => ({
  key,
  title: `List Item [${key}]`,
  overline: 'sample list item',
  subTitle: 'subtitle',
}))

export default data
