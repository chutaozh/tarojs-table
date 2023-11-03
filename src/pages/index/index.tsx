import { View } from '@tarojs/components'
import Table, { ColumnProps } from '../../components/Table'
import '../../components/Table/style.scss'
import './index.less'
import { useEffect, useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
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
    }, 2000);
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
      render: (text: any, record: any, index: number) => <View>编辑</View>
    }
  ];

  return (
    <View className='index'>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: '100vh', x: '100vw' }}
        onRow={() => ({ onTap: console.log })}
      />
    </View>
  );
};