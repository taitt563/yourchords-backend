import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
import YouTube from 'react-youtube';

function ViewRequestCourse() {
    const [requestData, setRequestData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const [videoFile, setVideoFile] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/requestCourse/${id}`);
                const order = response.data.data;

                if (order) {
                    setRequestData([order]);

                    setVideoFile(order.videoFile);
                }
            } catch (error) {
                console.error('Error fetching request data:', error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [apiUrl, userId]);


    const handleClose = () => {
        navigate(`/requestCourse/`)
    };


    const generateBlobUrl = (data, mimeType) => {
        const blob = new Blob([data], { type: mimeType });
        return URL.createObjectURL(blob);
    };
    const getYouTubeVideoId = (url) => {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        return videoIdMatch ? videoIdMatch[1] : null;
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
            ) : (
                <div className="container payment-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                    {requestData.map((order, index) => (
                        <div key={index} className="mb-4">
                            <div className="py-4 text-center">
                                <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Request Course</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-6 text-start pe-4">
                                    {/* Left side */}
                                    <div>
                                        <b htmlFor="title">Course name:</b>
                                        <p>{order.course_name}</p>
                                        <div style={{ paddingTop: '20px' }}>
                                            <b htmlFor="cc-link" className="text-start">Link YouTube:</b>
                                            <br />
                                            <Link to={order.link} style={{ textDecoration: 'none' }}>{order.link.substring(0, 50)}...</Link>
                                        </div>
                                        <br />
                                        <div style={{ marginTop: '10px' }}>
                                            <b htmlFor="duration" className="form-label text-start">Date created:</b>
                                            <p>{moment(order.upload_date).format('YYYY-MM-DD  HH:mm:ss')}</p>
                                        </div>
                                        <div style={{ paddingTop: '20px' }}>
                                            <b htmlFor="duration" className="form-label">Poster / Uploader:</b>
                                            <p>{order.userId}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 text-end">
                                    {getYouTubeVideoId(order.link) && (
                                        <YouTube
                                            videoId={getYouTubeVideoId(order.link)}
                                            opts={{
                                                playerVars: {
                                                    modestbranding: 1,
                                                },
                                                width: '100%',
                                                host: 'https://www.youtube-nocookie.com',
                                            }}
                                        />
                                    )}

                                    {videoFile && (
                                        <video controls width="100%" height="400">
                                            <source
                                                src={generateBlobUrl(new Uint8Array(videoFile.data).buffer, 'video/*')}
                                                type="video/mp4"
                                            />
                                        </video>
                                    )}
                                </div>
                            </div>
                            <hr className="mb-3" />
                            <button className="btn btn-primary" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default ViewRequestCourse;