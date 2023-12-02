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

    const handleDocxFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setDocxFile(file);
            setDocxFileName(file.name);
        } else {
            setOpenErrorDocx(true);
            setTimeout(() => {
                setOpenErrorDocx(false);
            }, 3000);
        }
    };

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImageFileName(file.name);
        } else {
            setOpenErrorImage(true);
            setTimeout(() => {
                setOpenErrorImage(false);
            }, 3000);
        }
    };

    const handleLyricChange = (event, index) => {
        const updatedOrderData = [...orderData];
        updatedOrderData[index].lyric = event.target.value;
        setOrderData(updatedOrderData);
    };
    return (
        <>
            <SearchAppBar />
            {openErrorDocx && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        Invalid file type. Please upload a DOCX file or an image.
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

            <div className="container">
                <div className="py-4 text-center">
                    <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Order</h2>
                </div>
                <div className="row">
                    <div className="col-md-4 order-md-2 " style={{ backgroundColor: "#EFFBEF", height: '270px' }}>
                        <h4 className="text-center mb-3">
                            <span>Notes</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <div className='notes' style={{ marginLeft: '50px' }}>
                                <li>Posts are not duplicated</li>
                                <li>Write the full name of the song</li>
                                <li>Type in English or Vietnamese with accents</li>
                                <li>Enter full lyrics and chords. Avoid using "similar", "as above"...</li>
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

                                    <div className="mb-3 file-upload">
                                        <label htmlFor="docxFile" className="file-upload-label">
                                            Upload DOCX File
                                            <div className="upload-container">
                                                <input
                                                    type="file"
                                                    id="docxFile"
                                                    accept=".docx"
                                                    onChange={handleDocxFileChange}
                                                />
                                                <span className="upload-icon">&#x1F4C3;</span>
                                                <span className="upload-text">{docxFile ? docxFileName : 'Choose a file...'}</span>
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
                                                    onChange={handleImageFileChange}
                                                />
                                                <span className="upload-icon">&#x1F4F7;</span>
                                                <span className="upload-text">{imageFile ? imageFileName : 'Choose a file...'}</span>
                                            </div>
                                        </label>
                                    </div>


                                    {docxFile && (
                                        <div className="mb-3 file-download">
                                            <b>Download DOCX File:</b>
                                            <a href={URL.createObjectURL(docxFile)} download={docxFileName}>
                                                {docxFileName}
                                            </a>
                                        </div>
                                    )}

                                    {imageFile && (
                                        <div className="mb-3 file-download">
                                            <b>Download Image:</b>
                                            <a href={URL.createObjectURL(imageFile)} download={imageFileName}>
                                                {imageFileName}
                                            </a>
                                        </div>
                                    )}

                                    <hr className="mb-4" />
                                    <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate("/orderMusician")}>Close</button>
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

export default ViewOrderMusician;
