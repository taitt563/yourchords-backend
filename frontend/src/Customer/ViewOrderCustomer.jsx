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
    const [videoFile, setVideoFile] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isFormReadOnly, setIsFormReadOnly] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/getOrder/${id}`);
                const order = response.data.data;

                if (order) {
                    setOrderData([order]);
                    setIsFormReadOnly(isExpired(order));
                    setDocxFile(order.docxFile);
                    setImageFile(order.imageFile);
                    setVideoFile(order.videoFile);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            }
            finally {
                setLoading(false);
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
        return URL.createObjectURL(blob);
    };

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

                <div className="container payment-container" style={{ width: '1200px' }}>

                    <div className="py-4 text-center">
                        <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Order</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4" style={{ backgroundColor: "#EFFBEF", height: 'fit-content', width: '350px', padding: '10px' }}>
                            <h5 className="text-center mb-3">
                                <span>Notes</span>
                            </h5>
                            <ul className="list-group mb-3">
                                <div className='notes' style={{ marginLeft: '50px' }}>
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

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="duration" className="form-label">Duration</b>
                                                <p style={{ color: 'red', fontWeight: 'bold' }}>{moment(order.duration).format('YYYY-MM-DD  HH:mm:ss')}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="duration" className="form-label">Date created:</b>
                                                <p>{moment(order.created_at).format('YYYY-MM-DD  HH:mm:ss')}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="cc-genre">Genre</b>
                                                <p>{order.genre}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="cc-link">Link</b>
                                                <p>{order.audio_link}</p>
                                            </div>
                                        </div>



                                        {docxFile && (
                                            <div className="mb-3 file-download">
                                                <b>Download DOCX File:</b>
                                                <a
                                                    href={generateBlobUrl(new Uint8Array(docxFile.data).buffer, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}
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
                                        {videoFile && (
                                            <video controls width="400" height="300">
                                                <source src={generateBlobUrl(new Uint8Array(videoFile.data).buffer, 'video/*')} type="video/mp4" />
                                            </video>
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
            }
        </>
    );
}

export default ViewOrderCustomer;
