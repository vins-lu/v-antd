import React from 'react'
// import SearchList, { SearchDataType } from '../../src/index'
import SearchList from '../../dist/index'
import { SearchDataType } from '../../types/index'
import { RenderFormItemProps } from '@vins-rc/render-form'
import { columns, data } from './data'

const formItems: RenderFormItemProps[] = [
  {
    label: 'ID',
    name: 'id',
    itemProps: {
      disabled: true,
      placeholder: '不可编辑',
    },
  },
  {
    label: 'name',
    name: 'name',
  },
  {
    label: 'age',
    name: 'age',
  },
  {
    label: 'level',
    name: 'level',
  },
]

function onSearch(formValue: any): Promise<SearchDataType<unknown>> {
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
  return <SearchList rowKey="name" tableColumns={columns} searchFields={formItems} onSearch={onSearch} />
}
