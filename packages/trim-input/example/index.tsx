import React from 'react'
import ReactDOM from 'react-dom'
import Demo from '../dist/index'
import 'antd/dist/antd.css'

const onChange = (v) => {
  console.log('v', v)
}

ReactDOM.render(<Demo onChange={onChange} />, document.getElementById('app'))
