import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useAutoReducer, useStateRef } from '@vins-rc/react-hooks'
import TableWrapperCtx, { TableWrapperCtxProps } from './table-wrapper-ctx'
import { ColumnType } from 'antd/sun/dist/table'
import { IntlProvider, zhCNIntl, IntlType } from './components/intl'
import { DensitySize } from './components/density'
import { PageHeaderProps } from 'antd/sun/dist/page-header'
import { ToolBarProps } from './components/tool-bar'
import WrapHeader from './components/wrap-header'

export type extendColumnType = {
  fixed?: 'left' | 'right' // 固定属性
  fixedDisable?: boolean // 是否可以更改该列的固定属性
  dataIndexFlat?: string // 该列的唯一标示
  hideColumn?: boolean // 是否隐藏该列
  hideColumnDisable?: boolean // 是否可以更改该列的隐藏属性
  minWidth?: number // 可以调整的最小宽度
  maxWidth?: number // 可以调整的最大宽度
  resizable?: boolean // 是否可以调整列的宽度
}

export type DefaultColumnType<RT = unknown> = ColumnType<RT> & extendColumnType
export type cacheOptionType = 'columnOrder' | 'columnHide' | 'columnFixed' | 'density'
export interface TableWrapperProps extends Partial<Pick<PageHeaderProps, 'title' | 'extra'>> {
  name?: string
  locale?: IntlType // 语言包
  tableSize?: DensitySize // 表格密度
  expand?: boolean // 是否展开
  onRefresh?: (fn?: () => void) => void // 刷新的回调，没有该回调不限制刷新图标
  onTableSizeChange?: (size?: DensitySize) => void // 表格密度变化
  hideToolBar?: boolean // 是否隐藏工具栏
  toolBarOptions?: ToolBarProps
  minHeight?: number // 容器的最小高度
  maxHeight?: number // 容器的最大高度
  cacheUserHabit?: boolean // 是否缓存用户习惯，用户固定和隐藏的列
  cacheOptions?: cacheOptionType[] // 自定义缓存的部分
  children: React.ReactElement
}

// 列顺序数据缓存到本地的key前缀标示
const tableColumnOrderCachePrefix = 'columnOrderCache'
// 隐藏的列数据缓存到本地的key前缀标示
const tableColumnCachePrefix = 'columnCache'
// 固定的列数据缓存到本地的key前缀标示
const tableColumnFixedCachePrefix = 'columnFixedCache'
// 表格密度的缓存key
const tableDensity = 'tableDensity'
// 初始的容器上下文数据
const initialState: Omit<TableWrapperCtxProps<DefaultColumnType>, 'children'> = {
  tableSize: 'default',
  fullscreen: false,
  expand: false,
  columns: [],
}

// 调整含有固定列数据的顺序，只有位置列头和列尾的元素才能固定
function orderFixedColumns(list: DefaultColumnType[] = [], orderList: Array<string | null> = []): DefaultColumnType[] {
  const preList = [...list]
  const leftFixed: DefaultColumnType[] = []
  const noFixed: DefaultColumnType[] = []
  const rightFixed: DefaultColumnType[] = []
  const pushItem = (cur: DefaultColumnType, index?: number): void => {
    if (!cur) {
      return
    }
    if (cur.fixed === 'left') {
      index > -1 ? leftFixed.splice(index, 0, cur) : leftFixed.push(cur)
    } else if (cur.fixed === 'right') {
      index > -1 ? rightFixed.splice(index, 0, cur) : rightFixed.push(cur)
    } else {
      index > -1 ? noFixed.splice(index, 0, cur) : noFixed.push(cur)
    }
  }
  orderList.forEach((key) => {
    const index = preList.findIndex((i) => i.dataIndexFlat === key)
    if (index > -1) {
      pushItem(preList.splice(index, 1)[0])
    }
  })
  // 新增的数据的填充，保留数据的原有固定顺序
  for (let i = 0; i < preList.length; i++) {
    const curIndex = list.findIndex((c) => c.dataIndexFlat === preList[i].dataIndexFlat)
    pushItem(preList[i], curIndex)
  }
  return [...leftFixed, ...noFixed, ...rightFixed]
}

// 获取元素距离body的距离
function getElementOffsetTop(ele: HTMLElement): number {
  let p: HTMLElement = ele
  let top = 0 // offsetTop
  const bottom = 0 // offsetBottom
  while (p) {
    top = top + p.offsetTop
    const parent = p.offsetParent as HTMLElement
    // if (parent && parent !== document.body) {
    //   bottom = bottom + parent.offsetHeight - p.offsetHeight - p.offsetTop
    // }
    p = parent
  }
  return top + bottom
}

// 计算容器内表格的可滚动的高度
function computedTableHeight(ele: HTMLElement) {
  const eleBody = ele.querySelector('.ant-table-tbody') || ele.querySelector('.ant-table-body')
  const top = getElementOffsetTop(eleBody as HTMLElement)
  const paginationH = ele.querySelector('.ant-pagination') ? ele.querySelector('.ant-pagination').clientHeight : 32
  const paginationMargin = 32
  // 去除表格边框的高度
  const tableContainer = ele.querySelector('.ant-table-container') as HTMLElement
  const tableContainerBorder = tableContainer ? tableContainer.offsetHeight - tableContainer.clientHeight : 0
  return document.documentElement.clientHeight - top - paginationH - paginationMargin - tableContainerBorder
}

function TableWrapper<CT>(props: TableWrapperProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useAutoReducer(initialState)
  const stateRef = useStateRef(state)
  const [tableHeight, settableHeight] = useState<number | null>()
  const {
    name = '',
    cacheUserHabit = true,
    cacheOptions = ['columnOrder', 'columnHide', 'columnFixed', 'density'],
    maxHeight,
    minHeight = 200,
    children,
    onTableSizeChange,
    ...wrapProps
  } = props
  // 表格高度的监听
  useEffect(() => {
    settableHeight(props.expand ? null : Math.max(computedTableHeight(rootRef.current), minHeight))
    dispatch({
      type: 'expand',
      payload: props.expand,
    })
  }, [props.tableSize, props.expand, minHeight])
  // 表格密度的监听
  useEffect(() => {
    props.tableSize &&
      dispatch({
        type: 'tableSize',
        payload: props.tableSize,
      })
  }, [props.tableSize])
  // 全屏事件监听
  useEffect(() => {
    const fullscreenHandler = (): void => {
      const isFullscreen = !!document.fullscreenElement
      dispatch({
        type: 'dispatchMulti',
        payload: {
          fullscreen: isFullscreen,
          expand: isFullscreen,
        },
      })
      settableHeight(isFullscreen ? null : Math.max(computedTableHeight(rootRef.current), minHeight))
    }
    document.addEventListener('fullscreenchange', fullscreenHandler)

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenHandler)
    }
  }, [])
  useEffect(() => {
    let cacheHideColumns: Array<extendColumnType['dataIndexFlat']> = []
    let fixedColumnMap: Record<string, string | null> = {}
    let cacheTableDensity: DensitySize = props.tableSize || initialState.tableSize
    let orderColumns: Array<extendColumnType['dataIndexFlat']> = []
    try {
      if (cacheUserHabit) {
        if (cacheOptions.includes('columnHide')) {
          cacheHideColumns =
            JSON.parse(localStorage.getItem([tableColumnCachePrefix, location.pathname, name].join('-'))) || []
        }
        if (cacheOptions.includes('columnOrder')) {
          orderColumns =
            JSON.parse(localStorage.getItem([tableColumnOrderCachePrefix, location.pathname, name].join('-'))) || []
        }
        if (cacheOptions.includes('columnFixed')) {
          fixedColumnMap =
            JSON.parse(localStorage.getItem([tableColumnFixedCachePrefix, location.pathname, name].join('-'))) || {}
        }
        if (cacheOptions.includes('density')) {
          cacheTableDensity = (localStorage.getItem(tableDensity) || cacheTableDensity) as DensitySize
        }
      }
    } catch (e) {}

    /** 格式化数据
     * 同步本地缓存数据，隐藏的列和固定的列
     * fixed不能为boolean
     * 添加dataIndex的展开字符串作为唯一标示
     **/
    let tableColumns = children.props.columns.map((item: any) => {
      const i = Object.assign({}, item)
      // 展平dataIndex数据
      i.dataIndexFlat = i.key || (Array.isArray(i.dataIndex) ? i.dataIndex.join('') : i.dataIndex + '')
      // 格式化fixed数据
      if (i.fixed === true) {
        i.fixed = 'left'
      } else if (!(i.fixed === 'left' || i.fixed === 'right')) {
        delete i.fixed
      }
      // 同步fixed数据
      if (fixedColumnMap[i.dataIndexFlat] !== undefined) {
        i.fixed = fixedColumnMap[i.dataIndexFlat]
        if (!i.fixed) {
          delete i.fixed
        }
      }
      // 同步hideColumn数据
      if (cacheHideColumns.includes(i.dataIndexFlat)) {
        i.hideColumn = true
      }
      return i
    })
    tableColumns = orderFixedColumns(tableColumns, orderColumns)
    dispatch({
      type: 'dispatchMulti',
      payload: {
        columns: tableColumns,
        tableSize: cacheTableDensity,
      },
    })
  }, [children.props.columns])

  // wrapper上下文的方法，该对象不随数据变化而更改
  const wrapperCtxMethods: Omit<TableWrapperCtxProps<CT>, 'children'> = useMemo(() => {
    return {
      toggleExpand() {
        const expand = !stateRef.current.expand
        dispatch({
          type: 'expand',
          payload: expand,
        })
        settableHeight(expand ? null : Math.max(computedTableHeight(rootRef.current), minHeight))
      },
      setTableSize(v: DensitySize) {
        dispatch({
          type: 'tableSize',
          payload: v,
        })

        settableHeight(stateRef.current.expand ? null : Math.max(computedTableHeight(rootRef.current), minHeight))
        typeof onTableSizeChange === 'function' && onTableSizeChange(v)
        if (cacheUserHabit && localStorage && cacheOptions.includes('density')) {
          // 表格密度
          localStorage.setItem(tableDensity, v)
        }
      },
      refresh(resolve) {
        typeof props.onRefresh === 'function' && props.onRefresh(resolve)
      },
      toggleFullscreen() {
        if (!rootRef.current || !document.fullscreenEnabled) {
          return
        }
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          rootRef.current.requestFullscreen()
        }
      },
      updateColumns(fn) {
        if (typeof fn === 'function') {
          let newColumns: DefaultColumnType[] = fn(stateRef.current.columns as CT[])
          newColumns = orderFixedColumns(newColumns)
          dispatch({
            type: 'columns',
            payload: newColumns,
          })
          if (cacheUserHabit && localStorage) {
            const fixedColumnMap: Record<string, string | null> = {}
            const orderColumns: Array<string | null> = []
            newColumns.forEach((i) => {
              fixedColumnMap[i.dataIndexFlat] = i.fixed || null
              orderColumns.push(i.dataIndexFlat)
            })
            if (cacheOptions.includes('columnOrder')) {
              localStorage.setItem(
                [tableColumnOrderCachePrefix, location.pathname, name].join('-'),
                JSON.stringify(orderColumns),
              )
            }
            if (cacheOptions.includes('columnFixed')) {
              localStorage.setItem(
                [tableColumnFixedCachePrefix, location.pathname, name].join('-'),
                JSON.stringify(fixedColumnMap),
              )
            }
          }
        }
      },
      updateShowColumns(list: Array<extendColumnType['dataIndexFlat']>) {
        const { columns } = stateRef.current
        const newColumns = columns.map((item) => {
          const i = Object.assign({}, item)
          if (i.hideColumnDisable) {
            return i
          }
          if (!list.includes(i.dataIndexFlat)) {
            i.hideColumn = true
          } else {
            delete i.hideColumn
          }
          return i
        })
        if (cacheUserHabit && localStorage && cacheOptions.includes('columnHide')) {
          const hideColumnList = newColumns.filter((i) => i.hideColumn).map((i) => i.dataIndexFlat)
          localStorage.setItem(
            [tableColumnCachePrefix, location.pathname, name].join('-'),
            JSON.stringify(hideColumnList),
          )
        }
        dispatch({
          type: 'columns',
          payload: newColumns,
        })
      },
    }
  }, [dispatch])

  const wrapperCtxValue: Omit<TableWrapperCtxProps<CT>, 'children'> = Object.assign(
    {
      expand: state.expand,
      columns: state.columns as CT[],
      tableSize: state.tableSize as DensitySize,
      fullscreen: state.fullscreen,
    },
    wrapperCtxMethods,
  )

  const WrapChild = React.cloneElement(children, {
    size: state.tableSize,
    columns: state.columns,
    scrollY: maxHeight || tableHeight,
  })
  return (
    <TableWrapperCtx.Provider value={wrapperCtxValue}>
      <IntlProvider value={props.locale || zhCNIntl}>
        <div className={'boss-render-table ' + state.tableSize} ref={rootRef}>
          <WrapHeader {...wrapProps} />
          {WrapChild}
        </div>
      </IntlProvider>
    </TableWrapperCtx.Provider>
  )
}

export default TableWrapper
