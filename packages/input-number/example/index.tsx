import React from 'react'
import ReactDOM from 'react-dom'
import InputNumber from '../src/index'
import 'antd/dist/antd.css'

const Demo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div>默认不限制大小，保留两位小数</div>
      <InputNumber />

      <div>最大值100，最小值-200，三位小数，支持输入负数</div>
      <InputNumber decimal={3} max={100} min={-200} minus={true} />

      <div>最大值500的正整数</div>
      <InputNumber decimal={0} max={500} />
    </div>
  )
}

ReactDOM.render(<Demo />, document.getElementById('app'))
