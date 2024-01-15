
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Button, message, Modal } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom'
// import PayPalButton from '../../PaypalButton';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';


function OrderStatus() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleDelete = async (recordId) => {
        try {
            const response = await axios.delete(`${apiUrl}/deleteOrder/${recordId}`);

            if (response.data.Status === 'Success') {
                setOrderData((prevOrderData) => prevOrderData.filter(item => item.id !== recordId));
                message.success('Order deleted successfully');
            } else {
                message.error('Failed to delete order');
            }
        } catch (error) {
            message.error('An error occurred while deleting the order');
        }
    };
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            width: 100,
        },
        {
            title: 'Musician',
            dataIndex: 'musician_id',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
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
                    {text ? moment(text).format('YYYY-MM-DD') : 'N/A'}
                </Space>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <Space size="middle">
                    {text === 3 && record.price !== null ? (
                        <button className='btn-accept'>
                            Completed
                        </button>
                    ) : (
                        <>
                            {isExpired(record) && text !== 3 ? (
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
                                    <PayPalButton orderId={String(record.id)} orderPrice={record.price} />
                                    <Button className='btn-decline' style={{ width: '100px', textAlign: 'center' }} onClick={() => handleDecline(record.id)}>
                                        Decline
                                    </Button>
                                </>
                            ) : text === 2 && record.price !== null ? (
                                <button className='btn-payment'  >
                                    Payment Successful
                                </button>
                            ) : null}
                        </>
                    )}
                </Space>
            ),
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ borderRadius: '40px' }}>
                        <Link to={`/viewOrderCustomer/${record.id}`} style={{ textDecoration: 'none' }}>View</Link>
                    </Button>
                    {record.status === null || record.status === 0 && !isExpired(record) &&
                        <Button
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Confirm Deletion',
                                    content: 'Are you sure you want to delete this order?',
                                    onOk() {
                                        handleDelete(record.id);
                                    },
                                    onCancel() {
                                        console.log('Cancel');
                                    },
                                });
                            }}
                            type="primary"
                            danger
                            style={{ borderRadius: '40px' }}
                        >
                            Delete
                        </Button>
                    }
                </Space >
            ),
        },
    ];
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
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
            finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [userId]);
    const PayPalButton = ({ orderId, orderPrice }) => {
        return (
            <PayPalScriptProvider options={{
                'client-id': 'AZ6d9ffPLNuoZMCw12Io2dfXJyOj6SoYR6yvHLiCx_NPiJxfGaBbY59L8BAJ28BP2a2xuWDleYxE9aEk'
            }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: orderPrice.toString(),
                                    },
                                },
                            ],
                            custom_id: orderId,
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            handlePaymentConfirmation(orderId, details);
                        });
                    }}
                />
            </PayPalScriptProvider>
        );
    };
    PayPalButton.propTypes = {
        orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        orderPrice: PropTypes.number.isRequired,
    };

    const isExpired = (record) => {
        const currentDate = moment();
        const durationDate = moment(record.duration);

        return currentDate.isAfter(durationDate) && record.status !== 3;
    };
    // const handlePayment = (itemId) => {
    //     axios
    //         .put(`${apiUrl}/payment/` + itemId)
    //         .then((res) => {
    //             if (res.data.Status === 'Success') {
    //                 window.location.reload(true);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // };



    const handlePaymentConfirmation = async (orderId, paymentDetails) => {
        try {
            console.log('Before PayPal API Call - Order ID:', orderId, 'Payment Details:', paymentDetails);

            const response = await axios.put(`${apiUrl}/updateOrderStatus/${orderId}`, {
                status: 'COMPLETED',
                paymentDetails: paymentDetails,
            });

            console.log('After PayPal API Call - Response:', response);
            if (response.data.Status === 'Success') {
                window.location.reload(true);
                const updatedOrderData = orderData.map(item => {
                    if (item.id === orderId) {
                        item.status = 2;
                        item.paymentSuccessful = true;
                    }
                    return item;
                });

                setOrderData(updatedOrderData);
            } else {
                console.error('Failed to update order status:', response.data.Error);
            }
        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
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
            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading...</p>
                </div>
            )
                :
                <div className='d-flex flex-column pt-2'>
                    <div className='d-flex flex-column pt-4'>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Receive Order</h3>
                    </div>
                    <div style={{ width: '90%', margin: '0 auto' }}>
                        <Table
                            columns={columns}
                            dataSource={orderData.map(item => ({
                                key: item.id,
                                id: item.id,
                                user_id: item.user_id,
                                genre: item.genre,
                                description: item.description,
                                status: item.status,
                                price: item.price,
                                duration: item.duration,
                                musician_id: item.musician_id,
                            }))}
                        />
                    </div>
                </div>
            }
        </>
    );
}
export default OrderStatus;