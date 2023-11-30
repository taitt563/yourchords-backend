
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table } from 'antd';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
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
        title: 'Link',
        dataIndex: 'linkId',
        key: 'linkId',
    },
    {
        title: 'Description',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        key: 'action',
        render: () => (
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
                    <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Receive Order</h3>
                </div>
                <div style={{ width: '90%', margin: '0 auto' }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </>
    );
}
export default OrderMusician;