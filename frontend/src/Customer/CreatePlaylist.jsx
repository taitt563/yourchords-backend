


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import SearchAppBar from '../component/SearchAppBar';

function CreatePlaylist() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState({
        collection_name: '',
        image: null,
        imageSource: null,
    });
    const { userId } = useParams();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const steps = ['Playlist name:', 'Image', 'Finish'];

    const isFormValid = () => {
        if (activeStep === 0) {
            return data.collection_name !== '';
        } else if (activeStep === 1) {
            return data.image !== null;
        }
        return true;
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

        try {
            const base64Image = await convertImageToBase64(file);
            const imageSource = `${base64Image}`;
            setData({ ...data, image: imageSource, imageSource });
        } catch (error) {
            console.error('Error converting image to Base64:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('collection_name', data.collection_name);
        formData.append('image', data.image);

        axios.post(`${apiUrl}/createPlaylist/` + userId, formData)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    navigate('/playlist/' + userId);
                } else {
                    alert('Collection name is existed. Please try again!');
                }
            })
            .catch((err) => console.log(err));
    };

    const handleNext = () => {
        if (isFormValid()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClose = () => {
        navigate('/playlist');
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Playlist name:</label>
                        <TextField
                            required
                            id="outlined-required"
                            label="Playlist Name"
                            fullWidth
                            value={data.collection_name}
                            onChange={(e) => setData({ ...data, collection_name: e.target.value })}
                        />
                    </div>
                );


            case 1:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Select Image:</label>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            <input type="file" name="image" onChange={handleImageChange} />
                        </Button>
                        {/* {data.imageSource && <img src={data.imageSource} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />} */}
                    </div>
                );
            case 2:
                return (
                    <div className='d-flex flex-column align-items-center pt-5'>
                        <p>Create successfully !</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-4'>
                <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>New Playlist</h3>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center pt-5' style={{ minHeight: '60vh' }}>
                <div className='step-container'>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <div className='step-content'>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                        <Button variant="contained" onClick={handleClose} color="secondary">
                                            Close
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <div>
                                    {renderStepContent()}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 2 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    </Box>
                                </div>
                            )}
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default CreatePlaylist;
