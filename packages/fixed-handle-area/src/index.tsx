import React from 'react'

export interface FixedHandleAreaProps {
  children?: React.ReactNode
}

export default function FixedHandleArea(props: FixedHandleAreaProps): JSX.Element {
  return (
    <>
      <style>{`.with-fixed-handle{padding-bottom:64px;}.fixed-handle{position:fixed;right:0;bottom:0;width:100%;display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-end;height:60px;padding-right:24px;background:#fff;transition:all 0.2s;}`}</style>
      <div className="fixed-handle">{props.children}</div>
    </>
  )
}
