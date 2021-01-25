import React from 'react'
// import SearchList from '../../src/index'
import SearchList from '../../dist/index'
import { SearchDataType } from '../../types/index'
import { RenderFormItemProps } from '@vins-rc/render-form'
import { columns, data } from './data'

const formItems: RenderFormItemProps[] = [
  // {
  //   label: 'ID',
  //   name: 'id',
  //   itemProps: {
  //     disabled: true,
  //     placeholder: '不可编辑',
  //   },
  // },
  {
    type: 'group',
    label: '自定义分组-1',
    name: 'group-1',
    groups: [
      {
        type: 'input',
        label: '版本',
        name: ['version', 0],
        itemProps: {
          cache: 'no-cache',
        },
      },
      {
        type: 'input',
        label: '版本1',
        name: 'version1',
      },
      {
        type: 'input',
        label: '版本2',
        name: 'version2',
      },
      {
        type: 'input',
        label: '版本3',
        name: 'version3',
      },
      {
        type: 'number',
        label: '数量',
        name: 'num',
      },
    ],
    itemProps: {
      maxHeight: 48,
    },
  },
  {
    type: 'group',
    label: '自定义分组-2',
    groups: [
      {
        label: '类型',
        name: 'type',
      },
    ],
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
  return (
    <SearchList
      cacheSearchParams
      syncSearchToUrl
      rowKey="name"
      tableColumns={columns}
      searchFields={formItems}
      onSearch={onSearch}
      searchMaxHeight={76}
    />
  )
}
