import React, { useMemo, useState, useEffect } from 'react'
import { Table } from 'antd/sun'
import { Resizable, ResizeCallbackData } from 'react-resizable'
import { TableProps } from 'antd/sun/dist/table'
import { DefaultColumnType } from './table-wrapper'

const tableColumnOrderCachePrefix = 'columnSizeCache'
// 可变宽度的自定义表头
const ResizableTitle = (props: any) => {
  const { onResize, resizable, ...restProps } = props

  if (!resizable) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={props.width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export type BaseTableColumnType<T> = DefaultColumnType<T>
export interface BaseTableProps<RT> extends Omit<TableProps<RT>, 'columns' | 'scroll'> {
  name?: string
  scrollY?: number
  resizable?: boolean
  resizeMinWidth?: number
  resizeMaxWidth?: number
  cacheColumnSize?: boolean
  columns: Array<BaseTableColumnType<RT>>
  pageOptions?: {
    total: number
    pageSize?: number
    page?: number
    pageSizeOptions?: string[]
    onPageSizeChange?: (current?: number, pageSize?: number) => void
    onPageChange?: (page?: number) => void
  }
}

// 获取编辑表格的列中定义的最小宽度，只计算数字，百分比会出现问题
function getColumnsWidth<T>(columnList: BaseTableColumnType<T>[] = []) {
  return columnList.reduce((a: number, b) => {
    a = a + ((b.width as number) * 1 || 0)
    return a
  }, 0)
}

function BaseTable<RT>(props: BaseTableProps<RT>): JSX.Element {
  const {
    scrollY,
    columns = [],
    resizable,
    resizeMinWidth = 60,
    resizeMaxWidth = 300,
    cacheColumnSize,
    ...tableProps
  } = props
  const [tableColumns, setTableColumns] = useState(columns)
  const scrollX = useMemo(() => {
    return getColumnsWidth<RT>(columns)
  }, [tableColumns])

  const handleResize = function (dataIndex: string): (e: React.SyntheticEvent, data: ResizeCallbackData) => void {
    return (e, { size }) => {
      setTableColumns((c) => {
        const newColumns = [...c]
        const curColumnIndex = newColumns.findIndex((i) => i.dataIndexFlat === dataIndex)
        const curColumn = newColumns[curColumnIndex]
        if (size.width <= curColumn.minWidth || (curColumn.maxWidth && size.width >= curColumn.maxWidth)) {
          return c
        }
        newColumns[curColumnIndex] = {
          ...curColumn,
          width: size.width,
        }
        if (localStorage || sessionStorage) {
          const columnSizeMap: Record<string, number | null> = {}
          newColumns.forEach((c) => {
            columnSizeMap[c.dataIndexFlat] = (c.width as number) || null
          })
          const storage = cacheColumnSize ? localStorage : sessionStorage
          storage.setItem(
            [tableColumnOrderCachePrefix, location.pathname, props.name].join('-'),
            JSON.stringify(columnSizeMap),
          )
        }
        return newColumns
      })
    }
  }

  useEffect(() => {
    const filterColumns = columns.filter((i) => !i.hideColumn)
    if (resizable) {
      const storage = cacheColumnSize ? localStorage : sessionStorage
      const columnSizeMap =
        JSON.parse(storage.getItem([tableColumnOrderCachePrefix, location.pathname, props.name].join('-'))) || {}
      const resizableTableColumns = filterColumns.map(
        (c): DefaultColumnType<RT> => {
          const col = { ...c }
          if (typeof col.minWidth === 'undefined') {
            col.minWidth = resizeMinWidth
          }
          if (typeof col.maxWidth === 'undefined') {
            col.maxWidth = resizeMaxWidth
          }
          col.width = columnSizeMap[col.dataIndexFlat] || col.width
          return {
            ...col,
            onHeaderCell(curColumn: DefaultColumnType<RT>) {
              return {
                width: curColumn.width,
                resizable: col.resizable === false ? false : true,
                onResize: handleResize(col.dataIndexFlat),
              } as React.HTMLAttributes<HTMLElement>
            },
          }
        },
      )
      setTableColumns(resizableTableColumns)
    } else {
      setTableColumns(filterColumns)
    }
  }, [resizable, columns])

  if (resizable) {
    tableProps.bordered = true
    tableProps.components = Object.assign(
      {
        header: {
          cell: ResizableTitle,
        },
      },
      tableProps.components,
    )
  }

  return <Table {...tableProps} columns={tableColumns} scroll={{ x: scrollX, y: scrollY }} />
}

export default BaseTable
