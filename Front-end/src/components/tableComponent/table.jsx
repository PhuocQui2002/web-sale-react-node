// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: 120,
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'img',
    key: 'number',
    width: 120,
    
  },
  {
    title: 'Số lượng',
    dataIndex: 'number',
    key: 'number',
    width: 90,
  },
  
  {
    title: 'Giá tiền',
    dataIndex: 'price',
    key: 'price',
    width: 120,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
    width: 100,
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'price',
    key: 'price 2',
    width: 90,
    ellipsis: true,
  },
  
  
  
];
const data = [
  {
    key: '1',
    name: 'Tranh phong cảnh',
    number: 1,
    address: 'TP Cao Lãnh',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Tranh động vật',
    number: 2,
    address: 'TP Cần Thơ',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Tranh hoa hồng',
    number: 3,
    address: 'TP Hồ Chí Minh',
    tags: ['cool', 'teacher'],
  },
];
const TableComponent = () => <Table columns={columns} dataSource={data} />;
export default TableComponent;