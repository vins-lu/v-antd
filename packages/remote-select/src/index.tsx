import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Select, Spin } from 'antd/sun'
import { SelectValue, SelectProps } from 'antd/sun/dist/Select'
import { useStateRef } from '@vins-rc/react-hooks'
import debounce from 'lodash/debounce'

interface SelectOptionType {
  value: string | number
  label?: string
  disabled?: boolean
  children?: React.ReactChild
  [key: string]: unknown
}

export const cachePrefix = 'remote-select'
export interface RemoteSelectProps<VT> extends SelectProps<VT> {
  name?: string
  optionsClear?: boolean
  initOptions?: SelectOptionType[]
  waitTime?: number
  fetchFn(query: string): Promise<unknown>
  cache?: boolean
}

function RemoteSelect<VT extends SelectValue = SelectValue>(props: RemoteSelectProps<VT>): JSX.Element {
  const { name = '', initOptions = [], optionsClear = false, waitTime = 800, fetchFn, onChange, cache, ...restProps } = props
  const multiNeedCache = restProps.mode === 'multiple' && !restProps.labelInValue
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState(initOptions)
  const optionsRef = useStateRef(options)
  const [cachedOptions, setCachedOptions] = useState([]) // 缓存的配置，对于单选来说是上次搜索成功的数据；对于多选来说是已经选择的数据
  const cachedOptionsRef = useStateRef(cachedOptions)

  const cacheOption = useCallback((v?: any) => {
    if (cache && sessionStorage) {
      if (v && v.length > 0) {
        sessionStorage.setItem(`${cachePrefix}-${name}`, JSON.stringify(v))
      } else {
        sessionStorage.removeItem(`${cachePrefix}-${name}`)
      }
    }
  }, [cache, cachePrefix, name])

  useEffect(() => {
    if (optionsClear) {
      setOptions([])
      setCachedOptions([])
      cacheOption()
    }
  }, [optionsClear])

  // 如果有初始值，加载缓存的配置
  useEffect(() => {
    if (cache && sessionStorage && props.value) {
      let options = JSON.parse(sessionStorage.getItem(`${cachePrefix}-${name}`)) || []
      setOptions(options)
    }
  }, [])

  // 选中时，多选模式时做缓存
  const onSelect = useCallback((v: unknown): void => {
    const curOption = optionsRef.current.find((o: SelectOptionType) => o.value === v)
    if (curOption) {
      setCachedOptions([...cachedOptionsRef.current, curOption])
    }
  }, [])

  // 取消选中时，多选模式清缓存
  const onDeselect = useCallback((v: unknown): void => {
    const cacheOptions = [...cachedOptionsRef.current]
    const curIndex = cacheOptions.findIndex((o: SelectOptionType) => o.value === v)
    // 清除缓存的数据，不清除配置项中的数据
    if (curIndex > -1) {
      cacheOptions.splice(curIndex, 1)
      setCachedOptions(cacheOptions)
    }
  }, [])

  const multipleOptions = useMemo(() => {
    return multiNeedCache ? { onSelect, onDeselect } : {}
  }, [multiNeedCache])

  const fetchOptions = useCallback(debounce((query: string) => {
    if (!query) {
      // 搜索后，未选中，使用缓存的配置
      setOptions([...cachedOptionsRef.current])
      return
    } else {
      setFetching(true)
      fetchFn(query)
        .then((data: any[]) => {
          if (multiNeedCache) {
            setOptions([...cachedOptionsRef.current, ...data])
          } else {
            setOptions(data || [])
          }
        })
        .catch(() => {
          if (multiNeedCache) {
            setOptions([...cachedOptionsRef.current])
          } else {
            setOptions([])
          }
        })
        .finally(() => {
          setFetching(false)
        })
    }
  }, waitTime), [waitTime, fetchFn, multiNeedCache])

  const changeHandle = useCallback((v, option) => {
    if (v == null || (Array.isArray(v) && v.length === 0)) {
      setOptions([])
      setCachedOptions([])
    } else {
      setCachedOptions([...optionsRef.current])
    }
    cacheOption(Array.isArray(option) ? option : option != null ? [option] : [])
    typeof onChange === 'function' && onChange(v, option)
  }, [onChange])

  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      notFoundContent={fetching ? <Spin size='small' /> : null}
      filterOption={false}
      onSearch={fetchOptions}
      onChange={changeHandle}
      {...multipleOptions}
      {...restProps}
    >
      {options.map((o: SelectOptionType) => {
        const {label, value, children, disabled, ...rest} = o
        return (
          <Select.Option
            disabled={disabled || false}
            key={(label || '') + value}
            value={value}
            label={label}
            {...rest}
          >
            {children || label || value}
          </Select.Option>
        )}
      )}
    </Select>
  )
}

export default RemoteSelect
