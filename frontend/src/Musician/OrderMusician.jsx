
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';


function OrderMusician() {
    const [orderData, setOrderData] = useState([]);
    const [editedItemId, setEditedItemId] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            width: 100,
        },
        {
            title: 'Username',
            dataIndex: 'user_id',
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
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            width: 200,
            render: (text, record) => (
                <div>
                    <Input
                        type="number"
                        value={text}
                        onChange={(e) => handlePriceChange(record.id, e.target.value)}
                        placeholder='$'
                    />
                    {editedItemId === record.id ? (
                        <Button
                            type="primary"
                            onClick={() => handleSavePrice(record.id, record.price, userId)}
                            style={{ marginTop: '10px' }}
                        >
                            Save
                        </Button>
                    ) : null}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <Space size="middle">
                    {isExpired(record) && text !== 3 ? (
                        <button className='btn-decline'  >
                            Expired
                        </button>
                    ) : record.status === 0 ? (
                        <button className='btn-decline'  >
                            Declined
                        </button>
                    ) : (

                        (
                            <>
                                {
                                    record.status === 1 ? (
                                        <button className='btn-payment'>
                                            Waiting for payment
                                        </button>
                                    ) : record.status === 2 ? (
                                        <button className='btn-do'>
                                            Do task
                                        </button>
                                    ) : record.status === 3 && (
                                        <button className='btn-accept'>
                                            Completed
                                        </button>
                                    )

                                }
                            </>
                        )

                    )}
                </Space>
            ),
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ borderRadius: '40px' }}>
                        <Link to={`/viewOrderMusician/${record.id}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>View</Link>
                    </Button>
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
                    const filteredData = response.data.data.filter(item => item.musician_id === null && item.status === null && !isExpired(item));
                    setOrderData(filteredData);
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
    }, []);
    const handlePriceChange = (itemId, newPrice) => {
        setOrderData((prevData) => {
            return prevData.map((item) =>
                (item.id === itemId && (item.status === 0 || item.status === null))
                    ? { ...item, price: newPrice }
                    : item
            );
        });
        if ((newPrice === "") || (orderData.find((item) => item.id === itemId)?.status !== 0 && orderData.find((item) => item.id === itemId)?.status !== null)) {
            setEditedItemId(null);
        } else {
            setEditedItemId(itemId);
        }
    };


    const handleSavePrice = async (itemId, newPrice, userId) => {
        try {
            const orderToUpdate = orderData.find(item => item.id === itemId);
            if (orderToUpdate && (orderToUpdate.status === null)) {
                const response = await axios.put(`${apiUrl}/acceptOrder/${itemId}/${userId}`, {
                    newPrice: newPrice,
                });

                if (response.data.Status === 'Success') {
                    window.location.reload(true);
                    setOrderData((prevData) => {
                        return prevData.map((item) =>
                            item.id === itemId ? { ...item, price: newPrice } : item
                        );
                    });

                    // if (orderToUpdate.status === 0) {
                    //     handleAccept(itemId);
                    // }
                } else {
                    console.error('Failed to save price:', response.data.Error);
                }
            } else {
                console.error('Invalid order status for price update');
            }
        } catch (error) {
            console.error('Error saving price:', error.message);
        } finally {
            setEditedItemId(null);
        }
    };


    // const handleAccept = (itemId) => {
    //     axios
    //         .put(`${apiUrl}/acceptOrder/${itemId}/`)
    //         .then((res) => {
    //             if (res.data.Status === 'Success') {
    //                 console.log("success")
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // };

    // const handleDecline = (itemId) => {
    //     axios
    //         .put(`${apiUrl}/declineOrder/` + itemId)
    //         .then((res) => {
    //             if (res.data.Status === 'Success') {
    //                 window.location.reload(true);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // };
    const isExpired = (record) => {
        const currentDate = moment();
        const durationDate = moment(record.duration);

        return currentDate.isAfter(durationDate) && record.status !== 3;
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
                                duration: item.duration,
                                genre: item.genre,
                                description: item.description,
                                price: item.price,
                                status: item.status,

                            }))}
                        />
                    </div>
                </div>
            }
        </>
    );
}
export default OrderMusician;