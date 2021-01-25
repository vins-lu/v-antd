import React from 'react'
import Demo from '../../dist/index'

const onChange = (v, m) => {
  console.log(v, m)
}

export default function TestDemo() {
  return (
    <Demo onChange={onChange} />
  )
}
