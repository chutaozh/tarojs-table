<style>
  pre {
    max-height: 600px;
    overflow: auto;
  }
</style>

# tarojs-table

<p>
<img alt="npm" src="https://img.shields.io/npm/v/tarojs-table?logo=npm&color=%234ac41c">
<img alt="npm" src="https://img.shields.io/npm/dm/tarojs-table?logo=npm&color=%234ac41c">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/chutao-zhang/tarojs-table?logo=github&color=%234ac41c">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/chutao-zhang/tarojs-table?logo=github&color=%234ac41c">
</p>

## 介绍

**tarojs-table** 是一个基于 **Taro3.x** 和 **React18.x** 封装的基础表格。

<div style="font-size:12px; color:#808080;">注意：这只是一个非常基础的表格组件，暂不支持合并行/列，展开行等功能，请谨慎选用。（所支持的功能请看<strong>属性配置</strong>）</div>
<div style="font-size:12px; color:#b7b7b7;margin-top:15px"><i>(温馨提示：此组件仅在微信小程序上运行调试过，并未在其他平台进行调试运行，无法保证在其他平台能正常使用。)</i></div>

## 安装

```sh
npm install tarojs-table
```

## 使用

```jsx
import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Table, { ColumnProps } from "tarojs-table";
// 内含 .css|.less|.scss 类型的样式文件，可自行选择引入
import "tarojs-table/lib/style.css";
// import 'tarojs-table/lib/style.less'
// import 'tarojs-table/lib/style.scss';

export default () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    // 模拟loading
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setDataSource([
      { name: 'Margaret', gender: 'Female', age: 29, occupation: 'Financial Analyst', address: '789 Birch St' },
      { name: 'Michael', gender: 'Male', age: 42, occupation: 'Marketing Manager', address: '456 Pine Ave' },
      { name: 'Jennifer', gender: 'Female', age: 31, occupation: 'Web Developer', address: '101 Cedar Ln' },
      { name: 'Christopher', gender: 'Male', age: 24, occupation: 'Graphic Designer', address: '555 Elm Blvd' },
      { name: 'Sarah', gender: 'Female', age: 45, occupation: 'Human Resources Manager', address: '222 Oak Dr' },
      { name: 'William', gender: 'Male', age: 37, occupation: 'Project Manager', address: '333 Maple Rd' },
      { name: 'Emily', gender: 'Female', age: 28, occupation: 'Software Engineer', address: '777 Walnut Ct' },
      { name: 'Daniel', gender: 'Male', age: 55, occupation: 'Data Scientist', address: '888 Pine Ave' },
      { name: 'Jessica', gender: 'Female', age: 23, occupation: 'UX Designer', address: '444 Cedar St' },
      { name: 'David', gender: 'Male', age: 30, occupation: 'Product Manager', address: '666 Elm Ave' },
      { name: 'Amanda', gender: 'Female', age: 48, occupation: 'Sales Manager', address: '999 Birch Blvd' },
      { name: 'Ryan', gender: 'Male', age: 36, occupation: 'Content Writer', address: '123 Oak Rd' },
      { name: 'Olivia', gender: 'Female', age: 20, occupation: 'Customer Support Specialist', address: '321 Pine Ct' },
      { name: 'Matthew', gender: 'Male', age: 50, occupation: 'Architect', address: '567 Cedar Ln' },
      { name: 'Sophia', gender: 'Female', age: 27, occupation: 'Systems Analyst', address: '432 Elm Blvd' },
      { name: 'Andrew', gender: 'Male', age: 33, occupation: 'Network Administrator', address: '876 Maple Dr' },
      { name: 'Emma', gender: 'Female', age: 38, occupation: 'Financial Advisor', address: '654 Walnut Rd' },
      { name: 'James', gender: 'Male', age: 26, occupation: 'Quality Assurance Analyst', address: '333 Birch St' },
      { name: 'Madison', gender: 'Female', age: 43, occupation: 'Business Analyst', address: '111 Pine Ave' },
      { name: 'Alexander', gender: 'Male', age: 35, occupation: 'UI Designer', address: '789 Cedar Blvd' },
      { name: 'Grace', gender: 'Female', age: 22, occupation: 'Technical Writer', address: '555 Elm Rd' },
      { name: 'Brian', gender: 'Male', age: 41, occupation: 'Sales Representative', address: '444 Birch Ct' },
      { name: 'Chloe', gender: 'Female', age: 29, occupation: 'Operations Manager', address: '222 Oak Ln' },
      { name: 'Ethan', gender: 'Male', age: 52, occupation: 'Software Developer', address: '888 Cedar St' },
      { name: 'Isabella', gender: 'Female', age: 25, occupation: 'Marketing Coordinator', address: '123 Elm Blvd' },
      { name: 'Benjamin', gender: 'Male', age: 34, occupation: 'UX/UI Designer', address: '666 Pine Dr' },
      { name: 'Ava', gender: 'Female', age: 47, occupation: 'Project Coordinator', address: '321 Cedar Rd' },
      { name: 'Liam', gender: 'Male', age: 32, occupation: 'IT Specialist', address: '567 Elm Ct' },
      { name: 'Mia', gender: 'Female', age: 21, occupation: 'Accountant', address: '876 Maple Ln' },
      { name: 'John', gender: 'Male', age: 31, occupation: 'UI Designer', address: '265 Cedar Rd' }
    ]);
  }, []);

  const columns: ColumnProps[] = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      fixed: 'left',
      align: 'center',
      render: (text: any, record: any, index: number) => index + 1
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      className: 'name-cell',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '职业',
      dataIndex: 'occupation',
      key: 'occupation',
      width: 120,
      ellipsis: true
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: 2
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      fixed: 'right',
      align: 'center',
      className: 'action-cell',
      render: (text: any, record: any, index: number) => <View style={{ color: "blue" }}>编辑</View>
    }
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      scroll={{ y: '100vh', x: '100vw' }}
    />
  );
};
```

效果：

<p>
<img alt="" src="https://github.com/chutao-zhang/tarojs-table/blob/master/public/example.gif?raw=true" width="300" />
</p>

## 属性配置

### TableProps

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
| scroll           | 内容超出范围滚动                           | { x?: number 丨 string, y?: number 丨 string } |  是  |   无   |
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
