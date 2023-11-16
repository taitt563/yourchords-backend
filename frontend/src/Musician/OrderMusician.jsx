
import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { Radio, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'OrderId',
        dataIndex: 'orderId',
        key: 'orderId',
    },
    {
        title: 'BeatID',
        dataIndex: 'beatId',
        key: 'beatId',
    },
    {
        title: 'Description',
        key: 'desc',
        dataIndex: 'desc',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button className='btn-accept'>Accept</button>
                <button className='btn-decline'>Decline</button>
            </Space>
        ),
    },
];
const data = [
    {
        id: '1',
        orderId: 'John Brown',
        beatId: 32,
        address: 'New York No. 1 Lake Park',

    },
    {
        id: '2',
        orderId: 'Jim Green',
        beatId: 42,
        address: 'London No. 1 Lake Park',

    },
    {
        id: '3',
        orderId: 'Joe Black',
        beatId: 32,
        address: 'Sydney No. 1 Lake Park',

    },
    {
        id: '4',
        orderId: 'Green',
        beatId: 39,
        address: 'Sydney No. 1 Lake Park',

    },
    {
        id: '5',
        orderId: 'Black',
        beatId: 39,
        address: 'Sydney No. 1 Lake Park',

    },
    {
        id: '6',
        orderId: 'Joe',
        beatId: 39,
        address: 'Sydney No. 1 Lake Park',

    },
];
function OrderMusician() {
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column pt-2'>
                <div className='d-flex flex-column pt-4'>
                    <h3 className="d-flex justify-content-center">Receive Order</h3>
                </div>
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </>
    )
}
export default OrderMusician;