import React from 'react'
import Density from './density'
import Expand from './expand'
import Refresh from './refresh'
import Setting from './setting/index'
import FullScreen from './full-screen'

type ToolbarTypeEnum = ['refresh', 'density', 'expand', 'fullScreen', 'setting'][number]

type toolbarOption = {
  hide?: boolean
  option?: Record<string, unknown>
}

export type ToolBarProps = {
  [k in ToolbarTypeEnum]?: toolbarOption
}

type ToolbarType = (args?: unknown) => JSX.Element

const DefaultToolBarMap: {
  [k in ToolbarTypeEnum]?: ToolbarType
} = {
  refresh: Refresh,
  density: Density,
  expand: Expand,
  fullScreen: FullScreen,
  setting: Setting,
}

function ToolBar(props: ToolBarProps): JSX.Element {
  const Bars: ReturnType<ToolbarType>[] = []
  for (const key in DefaultToolBarMap) {
    const barKey: ToolbarTypeEnum = key as ToolbarTypeEnum
    const BarElement: ToolbarType = DefaultToolBarMap[barKey]
    if (props[barKey]) {
      if (props[barKey].hide !== true) {
        Bars.push(<BarElement key={barKey} {...props[barKey].option} />)
      }
    } else {
      Bars.push(<BarElement key={barKey} />)
    }
  }
  return <>{...Bars}</>
}

export default ToolBar
