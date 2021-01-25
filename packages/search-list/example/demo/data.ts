const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 140,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 140,
    editOption: {
      type: 'number',
    },
  },
  {
    title: '地址',
    hideColumnDisable: true,
    fixedDisable: true,
    dataIndex: 'address',
    width: 140,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 140,
    key: 'tags',
    render(text: string) {
      return '标签__' + text
    },
  },
]

const data = Array.from({ length: 16 }).map((_, i) => {
  const t = i + 1
  return {
    name: 'name_' + t,
    age: i,
    address: 'address' + t,
    tags: i,
  }
})

export { columns, data }
