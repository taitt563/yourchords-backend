
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from '@mui/material';



function OrderStatus() {
    const [orderData, setOrderData] = useState([]);
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const columns = [
        {
            title: 'OrderId',
            dataIndex: 'id',
            width: 100,
        },
        {
            title: 'Username',
            dataIndex: 'user_id',
        },

        {
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Link',
            dataIndex: 'audio_link',
            width: 500,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            width: 200,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            width: 200,
            render: (text) => (
                <Space size="middle">
                    {text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                </Space>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <Space size="middle">
                    {isExpired(record) ? (
                        <button className='btn-decline' style={{ width: '100px', textAlign: 'center' }}>
                            Expired
                        </button>
                    ) : text === null ? (
                        <p style={{ width: '100px', textAlign: 'center' }}>
                            In process...
                        </p>
                    ) : text === 0 ? (
                        <button className='btn-decline' style={{ width: '100px', textAlign: 'center' }}>
                            Declined
                        </button>
                    ) : text === 1 && record.price !== null ? (
                        <>
                            <Button className='btn-accept' style={{ width: '100px', textAlign: 'center' }} onClick={() => handlePayment(record.id)}>
                                Payment
                            </Button>
                            <Button className='btn-decline' style={{ width: '100px', textAlign: 'center' }} onClick={() => handleDecline(record.id)}>
                                Decline
                            </Button>
                        </>
                    ) : text === 2 && record.price !== null ? (
                        <button className='btn-payment'  >
                            Payment Successful
                        </button>
                    ) : text === 3 && record.price !== null ? (
                        <button className='btn-payment'  >
                            Successfully completed
                        </button>
                    ) : null}
                </Space>
            ),
        },

        {
            title: 'Actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ borderRadius: '40px' }}>
                        <Link href={`/viewOrderCustomer/${record.id}`}>View</Link>
                    </Button>
                </Space >
            ),
        },
    ];
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getOrder`);

                if (response.data.Status === 'Success') {
                    const userOrders = response.data.data.filter(item => item.user_id === userId);
                    setOrderData(userOrders);
                } else {
                    console.error('Failed to fetch order data:', response.data.Error);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            }
        };
        fetchOrderData();
    }, [userId]);

    const isExpired = (record) => {
        const currentDate = moment();
        const durationDate = moment(record.duration);

        return currentDate.isAfter(durationDate);
    };
    const handlePayment = (itemId) => {
        axios
            .put(`${apiUrl}/payment/` + itemId)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleDecline = (itemId) => {
        axios
            .put(`${apiUrl}/declineOrder/` + itemId)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                }
            })
            .catch((err) => console.log(err));
    };
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
                        dataSource={orderData.map(item => ({
                            id: item.id,
                            user_id: item.user_id,
                            genre: item.genre,
                            audio_link: item.audio_link,
                            description: item.description,
                            status: item.status,
                            price: item.price,
                            duration: item.duration,

                        }))}
                    />
                </div>
            </div>
        </>
    );
}
export default OrderStatus;