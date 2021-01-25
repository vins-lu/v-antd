import React, { useContext, useCallback, useState } from 'react'
import { RedoOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd/sun'
import { Button } from 'antd/sun'
import TableWrapperCtx from '../table-wrapper-ctx'
import { useIntl } from './intl'

function Refresh(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const intl = useIntl()
  const toolBar = useContext(TableWrapperCtx)
  const title = intl.getMessage('tableToolBar.refresh', '刷新')
  const refetchHandle = useCallback(() => {
    return new Promise((resolve) => {
      setLoading(true)
      toolBar.refresh(resolve)
    }).finally(() => {
      setLoading(false)
    })
  }, [])
  return (
    <Tooltip key="refresh" title={title}>
      <Button className="button-icon" type="text" loading={loading} icon={<RedoOutlined />} onClick={refetchHandle} />
    </Tooltip>
  )
}

export default React.memo(Refresh)
