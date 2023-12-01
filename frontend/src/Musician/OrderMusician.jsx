
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';



function OrderMusician() {
    const [orderData, setOrderData] = useState([]);
    const [editedItemId, setEditedItemId] = useState(null);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
        },
        {
            title: 'Username',
            dataIndex: 'user_id',
        },
        {
            title: 'OrderId',
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
            key: 'action',
            render: () => (
                <Space size="middle">
                    <button className='btn-accept'>Accept</button>
                    <button className='btn-decline'>Decline</button>
                </Space>
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
            const response = await axios.post(`${apiUrl}/updatePrice`, {
                itemId: itemId,
                newPrice: newPrice,
            });
            if (response.data.Status === 'Success') {
                window.location.reload(true);
            } else {
                console.error('Failed to save price:', response.data.Error);
            }
        } catch (error) {
            console.error('Error saving price:', error.message);
        } finally {
            setEditedItemId(null);
        }
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
                            key: item.id,
                            id: item.id,
                            user_id: item.user_id,
                            genre: item.genre,
                            audio_link: item.audio_link,
                            desc: item.desc,
                            price: item.price,
                        }))}
                    />
                </div>
            </div>
        </>
    );
}
export default OrderMusician;