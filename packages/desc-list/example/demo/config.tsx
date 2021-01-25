import React from 'react'
import DescList from '../../dist/index'
import { configDescItems, configDescItemsValue } from './data'

export default function Demo(): JSX.Element {
  return <DescList items={configDescItems} data={configDescItemsValue} />
}
