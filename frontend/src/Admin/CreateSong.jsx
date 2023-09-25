import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
function CreateSong() {
    const [data, setData] = useState({
        name: '',
        time: '',
        image: '',
        year: '',
        lyric: '',
    })
    const navigate = useNavigate()


    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + showDate.getMonth() + '-' + showDate.getDate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("time", data.time);
        formData.append("dateYear", data.year);
        formData.append("image", data.image);
        formData.append("lyric", data.lyric);

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
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Date:</label>
                    <br />
                    <input type="text" className="form-control" value={displaytodaysdate} aria-readonly={true}
                        onChange={e => setData({ ...data, time: e.target.value })} />
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">Select Image</label>
                    <input type="file"
                        onChange={e => setData({ ...data, image: e.target.files[0] })} />
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