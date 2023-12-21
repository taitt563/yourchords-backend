import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import SearchAppBar from '../component/SearchAppBar';
import moment from 'moment';
function TransactionHistory() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        setLoading(true);

        axios
            .get(`${apiUrl}/history/${userId}`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Transaction Time',
            dataIndex: 'date_payment',
            key: 'date_payment',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span style={{ color: 'green', fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: 'Payment method',
            dataIndex: 'payment_method',
            key: 'payment_method',
            render: () => <span style={{ textAlign: 'center', fontWeight: 'bold' }}>PAYPAL</span>,
        },

    ];

    return (
        <>
            <SearchAppBar />
            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="d-flex flex-column align-items-center pt-2">
                    <div className="d-flex flex-column align-items-center pt-4">
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                            Transaction History
                        </h3>
                    </div>
                    <Table columns={columns} dataSource={data} style={{ width: '1200px', marginTop: '30px', marginBottom: '120px' }} />
                </div>
            )}
        </>
    );
}

export default TransactionHistory;
