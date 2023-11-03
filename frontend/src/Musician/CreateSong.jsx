import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function CreateSong() {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const [data, setData] = useState({
        song_title: '',
        lyrics: '',
        link: '',
        thumbnail: null,
    });

    const steps = ['Song Title', 'Lyrics', 'Link', 'Thumbnail', 'Finish'];

    const isFormValid = () => {
        if (activeStep === 0) {
            return data.song_title !== '';
        } else if (activeStep === 1) {
            return data.lyrics !== '';
        } else if (activeStep === 2) {
            return data.link !== '';
        } else if (activeStep === 3) {
            return data.thumbnail !== null;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("song_title", data.song_title);
        formData.append("lyrics", data.lyrics);
        formData.append("thumbnail", data.thumbnail);
        formData.append("link", data.link);

        axios.post(`${apiUrl}/createSong`, formData)
            .then(() => navigate('/SongMusician'))
            .catch(err => console.log(err));
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
        navigate('/chordMissMusician');
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Song name:</label>
                        <TextField
                            required
                            id="outlined-required"
                            label="Song Name"
                            fullWidth
                            value={data.song_title}
                            onChange={(e) => setData({ ...data, song_title: e.target.value })}
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Song Lyrics:</label>
                        <TextField
                            id="standard-multiline-static"
                            label="Copy lyrics/chords and paste here"
                            multiline
                            maxRows={10}
                            fullWidth
                            value={data.lyrics}
                            onChange={(e) => setData({ ...data, lyrics: e.target.value })}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Link youtube:</label>
                        <TextField
                            required
                            id="outlined-required"
                            label="Song Link"
                            fullWidth
                            value={data.link}
                            onChange={(e) => setData({ ...data, link: e.target.value })}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Select Image:</label>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            <input type="file" onChange={(e) => setData({ ...data, thumbnail: e.target.files[0] })} />
                        </Button>
                    </div>
                );
            case 4:
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
                <h3 className="d-flex justify-content-center">NEW SONG</h3>
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

export default CreateSong;
