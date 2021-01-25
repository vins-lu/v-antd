import React, { useRef } from 'react'
import { Button } from 'antd/sun'
// import SearchList, { SearchDataType, SearchListRef } from '../../src/index'
import SearchList from '../../dist/index'
import { SearchDataType, SearchListRef } from '../../types/index'
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
    label: 'name',
    name: 'name',
    itemProps: {
      cache: 'no-cache',
    },
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

function onSearch(formValue: any, sense): Promise<SearchDataType<unknown>> {
  console.log('onSearch', sense)
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
  const ref = useRef<SearchListRef>()

  function down() {
    // console.log(
    //   'ref',
    //   ref,
    //   ref.current.getSearchData(),
    //   ref.current.getTableData(),
    //   ref.current.search(),
    //   ref.current.resetForm(),
    // )
    const data = ref.current.getTableData()
    console.log(data)
    // ref.current.setTableData(data.slice(0,1))
    ref.current.setTableData(data1 => data1.slice(0,1))
  }
  return (
    <SearchList
      ref={ref}
      cacheSearchParams
      syncSearchToUrl
      hideToolBar
      searchExtra={[
        <Button key="Button" onClick={down}>
          Button
        </Button>,
      ]}
      tableExtra={[<Button key="Button">Button</Button>]}
      rowKey="name"
      tableColumns={columns}
      searchFields={formItems}
      formProps={{ column: 2 }}
      tableOptions={{ resizable: true }}
      onSearch={onSearch}
    />
  )
}
