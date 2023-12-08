import { useEffect, useState } from 'react';
import axios from 'axios';
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
    return (
        <>
            <SearchAppBar />
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
                :
                <div className="d-flex flex-column align-items-center pt-2">
                    <div className="d-flex flex-column align-items-center pt-4">
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                            Transaction History
                        </h3>
                    </div>
                    <table className="table" style={{ width: '900px', marginTop: '30px', marginBottom: '120px' }}>
                        <thead>
                            <tr style={{ border: '2px' }}>
                                <th scope="col">Order ID</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Transaction Time</th>
                                <th scope="col">Price</th>
                                <th scope="col" style={{ textAlign: 'center' }}>
                                    Payment method
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.user_id}</td>
                                    <td>{moment(transaction.date_payment).format("YYYY-MM-DD HH:mm:ss")}</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>{transaction.price}</td>
                                    <td style={{ textAlign: 'center' }}>PAYPAL</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

export default TransactionHistory;
