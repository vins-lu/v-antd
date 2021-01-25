# boss-search-list 配置化表单组件

## 更新文档
- v1.2.9 修复初始页页码size变化未搜索的问题
- v1.2.6 暴露直接修改表格数据的方法 **setTableData**
- v1.2.5 修复页码size变化触发多次搜索的问题
- v1.2.4 修复单页数据，页码不显示的问题
- v1.2.3 修复页码变化的触发多次搜索的问题
- v1.2.2 支持searchFields为空，隐藏搜索表单的功能
- v1.2.1 修复搜索组的展开关联&搜索参数的解析和同步
- v1.2.0 添加表单项配置是否可缓存的功能
- v1.1.9 修改搜索参数的缓存为 **form** 的 **initialValue**
- v1.1.8 添加表单项配置修改分组的高度的功能
- v1.1.7 添加搜索参数的缓存功能
- v1.1.6 修复分组搜索列表，子列表展开和父容器的交互问题
- v1.1.4 更新render-table组件、主题优化、初始表格高度的计算
- v1.1.2 ts优化：添加SearchListRefObject类型
- v1.1.1 加入搜索场景的暴露
- v1.1.0 初始版本

### 使用方法

> yarn add @vins-rc/search-list

## 示例
[search-list示例](https://boss-react-doc.fast-inside.tuya-inc.cn:7799/components/logic/search-list)

## 文档

### 组件属性 SearchListProps
| 参数     | 说明         | 类型     | 可选值 | 默认值 | 版本 |
| -------- | ----------- | ------- | -------------- | ------ | ---- |
| form     | 搜索表单实例    | FormInstance  | -  | -  | -  |
| ref      | 搜索表单ref    | SearchListRefObject  | -  | -  | -  |
| onSearch    | 搜索的回调函数(触发时机：点击搜索，重置，分页变化)    | (formValues, searchSense: SearchSenseType) => Promise< SearchDataType >  | 必填  | -  | **searchSense v1.1.1新增**  |
| searchFields | 搜索表单项配置    | [RenderFormItemProps](https://boss-react-doc.fast-inside.tuya-inc.cn:7799/components/p0/render-form#%E8%A1%A8%E5%8D%95%E9%A1%B9%E5%8F%82%E6%95%B0-renderformitemprops)  | 必填  | -  | -  |
| searchExtra  | 搜索表单额外操作    | React.ReactNode  | -  | -  | -  |
| cacheSearchParams | 是否缓存搜索参数 | boolean  | -  | -  | **>=v1.1.7**  |
| syncSearchToUrl   | 是否把搜索参数同步到url | boolean  | false  | -  | **>=v1.2.1**  |
| parseUrlParams    | 是否解析url中的参数 | boolean  | -  | true  | **>=v1.2.1**  |
| tableColumns | 搜索列表数据项配置    | [BaseTableProps-columns](https://ant.design/components/table-cn/#API)  | 必填  | -  | -  |
| tableExtra   | 搜索列表工具栏配置    | React.ReactNode  | -  | -  | -  |
| rowKey       |  搜索列表数据唯一标示   | [BaseTableProps-rowKey](https://ant.design/components/table-cn/#API)  | 必填  | -  | -  |
| pageSizeOptions | 分页可选项配置    | string[]  | -  | ['30', '50', '100']  | -  |
| defaultPageSize | 默认的分页    | number  | -  | 30  | -  |
| formProps    | 搜索表单配置     | [RenderFormProps](https://boss-react-doc.fast-inside.tuya-inc.cn:7799/components/p0/render-form#%E8%A1%A8%E5%8D%95%E5%8F%82%E6%95%B0)  | -  | -  | -  |
| hideExpand   | 是否隐藏展开按钮    | boolean  | -  | false  | **v1.1.1新增**  |
| searchMaxHeight | 显示的最大高度     | number｜string | -  | 48px  | **v1.1.1新增**  |
| groupMaxHeight  | 分组的场景每组显示的最大高度    | number｜string | -  | 48px  | **v1.1.1新增**  |
| ...      | 搜索列表配置    | [RenderTableProps](https://boss-react-doc.fast-inside.tuya-inc.cn:7799/components/p0/render-table#rendertable-%E5%8F%82%E6%95%B0)  | -  | -  | -  |

> **SearchListProps** 默认继承 **RenderTableProps**

> **v1.1.8** 表单项配置中分组的高度，也可以在 **itemProps** 的 **maxHeight** 中定义

> **v1.2.0** 表单项配置中可以修改 **itemProps** 的 **cache** 字段为 **no-cache** 不缓存该表单字段；该字段未使用 boolean 类型的原因是 itemProps 字段中的属性会同步到form.item组件对应的html标签上，造成字段类型异常

> 搜索参数的解析和缓存，目前忽略分页参数

### SearchSenseType 搜索场景类型 **v1.1.1新增**
| 值     | 说明         |
| -------- | ----------- |
| initSearch | 初始化搜索 |
| search   | 点击搜索按钮    |
| reset | 点击重置按钮 |
| refresh | 点击刷新按钮 |
| page | 页码变化 |
| pageSize   | 每页数量变化    |
| refSearch | 通过ref调用search方法 |

### 搜索表单ref SearchListRefObject **v1.1.2新增**
| 方法     | 说明         | 参数     | 版本 |
| -------- | ----------- | ------- | ---- |
| getSearchData | 获取搜索表单的数据 | - | - |
| getTableData   | 获取搜索表格的数据    | -  | - |
| setTableData   | 设置搜索表格的数据    | data ｜(tableData) => data  | v1.2.6 |
| search | 调用搜索方法 | (page, pagesize)  | - |
| resetForm | 重置搜索表单的数据 | -  | - |
| clearSearchCache | 清除缓存的搜索参数 | -  | **>=1.1.7** |


### 搜索的回调函数的数据格式 SearchDataType
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| list | 表单元素的属性 | array | 必填  | -  |
| page   | 分组表单元素    | number  | 必填  | 1  |
| total | 分组表单元素的列数 | number  | 必填  | 0  |
