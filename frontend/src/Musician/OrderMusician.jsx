
import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { Radio, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
    {
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'UserID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'Price',
        key: 'price',
        dataIndex: 'price',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                {/* <button className='btn-detail'>Detail</button> */}
                <Link to="/OrderMusicianDetail" className='btn-detail' >
                    <h6>Detail</h6>
                </Link>
            </Space>
        ),
    },
];
const data = [
    {
        id: '1',
        date: '2020-12-14',
        userId: 'John Brown',
        price: 32,
        status: 'Approve'

    },
    {
        id: '2',
        date: '2020-12-14',
        userId: 'John Brown',
        price: 32,
        status: 'Approve'

    },
    {
        id: '3',
        date: '2020-12-14',
        userId: 'John Brown',
        price: 32,
        status: 'Approve'

    },
    {
        id: '4',
        date: '2020-12-14',
        userId: 'John Brown',
        price: 32,
        status: 'Approve'

    },
    {
        id: '5',
        date: '2020-12-14',
        userId: 'John Brown',
        price: 32,
        status: 'Approve'

    },
    {
        id: '6',
        date: '2020-12-14',
        userId: 'John Brown',
        price: 32,
        status: 'Approve'

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