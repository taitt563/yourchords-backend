
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function CreateSong() {
    const [data, setData] = useState({
        song_title: '',
        lyrics: '',
        link: '',
        thumnail: '',
    })
    const navigate = useNavigate()


    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
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
    return (
        <div className='d-flex flex-column align-items-center pt-5'>
            <h2>New song</h2>
            <form className="row g-3 w-10" onSubmit={handleSubmit}>
                {/* <div className="col-12">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" placeholder='Enter name song'
                        onChange={e => setData({ ...data, name: e.target.value })} />
                </div> */}
                <div className="col-12">
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
                    <input type="text" className="form-control" value={displaytodaysdate} aria-readonly={true}
                        onChange={e => setData({ ...data, time: e.target.value })} />
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
                </div>
            </form>
        </div>
    )
}
export default CreateSong