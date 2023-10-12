
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import React from 'react';
import SearchAppBar from '../component/SearchAppBar';
function CreateSong() {
    const [data, setData] = useState({
        song_title: '',
        lyrics: '',
        link: '',
        thumnail: '',
    })
    const navigate = useNavigate()
    const steps = ['Song Title', 'Lyrics', 'Link', 'Thumnail', 'Finish'];


    // let showDate = new Date();
    // let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("song_title", data.song_title);
        formData.append("lyrics", data.lyrics);
        formData.append("thumnail", data.thumnail);
        formData.append("link", data.link);


        axios.post('http://localhost:8081/createSong', formData)
            .then(
                navigate('/SongMusician')
            )
            .catch(err => console.log(err));
    }
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleClose = () => {
        navigate('/songMusician')
    }

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>
                <h2>New song</h2>

                {/* <div className="col-12">
                <TextField
                    required
                    id="outlined-required"
                    label="Song name"
                    fullWidth
                    onChange={e => setData({ ...data, song_title: e.target.value })}
                />
            </div>
            <section>
                <div className="col-12">
                    <label className="form-label">Song Lyric:</label>
                    <TextField
                        id="standard-multiline-static"
                        label="Copy lyric and chord to paste here"
                        multiline
                        maxRows={100}
                        fullWidth
                        onChange={e => setData({ ...data, lyrics: e.target.value })}
                    />

                </div>
            </section>
            <div className="col-12">
                <TextField
                    id="outlined-required"
                    label="Link"
                    fullWidth
                    onChange={e => setData({ ...data, link: e.target.value })}
                />
            </div>

            <div className="col-12">
                <label className="form-label">Date:</label>
                <br />
                <input type="text" className="form-control" value={displaytodaysdate} />
            </div>
            <div className="col-12 mb-3">
                <label className="form-label">Select Image:</label>
                <br />
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    <input
                        type="file" onChange={e => setData({ ...data, thumnail: e.target.files[0] })} />
                </Button>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Create</button>
            </div> */}
                {/* </form> */}
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => {
                            const stepProps = {};
                            const labelProps = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleClose}>Close</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {activeStep == 0 && (
                                <div className='d-flex flex-column align-items-center pt-5'>

                                    <form className="row g-3 w-10">
                                        <div className="col-12">
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Song name"
                                                fullWidth
                                                onChange={e => setData({ ...data, song_title: e.target.value })}
                                            />
                                        </div>
                                    </form>
                                    <Box sx={{ display: 'flex' }}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 2 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    </Box>
                                </div>

                            )}
                            {activeStep == 1 && (
                                <div className='d-flex flex-column align-items-center pt-5'>

                                    <form className="row g-3 w-10">
                                        <div className="col-12">
                                            <label className="form-label">Song Lyric:</label>
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Copy lyric / chord to paste here"
                                                multiline
                                                maxRows={100}
                                                fullWidth
                                                onChange={e => setData({ ...data, lyrics: e.target.value })}
                                            />

                                        </div>
                                    </form>
                                    <Box sx={{ display: 'flex' }}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 2 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    </Box>
                                </div>
                            )}
                            {activeStep == 2 && (

                                <div className='d-flex flex-column align-items-center pt-5'>

                                    <form className="row g-3 w-10">
                                        <div className="col-12">
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Link"
                                                fullWidth
                                                onChange={e => setData({ ...data, link: e.target.value })}
                                            />
                                        </div>
                                    </form>
                                    <Box sx={{ display: 'flex' }}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 2 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    </Box>
                                </div>
                            )}
                            {activeStep == 3 && (
                                <div className='d-flex flex-column align-items-center pt-5'>
                                    <form className="row g-3 w-10">

                                        <div className="col-12 mb-3">
                                            <label className="form-label">Select Image:</label>
                                            <br />
                                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                                <input
                                                    type="file" onChange={e => setData({ ...data, thumnail: e.target.files[0] })} />
                                            </Button>
                                        </div>
                                    </form>
                                    <Box sx={{ display: 'flex' }}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 2 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    </Box>
                                </div>
                            )}
                            {activeStep == 4 && (
                                <div className='d-flex flex-column align-items-center pt-5'>
                                    <p>Create successfully !</p>

                                    <Box sx={{ display: 'flex' }}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 2 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Finish
                                        </Button>
                                    </Box>
                                </div>
                            )}

                        </React.Fragment>
                    )}
                </Box>
            </div>
        </>
    )
}
export default CreateSong