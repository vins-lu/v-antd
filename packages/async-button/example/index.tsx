import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import CompDemo from '../src/index'

function Demo(): JSX.Element {
  const [status, toggleStatus] = useState(false)

  const loadingButtonClick = (resolve: () => void, reject) => {
    setTimeout(() => {
      reject()
    }, 2000)
  }
  const buttonClick = (resolve: () => void) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  }
  const toggleClick = (resolve: () => void) => {
    resolve()
    toggleStatus((state) => {
      return !state
    })
  }
  return (
    <div style={{ padding: '24px' }}>
      <style>{`
        .ant-btn + .ant-btn {
          margin-left: 12px;
        }
      `}</style>
      <div>
        <p>基本</p>
        <CompDemo onClick={loadingButtonClick}>loading button</CompDemo>
        <CompDemo onClick={buttonClick} useLoading={false}>
          button
        </CompDemo>
      </div>
      <div>
        <p>外部控制子组件的状态</p>
        <CompDemo onClick={toggleClick} useLoading={false}>
          切换子组件的状态
        </CompDemo>
        <CompDemo disabled={status}>子组件</CompDemo>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, document.getElementById('app'))
