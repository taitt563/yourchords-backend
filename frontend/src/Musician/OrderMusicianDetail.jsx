
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
    },
    {
        title: 'OrderID',
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
];
const data = [
    {
        id: '1',
        orderId: 'A123',
        beatId: 32,
        desc: 'New York No. 1 Lake Park',
        quantity: '2'

    },
    {
        id: '2',
        orderId: 'B123',
        beatId: 32,
        desc: 'New York No. 1 Lake Park',
        quantity: '2'

    },
    {
        id: '3',
        orderId: 'C123',
        beatId: 32,
        desc: 'New York No. 1 Lake Park',
        quantity: '2'

    },
    {
        id: '4',
        orderId: 'D123',
        beatId: 32,
        desc: 'New York No. 1 Lake Park',
        quantity: '2'

    },
];
function OrderMusicianDetail() {
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column pt-2'>
                <div className='d-flex flex-column pt-4'>
                    <h3 className="d-flex justify-content-center">Order Detail</h3>
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
export default OrderMusicianDetail;