import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
function ViewOrderCustomer() {
    const [orderData, setOrderData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const [docxFile, setDocxFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const { id } = useParams();

    const [isFormReadOnly, setIsFormReadOnly] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getOrder/${id}`);
                const order = response.data.data;

                if (order) {
                    setOrderData([order]);
                    setIsFormReadOnly(isExpired(order));
                    setDocxFile(order.docxFile);
                    setImageFile(order.imageFile);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            }
        };

        fetchOrderData();
    }, [apiUrl, userId]);


    const handleClose = () => {
        navigate(`/orderStatus/${userId}`)
    };



    const isExpired = (record) => {
        const currentDate = moment();
        const durationDate = moment(record.duration);

        return currentDate.isAfter(durationDate);
    };
    const handleLyricChange = (event, index) => {
        const updatedOrderData = [...orderData];
        updatedOrderData[index].lyric = event.target.value;
        setOrderData(updatedOrderData);
    };

    const generateBlobUrl = (data, mimeType) => {
        const blob = new Blob([data], { type: mimeType });
        return URL.createObjectURL(blob, { type: mimeType });
    };

    return (
        <>
            <SearchAppBar />


            <div className="container">

                <div className="py-4 text-center">
                    <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Order</h2>
                </div>
                <div className="row">
                    <div className="col-md-4 order-md-2 " style={{ backgroundColor: "#EFFBEF", height: '270px', width: '420px' }}>
                        <h4 className="text-center mb-3">
                            <span>Notes</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <div className='notes' style={{ marginLeft: '50px' }}>
                                <li>Posts are not duplicated</li>
                                <li>Write the full name of the song</li>
                                <li>Type in English or Vietnamese with accents</li>
                                <li>Enter full lyrics and chords. </li>
                                <li>Do not post songs with reactionary or sensitive content that violate Vietnamese customs and traditions.</li>
                            </div>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
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
                                                onChange={(e) => handleLyricChange(e, index)}
                                                style={{ borderRadius: '10px' }}
                                                required
                                                readOnly={isFormReadOnly}

                                            />
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
                                        <p style={{ color: 'red' }}>{moment(order.duration).format('YYYY - MM - DD  HH:mm:ss')}</p>
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



                                    {docxFile && (
                                        <div className="mb-3 file-download">
                                            <b>Download DOCX File:</b>
                                            <a
                                                href={generateBlobUrl(docxFile, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}
                                                download="document.docx"
                                            >
                                                Download DOCX
                                            </a>
                                        </div>
                                    )}
                                    {imageFile && (
                                        <div className="mb-3 file-download">
                                            <b>Download Image:</b>
                                            <a href={`data:image/png;base64,${imageFile}`} download="image.png">
                                                Download Image
                                            </a>
                                        </div>
                                    )}


                                    <hr className="mb-4" />
                                    <div className="d-flex justify-content-between">
                                        {isExpired(order) ? (
                                            <>
                                                <button className="btn btn-danger" style={{ width: '1000px' }} onClick={handleClose}>
                                                    Expired
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-primary" onClick={handleClose}>
                                                    Close
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="my-5 pt-5 text-muted text-center text-small"></footer>
            </div>
        </>
    );
}

export default ViewOrderCustomer;
