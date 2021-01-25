import React from 'react'
import ReactDOM from 'react-dom'
import Demo from '../dist/index'
import { Button } from 'antd/sun'
import 'antd/dist/antd.css'

function TestDemo() {
  return (
    <Demo>
      <Button>按钮1</Button>
      <Button type="primary" style={{ marginLeft: 16 }}>
        按钮2
      </Button>
    </Demo>
  )
}

ReactDOM.render(<TestDemo />, document.getElementById('app'))
