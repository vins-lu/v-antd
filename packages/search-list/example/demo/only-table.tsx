import React from 'react'
// import SearchList, { SearchDataType } from '../../src/index'
import SearchList from '../../dist/index'
import { SearchDataType } from '../../types/index'
import { columns, data } from './data'

function onSearch(formValue: any): Promise<SearchDataType<unknown>> {
  console.log('formValue', formValue)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: data,
        page: 1,
        total: 200,
      })
    }, 1000)
  })
}

export default function Demo(): JSX.Element {
  return <SearchList rowKey="name" tableColumns={columns} onSearch={onSearch} />
}
