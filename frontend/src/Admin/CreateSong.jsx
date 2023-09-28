import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function CreateSong() {
    const [data, setData] = useState({
        name: '',
        time: '',
        image: '',
        year: '',
        lyric: '',
        author: '',
    })
    const navigate = useNavigate()


    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + showDate.getMonth() + '-' + showDate.getDate();
    // const VisuallyHiddenInput = styled('input')({
    //     clip: 'rect(0 0 0 0)',
    //     clipPath: 'inset(50%)',
    //     height: 1,
    //     overflow: 'hidden',
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     whiteSpace: 'nowrap',
    //     width: 1,
    //     color: 'dark'
    // });
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("time", data.time);
        formData.append("dateYear", data.year);
        formData.append("image", data.image);
        formData.append("lyric", data.lyric);
        formData.append("author", data.author);
        axios.post('http://localhost:8081/createSong', formData)
            .then(
                navigate('/Song')
            )
            .catch(err => console.log(err));
    }
    return (
        <div className='d-flex flex-column align-items-center pt-5'>
            <h2>New song</h2>
            <form className="row g-3 w-10" onSubmit={handleSubmit}>

                <div className="col-12">
                    <TextField
                        required
                        id="outlined-required"
                        label="Song name"
                        fullWidth
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </div>
                <div className="col-12">
                    <TextField
                        required
                        id="outlined-required"
                        label="Author"
                        fullWidth
                        onChange={e => setData({ ...data, author: e.target.value })}
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
                    {/* <input type="file"
                        onChange={e => setData({ ...data, image: e.target.files[0] })} /> */}
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        <input
                            type="file" onChange={e => setData({ ...data, image: e.target.files[0] })} />
                    </Button>
                </div>
                <section>

                    <div className="col-12">
                        <label className="form-label">Song Lyric and Chord:</label>
                        <TextField
                            id="standard-multiline-static"
                            label="Copy lyric and chord to paste here"
                            multiline
                            maxRows={100}
                            fullWidth
                            onChange={e => setData({ ...data, lyric: e.target.value })}
                        />

                    </div>
                </section>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}
export default CreateSong