import React from 'react'
import ReactDOM from 'react-dom'
import Demo from '../dist/index'
import 'antd/dist/antd.css'

function TestDemo() {
  const items = [
    {
      text: 'button1',
      key: 'add1',
      confirm: true,
      confirmTitle: '确认此操作',
      confirmProps: {
        onCancel() {
          console.log('取消')
        },
      },
    },
    {
      text: 'button2',
      key: 'add2',
    },
    {
      text: 'button3',
      key: 'add3',
      disabled: true,
    },
    {
      text: 'button4',
      key: 'add4',
      hidden: false,
    },
    {
      text: 'button5',
      key: 'add5',
      confirm: true,
      confirmTitle: '确认此操作',
      confirmProps: {
        onCancel() {
          console.log('取消')
        },
      },
    },
  ]
  const onClick = (k) => {
    console.log(k)
  }
  return <Demo items={items} type="button" max={4} onClick={onClick} />
}

ReactDOM.render(<TestDemo />, document.getElementById('app'))
