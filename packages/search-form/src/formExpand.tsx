import React from 'react'
import { Button } from 'antd/sun'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface FormExpandProps {
  expand: boolean
  setExpand: (expand: boolean) => void
}

type FormExpandTypes = (props: FormExpandProps) => JSX.Element

const FormExpand: FormExpandTypes = ({ expand, setExpand }: FormExpandProps) => {
  return (
    <Button
      style={{ marginLeft: 8, fontSize: 12 }}
      type="link"
      onClick={(): void => {
        setExpand(!expand)
      }}
    >
      {expand ? (
        <>
          收起
          <UpOutlined style={{ marginLeft: 8 }} />
        </>
      ) : (
        <>
          展开
          <DownOutlined style={{ marginLeft: 8 }} />
        </>
      )}
    </Button>
  )
}

export default FormExpand
