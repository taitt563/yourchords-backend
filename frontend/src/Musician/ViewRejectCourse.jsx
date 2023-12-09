import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
import YouTube from 'react-youtube';
import { Link } from '@mui/material';

function ViewRejectCourse() {
    const [requestData, setRequestData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const [videoFile, setVideoFile] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [videoFileName, setVideoFileName] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({
        course_name: '',
        link: '',
        videoFile: null, // Added field for the selected video file
    });

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
                    setEditedData({
                        course_name: order.course_name,
                        link: order.link,
                    });
                }
            } catch (error) {
                console.error('Error fetching request data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [apiUrl, userId, id]);

    const handleClose = () => {
        navigate(`/rejectCourse/${userId}`);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('course_name', editedData.course_name);
            if (editedData.videoFile) {
                formData.append('videoFile', editedData.videoFile);
            }

            const response = await axios.put(`${apiUrl}/updateCourse/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.Status === 'Success') {
                window.location.reload();
            } else {
                alert('Error updating course');
            }
        } catch (error) {
            console.error('Error updating course:', error.message);
            alert('Error updating course');
        }
    };




    const handleCancelEdit = () => {
        setEditMode(false);
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'videoFile') {
            setEditedData({
                ...editedData,
                videoFile: e.target.files[0],
            });
            setVideoFileName(e.target.files[0]?.name);
        } else {
            setEditedData({
                ...editedData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const generateBlobUrl = (data, mimeType) => {
        const blob = new Blob([data], { type: mimeType });
        return URL.createObjectURL(blob);
    };
    const getYouTubeVideoId = (url) => {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        return videoIdMatch ? videoIdMatch[1] : null;
    };
    const handleVideoChange = (e) => {
        setEditedData({
            ...editedData,
            videoFile: e.target.files[0],
        });
        setVideoFileName(e.target.files[0]?.name);
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
                                        <p style={{ marginLeft: '100px' }}>{editMode ? (
                                            <input
                                                type="text"
                                                name="course_name"
                                                value={editedData.course_name}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            order.course_name
                                        )}</p>
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
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="link"
                                                value={editedData.link}
                                                onChange={handleInputChange}
                                                style={{ marginLeft: '100px', width: '80%', padding: '8px' }}
                                            />
                                        ) : (
                                            <Link href={editMode ? editedData.link : order.link} style={{ marginLeft: '100px' }} underline='hover'>
                                                {editMode ? editedData.link.substring(0, 40) : order.link.substring(0, 40)}...
                                            </Link>
                                        )}
                                    </div>
                                    <div className="col-md-6 text-end pe-4">
                                        <b htmlFor="duration" className="form-label text-start" style={{ marginRight: '100px' }}>Date created:</b>
                                        <p style={{ marginRight: '100px' }}>{moment(order.upload_date).format('YYYY-MM-DD  HH:mm:ss')}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3 d-flex justify-content-center">
                                        {getYouTubeVideoId(editMode ? editedData.link : order.link) && (
                                            <YouTube
                                                videoId={getYouTubeVideoId(editMode ? editedData.link : order.link)}
                                                opts={{
                                                    // origin: 'http://localhost:5173',
                                                    playerVars: {
                                                        modestbranding: 1,
                                                    },
                                                    host: 'https://www.youtube-nocookie.com',
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3 d-flex justify-content-center">
                                        {videoFile && (
                                            <video controls width="640" height="400">
                                                <source src={generateBlobUrl(new Uint8Array(videoFile.data).buffer, 'video/*')} type="video/mp4" />
                                            </video>
                                        )}
                                    </div>
                                    <div className="col-md-12 mb-3 d-flex justify-content-center">

                                        {editMode && (
                                            <div className="mb-3 file-upload">
                                                <label htmlFor="videoFile" className="file-upload-label">
                                                    Upload Video
                                                    <div className="upload-container">
                                                        <input
                                                            type="file"
                                                            id="videoFile"
                                                            accept="video/*"
                                                            onChange={handleVideoChange}
                                                            required
                                                        />
                                                        <span className="upload-icon">&#x1F4F7;</span>
                                                        <span className="upload-text">{videoFileName ? videoFileName : 'Choose a file...'}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <div className="d-flex justify-content-between">
                                    {editMode ? (
                                        <div className="d-flex">
                                            <button className="btn btn-primary mr-2" onClick={handleSave}>
                                                Save
                                            </button>
                                            <button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-primary" onClick={handleEdit}>
                                            Edit
                                        </button>
                                    )}
                                    <button className="btn btn-primary" onClick={handleClose}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default ViewRejectCourse;
