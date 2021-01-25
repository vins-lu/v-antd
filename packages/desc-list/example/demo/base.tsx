import React from 'react'
import DescList from '../../dist/index'
import { baseDescItems1, baseDescItems1Value } from './data'

export default function Demo(): JSX.Element {
  return <DescList items={baseDescItems1} data={baseDescItems1Value} />
}
