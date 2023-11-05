# tarojs-table

<img alt="npm" src="https://img.shields.io/npm/v/tarojs-table?logo=npm&color=%234ac41c">
<img alt="npm" src="https://img.shields.io/npm/dm/tarojs-table?logo=npm&color=%234ac41c">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/chutao-zhang/tarojs-table?logo=github&color=%234ac41c">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/chutao-zhang/tarojs-table?logo=github&color=%234ac41c">

## 介绍

**tarojs-table** 是一个基于 **Taro3.x** 和 **React18.x** 封装的基础表格。

_(注意：此组件仅在微信小程序上运行调试过，并未在其他平台进行调试运行，无法保证在其他平台能正常使用。)_

## 安装

```sh
npm install tarojs-table
```

## 使用

```jsx
import Table from "tarojs-table";
// 内含 .css|.less|.scss 类型的样式文件，可自行选择引入
import "tarojs-table/lib/style.css";
// import 'tarojs-table/lib/style.less'
// import 'tarojs-table/lib/style.scss';

export default () => {
  return (
    <Table
      dataSource={[
        { id: 1, name: "张三", age: 18 },
        { id: 2, name: "李四", age: 19 },
      ]}
      columns={[
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "姓名", dataIndex: "name", key: "name" },
      ]}
      rowKey="id"
    />
  );
};
```

## API

### Table Props

| 参数             | 说明                                       | 类型                                           | 可选 | 默认值 |
| ---------------- | ------------------------------------------ | ---------------------------------------------- | :--: | :----: |
| id               | 表格 id                                    | string                                         |  是  |   无   |
| columns          | 表格列                                     | ColumnProps[]                                  |  否  |   无   |
| dataSource       | 表格数据                                   | any[]                                          |  否  |   无   |
| className        | 类样式                                     | string                                         |  是  |   无   |
| style            | 内联样式                                   | object                                         |  是  |   无   |
| wrapperClassName | 最外层的包裹容器类样式                     | string                                         |  是  |   无   |
| wrapperStyle     | 最外层的包裹容器内联样式                   | object                                         |  是  |   无   |
| rowKey           | 唯一标识                                   | string                                         |  是  |   无   |
| loading          | 加载中遮罩                                 | boolean 丨 LoadingProps                        |  是  |   无   |
| empty            | 空数据时显示                               | TableEmptyProps                                |  是  |   无   |
| scroll           | 超出滚动                                   | { x?: number 丨 string, y?: number 丨 string } |  是  |   无   |
| onRow            | 行属性                                     | (record: any, index: number) => RowProps       |  是  |   无   |
| onScroll         | 滚动时触发                                 | Function                                       |  是  |   无   |
| onScrollToLower  | 滚动到底部/右边，会触发 scrolltolower 事件 | Function                                       |  是  |   无   |
| onScrollToUpper  | 滚动到顶部/左边，会触发 scrolltoupper 事件 | Function                                       |  是  |   无   |

### ColumnProps

| 参数      | 说明                                          | 类型                                                        | 可选 | 默认值 |
| --------- | --------------------------------------------- | ----------------------------------------------------------- | :--: | :----: |
| title     | 列名                                          | React.ReactNode                                             |  否  |   无   |
| key       | 列唯一标识                                    | string                                                      |  是  |   无   |
| dataIndex | 列字段                                        | string                                                      |  是  |   无   |
| width     | 列宽                                          | number                                                      |  是  |   无   |
| className | 类样式                                        | string                                                      |  是  |   无   |
| align     | 内容水平位置                                  | 'left' 丨 'center' 丨 'right'                               |  是  |   无   |
| fixed     | 固定列（设置此项时须设置列宽）                | 'left' 丨 'right'                                           |  是  |   无   |
| ellipsis  | 文本超出省略（默认 1 行省略，可指定多行省略） | boolean 丨 number                                           |  是  |   无   |
| render    | 自定义渲染内容                                | (value: any, record: any, index: number) => React.ReactNode |  是  |   无   |

### RowProps

| 参数      | 说明       | 类型     | 可选 | 默认值 |
| --------- | ---------- | -------- | :--: | :----: |
| className | 行样式     | string   |  是  |   无   |
| style     | 行内联样式 | object   |  是  |   无   |
| onTap     | 点击行     | Function |  是  |   无   |

### TableEmptyProps

| 参数 | 说明              | 类型   | 可选 | 默认值 |
| ---- | ----------------- | ------ | :--: | :----: |
| img  | 自定义图片（src） | string |  是  |   无   |
| text | 自定义提示文字    | string |  是  |   无   |

### LoadingProps

| 参数 | 说明                       | 类型    | 可选 | 默认值 |
| ---- | -------------------------- | ------- | :--: | :----: |
| show | 是否显示 Loading           | boolean |  是  |   无   |
| img  | 自定义 loading 图片（src） | string  |  是  |   无   |
| text | 自定义 loading 文字        | string  |  是  |   无   |
