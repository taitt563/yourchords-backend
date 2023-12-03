
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@mui/material';
import moment from 'moment';


function OrderMusician() {
    const [orderData, setOrderData] = useState([]);
    const [editedItemId, setEditedItemId] = useState(null);
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
                    {text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                </Space>
            ),
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Link',
            dataIndex: 'audio_link',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Price',
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
                            onClick={() => handleSavePrice(record.id, record.price)}
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
                    {isExpired(record) ? (
                        <button className='btn-decline'  >
                            Expired
                        </button>
                    ) : record.status === 0 ? (
                        <button className='btn-decline'  >
                            Declined
                        </button>
                    ) : (
                        <>
                            {record.price === null ? (
                                <button className='btn-decline' onClick={() => handleDecline(record.id)}>
                                    Decline
                                </button>
                            ) : (
                                <>
                                    {record.status === 1 ? (
                                        <button className='btn-payment' onClick={""}>
                                            Waiting for payment
                                        </button>
                                    ) : record.status === 2 ? (
                                        <button className='btn-accept' onClick={""}>
                                            Do it
                                        </button>
                                    ) : (
                                        <Button className='btn-accept' onClick={() => handleAccept(record.id)}>
                                            Accept
                                        </Button>
                                    )}
                                </>
                            )}
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
                        <Link href={`/viewOrderMusician/${record.id}`}>View</Link>
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
                    setOrderData(response.data.data);
                } else {
                    console.error('Failed to fetch order data:', response.data.Error);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            }
        };
        fetchOrderData();
    }, []);
    const handlePriceChange = (itemId, newPrice) => {
        setOrderData((prevData) => {
            return prevData.map((item) =>
                item.id === itemId ? { ...item, price: newPrice } : item
            );
        });
        if (newPrice === "") {
            setEditedItemId(null);
        } else {
            setEditedItemId(itemId);
        }
    };

    const handleSavePrice = async (itemId, newPrice) => {
        try {
            const response = await axios.put(`${apiUrl}/updatePrice/${itemId}`, {
                newPrice: newPrice,
            });
            if (response.data.Status === 'Success') {
                setOrderData((prevData) => {
                    return prevData.map((item) =>
                        item.id === itemId ? { ...item, price: newPrice } : item
                    );
                });
            } else {
                console.error('Failed to save price:', response.data.Error);
            }
        } catch (error) {
            console.error('Error saving price:', error.message);
        } finally {
            setEditedItemId(null);
        }
    };
    const handleAccept = (itemId) => {
        axios
            .put(`${apiUrl}/acceptOrder/` + itemId)
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
    const isExpired = (record) => {
        const currentDate = moment();
        const durationDate = moment(record.duration);

        return currentDate.isAfter(durationDate);
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
                            duration: item.duration,
                            genre: item.genre,
                            audio_link: item.audio_link,
                            description: item.description,
                            price: item.price,
                            status: item.status,

                        }))}
                    />
                </div>
            </div>
        </>
    );
}
export default OrderMusician;