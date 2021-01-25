import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { useAutoReducer, useStateRef } from '@vins-rc/react-hooks'
import SearchForm from './components/search-form'
import RenderTable, { BaseTableProps, RenderTableProps } from '@vins-rc/render-table'
import RenderFrom, { RenderFormProps, RenderFormItemProps, NamePath } from '@vins-rc/render-form'
import { FormInstance } from 'antd/sun/dist/hook-form'
import { Button } from 'antd/sun'
const qs = require('qs')
import '@vins-rc/render-table/dist/css/main.css'
import './style/index.less'

export interface SearchDataType<RT> {
  list: RT[]
  page: number
  total: number
}

export type SearchSenseType = 'initSearch' | 'search' | 'reset' | 'page' | 'pageSize' | 'refresh' | 'refSearch'
export interface SearchListProps<RT> extends Omit<RenderTableProps<RT>, 'tableOptions'> {
  form?: FormInstance
  onSearch: (
    args?: Record<string, unknown>,
    sense?: SearchSenseType,
  ) => SearchDataType<RT> | Promise<SearchDataType<RT>>
  searchFields?: RenderFormItemProps[]
  searchExtra?: React.ReactNode
  cacheSearchParams?: boolean
  syncSearchToUrl?: boolean
  parseUrlParams?: boolean
  tableExtra?: React.ReactNode
  tableColumns: BaseTableProps<RT>['columns']
  tableOptions?: Partial<RenderTableProps<RT>['tableOptions']>
  rowKey: BaseTableProps<RT>['rowKey']
  pageSizeOptions?: string[]
  defaultPageSize?: number
  formProps?: Omit<RenderFormProps, 'items'>
  hideExpand?: boolean
  searchMaxHeight?: number | string
  groupMaxHeight?: number | string
}

export interface SearchListRef {
  getSearchData: () => Record<string, unknown>
  getTableData: () => unknown[]
  setTableData: (dataOrDataFn: unknown[] | ((data: unknown[]) => unknown[])) => void
  search: (page?: number, pageSize?: number) => void
  resetForm: () => void
}

export type SearchListRefObject = React.RefObject<SearchListRef>

export const cachePrefix = 'search'

function SearchList<RT>(props: SearchListProps<RT>, ref: SearchListRefObject): JSX.Element {
  const {
    formProps = {},
    form,
    onSearch,
    searchFields = [],
    searchExtra,
    cacheSearchParams = false,
    syncSearchToUrl = false,
    parseUrlParams = true,
    tableExtra,
    tableColumns,
    rowKey,
    pageSizeOptions,
    defaultPageSize,
    hideExpand = false,
    searchMaxHeight = 48,
    groupMaxHeight = 48,
    ...tableProps
  } = props
  const curPageSize: number = defaultPageSize
    ? defaultPageSize
    : pageSizeOptions
    ? parseInt(pageSizeOptions[0], 10)
    : 30
  const [state, dispatch] = useAutoReducer({
    mounted: false,
    loading: false,
    page: 1,
    pageSize: curPageSize,
    total: 0,
    tableData: [],
  })
  const stateRef = useStateRef(state)
  const formInstance = form ? form : RenderFrom.useForm()[0]

  const sizeChangeRef = useRef<boolean>(false) // 修复sizeChange多次触发的问题

  const notCachefields: NamePath[] = useMemo(() => {
    const notCached: NamePath[] = []
    function setNotCacheFields(fields: RenderFormItemProps[], parentName?: NamePath) {
      if (fields && fields.length > 0) {
        fields.forEach((i) => {
          if (i.groups && i.groups.length > 0) {
            setNotCacheFields(i.groups, i.name)
          } else if (i.name != undefined && i.itemProps && i.itemProps.cache === 'no-cache') {
            const cName = Array.isArray(i.name) ? i.name : [i.name]
            if (parentName && i.useGroupName !== false) {
              const pName = Array.isArray(parentName) ? parentName : [parentName]
              notCached.push([...pName, ...cName].filter((i) => i != undefined) as NamePath)
            } else {
              notCached.push(cName)
            }
          }
        })
      }
    }
    if (cacheSearchParams) {
      setNotCacheFields(searchFields)
    }
    return notCached
  }, [cacheSearchParams, searchFields])

  const ctx = useMemo(() => {
    return {
      async search(page: number, pageSize: number = curPageSize, sense: SearchSenseType, resolve?: () => void) {
        if (typeof onSearch === 'function') {
          dispatch({
            type: 'dispatchMulti',
            payload: {
              loading: true,
              pageSize,
              page,
            },
          })
          const formData = searchFields.length > 0 ? formInstance.getFieldsValue() : {}
          const searchData = {
            page,
            pageSize,
            ...formData,
          }
          try {
            const searchResult = await onSearch(searchData, sense)
            if (!searchResult) {
              dispatch({
                type: 'loading',
                payload: false,
              })
              return
            }
            dispatch({
              type: 'dispatchMulti',
              payload: {
                loading: false,
                tableData: searchResult.list || [],
                total: searchResult.total || 0,
              },
            })
          } catch (error) {
            dispatch({
              type: 'dispatchMulti',
              payload: {
                loading: false,
                tableData: [],
                total: 0,
              },
            })
          } finally {
            typeof resolve === 'function' && resolve()
            sizeChangeRef.current = false
          }
          if (!location) {
            return
          }

          if (cacheSearchParams && sessionStorage) {
            const cacheData = JSON.parse(JSON.stringify(formData))
            notCachefields.forEach((c) => {
              ctx.deleteKey(cacheData, c)
            })
            try {
              sessionStorage.setItem([cachePrefix, location.pathname, props.name].join('-'), JSON.stringify(cacheData))
            } catch (error) {
              console.error(error)
            }
          }
          // 同步请求参数到url中
          if (syncSearchToUrl && history) {
            const search = qs.parse(location.search, { ignoreQueryPrefix: true })
            const searchParams = Object.assign({}, search, formData)
            // 清除为'', null或者undefined的值
            for (const k in searchParams) {
              if (searchParams[k] === '' || searchParams[k] === null || searchParams[k] === undefined) {
                delete searchParams[k]
              }
            }
            const searchParamsStr = qs.stringify(searchParams, { addQueryPrefix: true })
            const asUrl = [location.pathname, searchParamsStr, location.hash].join('')
            history.replaceState(
              {
                url: location.pathname,
                as: asUrl,
                options: {},
              },
              null,
              asUrl,
            )
          }
        }
      },
      searchHandle() {
        ctx.search(1, stateRef.current.pageSize, 'search')
      },
      onRefresh(resolve: () => void) {
        ctx.search(stateRef.current.page, stateRef.current.pageSize, 'refresh', resolve)
      },
      resetForm() {
        formInstance.resetFields()
        ctx.search(1, stateRef.current.pageSize, 'reset')
      },
      // 删除对象的key
      deleteKey(obj: any, key: NamePath) {
        if (obj && typeof obj === 'object') {
          if (Array.isArray(key)) {
            if (key.length === 1) {
              delete obj[key[0]]
            } else if (key.length > 1) {
              ctx.deleteKey(obj[key[0]], key.slice(1))
            }
          } else {
            delete obj[key]
          }
        }
      },
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getSearchData() {
      const formData = formInstance.getFieldsValue()
      return {
        page: state.page,
        pageSize: state.pageSize,
        ...formData,
      }
    },
    getTableData() {
      return state.tableData
    },
    setTableData(dataOrDataFn) {
      let newData = []
      if (typeof dataOrDataFn === 'function') {
        newData = dataOrDataFn(state.tableData) || []
      } else if (Array.isArray(dataOrDataFn)) {
        newData = dataOrDataFn
      }
      dispatch({
        type: 'dispatchMulti',
        payload: {
          tableData: newData,
          total: newData.length,
        },
      })
    },
    search(page: number = state.page, pageSize: number = state.pageSize) {
      ctx.search(page, pageSize, 'refSearch')
    },
    resetForm() {
      ctx.resetForm()
    },
    clearSearchCache() {
      sessionStorage.removeItem([cachePrefix, location.pathname, props.name].join('-'))
    },
  }))

  const { tableOptions = {}, ...renderTableProps } = tableProps

  const tablePagination: BaseTableProps<RT>['pagination'] = useMemo(() => {
    return {
      showSizeChanger: true,
      pageSize: state.pageSize,
      total: state.total,
      current: state.page,
      pageSizeOptions: pageSizeOptions || ['30', '50', '100'],
      onShowSizeChange(current: number, size: number) {
        if (size !== state.pageSize) {
          if (state.page === 1) {
            if (!sizeChangeRef.current) {
              sizeChangeRef.current = true
              ctx.search(1, size, 'pageSize')
            }
          } else {
            dispatch({
              type: 'dispatchMulti',
              payload: {
                page: 1,
                pageSize: size,
              },
            })
          }
        }
      },
      onChange(page: number, size: number) {
        if (page !== state.page) {
          ctx.search(page, size, 'page')
        }
      },
      showTotal() {
        return `共 ${state.total} 条`
      },
    }
  }, [state.pageSize, state.total, state.page, pageSizeOptions, ctx])

  const baseTableProps: BaseTableProps<RT> = {
    rowKey,
    dataSource: state.tableData,
    columns: tableColumns,
    pagination: tablePagination,
    loading: state.loading,
    ...tableOptions,
  }

  // tslint:disable-next-line:react-hooks-nesting
  useEffect(() => {
    dispatch({
      type: 'mounted',
      payload: true,
    })
    ctx.search(1, state.pageSize, 'initSearch')
  }, [])

  if (!state.mounted && typeof location !== 'undefined' && typeof sessionStorage !== 'undefined') {
    let cacheSearch = {}
    if (cacheSearchParams) {
      try {
        cacheSearch = JSON.parse(sessionStorage.getItem([cachePrefix, location.pathname, props.name].join('-'))) || {}
      } catch (error) {
        console.error(error)
      }
    }

    // 解析请求参数
    const searchParams = parseUrlParams ? qs.parse(location.search, { ignoreQueryPrefix: true }) : {}
    formProps.initialValues = Object.assign({}, cacheSearch, formProps.initialValues, searchParams)
  }

  return (
    <div className="search-list">
      {searchFields.length === 0 ? null : (
        <SearchForm
          form={formInstance}
          items={searchFields}
          hideExpand={hideExpand}
          maxHeight={searchMaxHeight}
          groupMaxHeight={groupMaxHeight}
          {...formProps}
        >
          <>
            {searchExtra}
            <Button type="primary" onClick={ctx.searchHandle}>
              搜索
            </Button>
            <Button onClick={ctx.resetForm}>重置</Button>
          </>
        </SearchForm>
      )}
      <div className="search-list_table">
        <RenderTable
          onRefresh={ctx.onRefresh}
          extra={tableExtra}
          tableOptions={baseTableProps}
          expand={state.tableData.length > 0 ? false : true}
          {...renderTableProps}
        />
      </div>
    </div>
  )
}

export default React.forwardRef(SearchList)
