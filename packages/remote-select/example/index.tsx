import 'antd/dist/antd.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import RemoteSelect from '../src/index'
import { HookForm } from 'antd/sun'

import SearchList, { SearchDataType } from '@vins-rc/search-list'
import '@vins-rc/search-list/dist/css/main.css'

interface Element {
  value: string | number
  label: string
}

async function fetchData(query): Promise<any[]> {
  return new Promise((resolve, reject) => {
    resolve([
      {
        label: `text-${query}`,
        value: query,
        vins: '123',
        extra: {
          a: '1'
        }
      },
      {
        label: 'text-2',
        value: '2',
        vins: '123',
        extra: {
          a: '1'
        }
      }
    ])
  })
}

const initOptions = [
  {
    value: '16065845',
    label: 'react ...',
  },
]

function setValue(v, a, b) {
  console.log('setValue', v, a, b)
}

function MultiDemo () {
  return (
    <div style={{ width: '200px' }}>
      <RemoteSelect
        mode="multiple"
        cache
        value={['2']}
        onChange={(v, option) => setValue(v, option)}
        fetchFn={fetchData}
        placeholder="请输入，支持远程搜索"
      />
    </div>
  )
}

function BaseDemo () {
  return (
    <div style={{ width: '200px' }}>
      <RemoteSelect
        allowClear
        onChange={(v, option) => setValue(v, option)}
        cache
        fetchFn={fetchData}
        placeholder="请输入，支持远程搜索"
      />
    </div>
  )
}

function FormDemo () {
  return (
    <HookForm>
      <HookForm.Item label='请选择' name='select'>
        <RemoteSelect
          name='test'
          allowClear
          mode="multiple"
          cache
          fetchFn={fetchData}
          placeholder="请输入，支持远程搜索"
        />
      </HookForm.Item>
    </HookForm>
  )
}

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
    title: '标签',
    dataIndex: 'tags',
    width: 140,
    key: 'tags',
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
    tags: i,
  }
})

const formItems: any[] = [
  {
    label: 'select',
    name: 'select',
    render() {
      return (
        <RemoteSelect
          allowClear
          value={'3'}
          onChange={(v, option) => setValue(v, option)}
          cache
          fetchFn={fetchData}
          placeholder="请输入，支持远程搜索"
        />
      )
    }
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

function SearchDemo(): JSX.Element {
  return <SearchList rowKey="name" tableColumns={columns} searchFields={formItems} onSearch={onSearch} cacheSearchParams />
}


ReactDOM.render(<SearchDemo />, document.getElementById('app'))
