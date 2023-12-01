import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
function ViewOrderMusician() {
    const [orderData, setOrderData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getOrder/${id}`);
                const orders = response.data.data;

                if (orders && Array.isArray(orders)) {
                    setOrderData(orders);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            }
        };

        fetchOrderData();
    }, [apiUrl, userId]);


    return (
        <>
            <SearchAppBar />
            <div className="maincontainer">
                <div className="container">
                    <div className="py-5 text-center">
                        <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Order</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-12 order-md-1">
                            {orderData.map((order, index) => (
                                <div key={index}>
                                    <form className="needs-validation" noValidate>
                                        <div className="row">
                                            <div className="mb-3">
                                                <b htmlFor="title">Song title</b>
                                                <p>{order.song_name}</p>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <b htmlFor="lyric">Lyric</b>
                                            <div className="input-group">
                                                <textarea
                                                    id="lyric"
                                                    rows={15}
                                                    cols={200}
                                                    value={order.lyric}
                                                    style={{ borderRadius: '10px' }}
                                                    required
                                                >{order.lyric}</textarea>
                                                <div className="invalid-feedback">
                                                    Lyric is required.
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3">
                                            <b htmlFor="artist">Artist</b>
                                            <p>{order.artist_name}</p>
                                        </div>

                                        <div className="mb-3">
                                            <b htmlFor="duration" className="form-label">Duration</b>
                                            <p>{moment(order.duration).format('YYYY - MM - DD  HH:mm:ss')}</p>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="cc-genre">Genre</b>
                                                <p>{order.genre}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="cc-link">Link</b>
                                                <p>{order.link}</p>
                                            </div>
                                        </div>
                                        <hr className="mb-4" />
                                        <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate("/orderMusician")}>Close</button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>

                    <footer className="my-5 pt-5 text-muted text-center text-small">

                    </footer>
                </div>
            </div>
        </>
    );
}

export default ViewOrderMusician;
