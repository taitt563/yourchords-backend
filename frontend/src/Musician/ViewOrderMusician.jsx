import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function ViewOrderMusician() {
    const [orderData, setOrderData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const { id } = useParams();
    const [docxFile, setDocxFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [openErrorDocx, setOpenErrorDocx] = useState(false);
    const [openErrorImage, setOpenErrorImage] = useState(false);
    const [docxFileName, setDocxFileName] = useState(null);
    const [imageFileName, setImageFileName] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormReadOnly, setIsFormReadOnly] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [videoFileName, setVideoFileName] = useState(null);
    const [openErrorVideo, setOpenErrorVideo] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        collection_name: '',
        image: null,
        imageSource: null,
    });
    const navigate = useNavigate();


    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`${apiUrl}/getOrderMusician/${id}`);
                const orders = response.data.data;

                if (orders && Array.isArray(orders)) {
                    setOrderData(orders);
                    setIsFormReadOnly(isExpired(orders[0]));
                }
                if (orders) {
                    setOrderData([orders]);
                    setIsFormReadOnly(isExpired(orders));
                    setDocxFile(orders.docxFile);
                    setImageFile(orders.imageFile);
                    setVideoFile(orders.videoFile);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [apiUrl, userId, id]);

    const handleDocxFileChange = (event) => {
        const file = event.target.files[0];
        if (!isFormReadOnly) {
            if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setDocxFile(file);
                setDocxFileName(file.name);
            } else {
                setOpenErrorDocx(true);
                setTimeout(() => {
                    setOpenErrorDocx(false);
                }, 3000);
            }
        }
    };
    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (!isFormReadOnly) {
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
        }
    };


    const handleSubmitorder = async () => {
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append('videoFile', videoFile);
            formData.append('docxFile', docxFile);
            if (imageFile && data.image) {
                formData.append('image', data.image);
            }

            const updateResponse = await axios.put(`${apiUrl}/submitOrder/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (updateResponse.data.Status === 'Success') {
                navigate("/orderMusicianAccept/" + userId)
            } else {
                console.error('Failed to submit order');
            }
        } catch (error) {
            console.error('Error submitting order:', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!isFormReadOnly) {
            try {
                if (file && file.type.startsWith('image/')) {
                    const base64Image = await convertImageToBase64(file);
                    const imageSource = `${base64Image}`;
                    setData({ ...data, image: imageSource, imageSource });
                    setImageFile(file);
                    setImageFileName(file.name);
                } else {
                    setOpenErrorImage(true);
                    setTimeout(() => {
                        setOpenErrorImage(false);
                    }, 3000);
                }
            } catch (error) {
                console.error('Error converting image to Base64:', error);
            }
        }
    }
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
                    {openErrorDocx && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">
                                Invalid file type. Please upload a DOCX file or an image.
                            </Alert>
                        </Stack>
                    )}
                    {openErrorVideo && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">
                                Invalid file type. Please upload a video.
                            </Alert>
                        </Stack>
                    )}
                    {openErrorImage && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">
                                Invalid file type. Please upload an Image.
                            </Alert>
                        </Stack>
                    )}
                    <div className="py-4 text-center">
                        <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Order</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4" style={{ backgroundColor: "#EFFBEF", height: 'fit-content', width: '350px', padding: '10px' }}>
                            <h5 className="text-center mb-3">
                                <span>Guidelines for Musicians</span>
                            </h5>
                            <ul className="list-group mb-3">
                                <div className='notes' style={{ marginLeft: '50px' }}>
                                    <li>Songs should not be duplicated.</li>
                                    <li>Ensure that the beat requester has provided complete information such as the song title or lyrics.</li>
                                    <li>Write in English or Vietnamese with accents.</li>
                                    <li>Do not post songs with reactionary or sensitive content that violates Vietnamese cultural traditions.</li>
                                    <li>For Musicians: Ensure that the uploaded DOCX file contains the complete sheet music along with relevant details.</li>
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
                                                {isExpired(order) && order.status !== 3 ?
                                                    <p style={{ color: 'red', fontWeight: 'bold' }}>{moment(order.duration).format('YYYY-MM-DD')}</p>
                                                    :
                                                    <p style={{ color: 'green', fontWeight: 'bold' }}>{moment(order.duration).format('YYYY-MM-DD')}</p>
                                                }
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
                                        {docxFile && order.status === 3 && (
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
                                        {imageFile && order.status === 3 && (
                                            <div className="mb-3 file-download">
                                                <b>Download Image:</b>
                                                <a href={`data:image/png;base64,${imageFile}`} download="image.png">
                                                    Download Image
                                                </a>
                                            </div>
                                        )}
                                        {videoFile && order.status === 3 && (
                                            <video controls width="400" height="300">
                                                <source src={generateBlobUrl(new Uint8Array(videoFile.data).buffer, 'video/*')} type="video/mp4" />
                                            </video>
                                        )}
                                        {order.status === 2 && (
                                            <>
                                                <div className="mb-3 file-upload">
                                                    <label htmlFor="docxFile" className="file-upload-label">
                                                        Upload DOCX File
                                                        <div className="upload-container">
                                                            <input
                                                                type="file"
                                                                id="docxFile"
                                                                accept=".docx"
                                                                onChange={handleDocxFileChange}
                                                                disabled={isFormReadOnly}
                                                            />
                                                            <span className="upload-icon">&#x1F4C3;</span>
                                                            <span className="upload-text">{docxFile ? docxFileName : 'Choose a file...'}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="mb-3 file-upload">
                                                    <label htmlFor="videoFile" className="file-upload-label">
                                                        Upload Video
                                                        <div className="upload-container">
                                                            <input
                                                                type="file"
                                                                id="videoFile"
                                                                accept="video/*"
                                                                onChange={handleVideoChange}
                                                                disabled={isFormReadOnly}
                                                            />
                                                            <span className="upload-icon">&#x1F4F7;</span>
                                                            <span className="upload-text">{videoFile ? videoFileName : 'Choose a file...'}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="mb-3 file-upload">
                                                    <label htmlFor="imageFile" className="file-upload-label">
                                                        Upload Image
                                                        <div className="upload-container">
                                                            <input
                                                                type="file"
                                                                id="imageFile"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                                disabled={isFormReadOnly}
                                                            />
                                                            <span className="upload-icon">&#x1F4F7;</span>
                                                            <span className="upload-text">{imageFile ? imageFileName : 'Choose a file...'}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </>
                                        )
                                        }


                                        <hr className="mb-4" />
                                        <div className="d-flex justify-content-between">
                                            {isExpired(order) && order.status !== 3 ? (
                                                <button className="btn btn-danger" style={{ width: '1000px' }} onClick={() => navigate("/orderMusician")}>
                                                    Expired
                                                </button>
                                            ) : (
                                                <>
                                                    {order.status === 2 && (
                                                        <button className="btn btn-primary" onClick={handleSubmitorder} disabled={isSubmitting}>
                                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                                        </button>
                                                    )}
                                                    <button className="btn btn-primary" onClick={() => navigate("/orderMusician")}>
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
                </div>
            }
        </>
    );
}

export default ViewOrderMusician;
