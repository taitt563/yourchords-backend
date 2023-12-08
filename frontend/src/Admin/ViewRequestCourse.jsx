import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
import YouTube from 'react-youtube';
import { Link } from '@mui/material';

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
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
                :

                <div className="container payment-container" style={{ width: '1200px', height: 'fit-content' }}>
                    <div className="py-4 text-center">
                        <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Request Course</h2>
                    </div>
                    <div className="row">
                        {requestData.map((order, index) => (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-md-6 text-start pe-4">
                                        <b htmlFor="title" style={{ marginLeft: '100px' }}>Course name:</b>
                                        <p style={{ marginLeft: '100px' }}>{order.course_name}</p>
                                    </div>
                                    <div className="col-md-6 text-end pe-4">
                                        <b htmlFor="duration" className="form-label" style={{ marginRight: '100px' }}>Poster / Uploader:</b>
                                        <p style={{ marginRight: '100px' }}>{order.userId}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 text-start pe-4">
                                        <b htmlFor="cc-link" className="text-start" style={{ marginLeft: '100px' }}>Link youtube</b>
                                        <br />
                                        <Link href={order.link} style={{ marginLeft: '100px' }}>{order.link.substring(0, 30)}...</Link>
                                    </div>
                                    <div className="col-md-6 text-end pe-4">
                                        <b htmlFor="duration" className="form-label text-start" style={{ marginRight: '100px' }}>Date created:</b>
                                        <p style={{ marginRight: '100px' }}>{moment(order.upload_date).format('YYYY-MM-DD  HH:mm:ss')}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3 d-flex justify-content-center">
                                        {getYouTubeVideoId(order.link) && (
                                            <YouTube
                                                videoId={getYouTubeVideoId(order.link)}
                                                opts={{
                                                    origin: 'https://www.youtube.com',
                                                    playerVars: {
                                                        modestbranding: 1,
                                                    },
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3 d-flex justify-content-center">
                                        {videoFile && (
                                            <video controls width="650" height="400">
                                                <source src={generateBlobUrl(new Uint8Array(videoFile.data).buffer, 'video/*')} type="video/mp4" />
                                            </video>
                                        )}
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <div className="row">
                                    <div className="col-md-12 mb-3 d-flex justify-content-center">
                                        <button className="btn btn-primary" onClick={handleClose}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default ViewRequestCourse;
