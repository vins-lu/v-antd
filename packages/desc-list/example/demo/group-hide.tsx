import React from 'react'
// import DescList from '../../src/index'
import DescList, { CardWrapper } from '../../dist/index'
import { groupHideDescItems, groupDescItemsValue } from './data'

export default function Demo(): JSX.Element {
  return <DescList items={groupHideDescItems} hideTitle groupWrapper={CardWrapper}  data={groupDescItemsValue} />
}
