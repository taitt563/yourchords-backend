import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import YouTube from 'react-youtube';

function ManageCourse() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [videoFileName, setVideoFileName] = useState(null);
    const [openErrorVideo, setOpenErrorVideo] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [link, setLink] = useState('');

    const navigate = useNavigate();

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        try {
            if (file && file.type.startsWith('video/')) {
                setVideoFile(file);
                setVideoFileName(file.name);
            } else {
                setOpenErrorVideo(true);
                setTimeout(() => {
                    setOpenErrorVideo(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error handling video file:', error);
        }
    };

    const handleSubmitOrder = async () => {
        try {
            setIsSubmitting(true);
            if (!getYouTubeVideoId(link)) {
                setOpenErrorVideo(true);
                return;
            }

            const formData = new FormData();
            formData.append('videoFile', videoFile);
            formData.append('course_name', courseName);
            formData.append('link', link);

            const updateResponse = await axios.post(`${apiUrl}/uploadCourse/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (updateResponse.data.Status === 'Success') {
                console.log('Upload successfully');
            } else {
                console.error('Failed to upload video');
            }
        } catch (error) {
            console.error('Error upload submit:', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    const getYouTubeVideoId = (url) => {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        return videoIdMatch ? videoIdMatch[1] : null;
    };
    return (
        <>
            <SearchAppBar />
            <div className="container payment-container" style={{ width: '1200px' }}>
                {openErrorVideo && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            Invalid file type. Please upload a video.
                        </Alert>
                    </Stack>
                )}
                <div className="py-4 text-center">
                    <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Upload your course</h2>
                </div>
                <div className="row">
                    <div className="col-md-8 mx-auto">
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
                                    <span className="upload-text">{videoFile ? videoFileName : 'Choose a file...'}</span>
                                </div>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="courseName" className="form-label">Course Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="courseName"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="courseName" className="form-label">Link youtube</label>
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </div>
                        {videoFile && (
                            <video controls width="400" height="300">
                                <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                            </video>
                        )}
                        {getYouTubeVideoId(link) && (
                            <YouTube
                                videoId={getYouTubeVideoId(link)}
                                opts={{
                                    origin: 'https://www.youtube.com',
                                    playerVars: {
                                        autoplay: 1,
                                        modestbranding: 1,
                                    },
                                }}
                            />
                        )}
                        <hr className="mb-4" />
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={handleSubmitOrder}>
                                {isSubmitting ? 'Submitting...' : 'Submit Video'}
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate("/orderMusician")}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageCourse;
