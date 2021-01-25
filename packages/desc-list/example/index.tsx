import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

// 格式化文件目录和hash值
function formatFileName(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function getDemos(): Record<string, any> {
  const compDemos: Record<string, unknown> = {}
  const files = require['context']('./demo', true, /\.tsx$/)
  files.keys().forEach((f: string) => {
    const dirName = f.split('/')[1].split('.')[0]
    const name: string = formatFileName(dirName)
    compDemos[name] = files(f).default
  })
  return compDemos
}

const compDemos = getDemos()

function ErrorComp(): JSX.Element {
  return (
    <>
      <style>{`
          .error-tip {
            text-align: center;
          }
        `}</style>
      <div className="error-tip">
        <p style={{ color: '#f5222d' }}>路由对应的Demo不存在</p>
        <p>路由对应规则：hash路由对应的example的目录名称</p>
      </div>
    </>
  )
}

function DemoList(props: { list: string[] }): JSX.Element {
  return (
    <ul>
      <li style={{ listStyle: 'none' }}>Demo列表</li>
      {props.list.map((path) => {
        return (
          <li key={path}>
            <a href={`${location.href}#${path}`}>{path}</a>
          </li>
        )
      })}
    </ul>
  )
}

function Demo(): JSX.Element {
  const [route, changeRoute] = useState('')
  const hashchange = (): void => {
    const hash = window.location.hash.substr(1)
    changeRoute(hash)
  }

  useEffect(() => {
    window.addEventListener('hashchange', hashchange)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => {
      window.removeEventListener('hashchange', hashchange)
    }
  })

  const compName = formatFileName(route || window.location.hash.substr(1))
  const CompDemo = compDemos[compName] || ErrorComp
  const child = compName === '' ? <DemoList list={Object.keys(compDemos)} /> : <CompDemo />
  return (
    <div>
      <div>{child}</div>
    </div>
  )
}

ReactDOM.render(<Demo />, document.getElementById('app'))
