import { Input, Select, message } from 'antd/sun'
import 'antd/dist/antd.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SearchForm from '../src/index'

const { Option } = Select

const genders = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
]

const hobbies = [
  { value: 'films', label: '电影' },
  { value: 'basketball', label: '篮球' },
]

const searchFormFields = [
  {
    name: 'name',
    label: '姓名',
    renderElement: <Input placeholder="支持模糊搜索" allowClear />,
  },
  {
    name: 'age',
    label: '年龄',
    renderElement: <Input placeholder="支持模糊搜索" allowClear />,
  },
  {
    name: 'height',
    label: '身高',
    renderElement: <Input placeholder="支持模糊搜索" allowClear />,
  },
  {
    name: 'gender',
    label: '性别',
    renderElement: (
      <Select placeholder="请选择" allowClear>
        {genders.map((l) => (
          <Option key={l.value} value={l.value}>
            {l.label}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    name: 'hobbies',
    label: '兴趣爱好',
    renderElement: (
      <Select placeholder="请选择" allowClear mode="multiple">
        {hobbies.map((l) => (
          <Option key={l.value} value={l.value}>
            {l.label}
          </Option>
        ))}
      </Select>
    ),
  },
]

const searchFormGroups = [
  {
    groupName: '基本信息',
    searchFormFields: [
      {
        name: 'name',
        label: '姓名',
        renderElement: <Input placeholder="支持模糊搜索" allowClear />,
      },
      {
        name: 'age',
        label: '年龄',
        renderElement: <Input placeholder="支持模糊搜索" allowClear />,
      },
      {
        name: 'height',
        label: '身高',
        renderElement: <Input placeholder="支持模糊搜索" allowClear />,
      },
      {
        name: 'gender',
        label: '性别',
        renderElement: (
          <Select placeholder="请选择" allowClear>
            {genders.map((l) => (
              <Option key={l.value} value={l.value}>
                {l.label}
              </Option>
            ))}
          </Select>
        ),
      },
    ],
  },
  {
    groupName: '爱好',
    searchFormFields: [
      {
        name: 'sports',
        label: '体育爱好',
        renderElement: (
          <Select placeholder="请选择" allowClear mode="multiple">
            {hobbies.map((l) => (
              <Option key={l.value} value={l.value}>
                {l.label}
              </Option>
            ))}
          </Select>
        ),
      },
    ],
  },
]

const Demo = () => {
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [form] = SearchForm.useForm()

  const onFinish = (searchData, ifFetchData = true): void => {
    message.info('打开控制台查看搜索结果')
    console.log(form.getFieldsValue())
    if (ifFetchData) {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        console.log('模拟异步！')
      }, 3000)
    }

    console.log(searchData)
  }

  const onFinish2 = (searchData, ifFetchData = true): void => {
    if (ifFetchData) {
      setLoading2(true)

      setTimeout(() => {
        setLoading2(false)
        console.log('模拟异步！')
      }, 3000)
    }

    console.log(searchData)
  }

  const searchProps = {
    searchFormFields,
    onFinish,
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
    searchButtonProps: {
      type: 'dashed' as const,
      danger: true,
      loading: loading,
    },
    actionButtons: [
      {
        label: '测试按钮',
        key: 'test',
      },
    ],
    actionButtonClick: (key): void => {
      console.log(`按钮${key}被点击`)
    },
  }

  const searchProps2 = {
    searchFormGroups,
    onFinish: onFinish2,
    labelCol: {
      span: 8,
    },
    searchButtonProps: {
      loading: loading2,
    },
  }

  return (
    <>
      <section style={{ margin: '40px 20px', marginBottom: '100px' }}>
        <SearchForm form={form} {...searchProps} />
      </section>
      <section style={{ margin: '40px 20px' }}>
        <SearchForm multiple {...searchProps2} />
      </section>
    </>
  )
}

ReactDOM.render(<Demo />, document.getElementById('app'))
