import React, { useRef } from 'react'
import { Button } from 'antd/sun'
import SearchList from '@vins-rc/search-list'
import { SearchDataType, SearchListRef } from '@vins-rc/search-list'
import { RenderFormItemProps } from '@vins-rc/render-form'
import '@vins-rc/search-list/dist/css/main.css'
import DateRangePicker from '../../dist'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 140,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 140,
    editOption: {
      type: 'number',
    },
  },
  {
    title: '地址',
    hideColumnDisable: true,
    fixedDisable: true,
    dataIndex: 'address',
    width: 140,
  },
  {
    title: '日期',
    dataIndex: 'dateRange',
    width: 140,
    render(text: string) {
      return '标签__' + text
    },
  },
]

const data = Array.from({ length: 16 }).map((_, i) => {
  const t = i + 1
  return {
    name: 'name_' + t,
    age: i,
    address: 'address' + t,
    dateRange: i,
  }
})

const formItems: RenderFormItemProps[] = [
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
  {
    label: '扩展日期类型',
    name: 'dateRange',
    itemProps: {
      startDateAlias: 'start',
      endDateAlias: 'end',
      dateMode: ['start', 'start'],
    },
    render(itemProps) {
      return <DateRangePicker {...itemProps} />
    }
  },
]

function onSearch(formValue: any): Promise<SearchDataType<unknown>> {
  console.log('onSearch', formValue)
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
    const data = ref.current.getTableData()
    console.log(data)
    // ref.current.setTableData(data.slice(0,1))
    ref.current.setTableData(data1 => data1.slice(0,1))
  }
  return (
    <SearchList
      ref={ref}
      cacheSearchParams
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
