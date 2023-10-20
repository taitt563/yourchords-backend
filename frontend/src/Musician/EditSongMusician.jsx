import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
import { Button } from '@mui/material';

function EditSongMusician() {
    const [data, setData] = useState({
        song_title: '',
        lyrics: '',
        link: '',
    });
    const navigate = useNavigate();

    const { song_title } = useParams();
    let time = new Date();
    let displaytodaysdate =
        time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    useEffect(() => {
        axios
            .get('http://localhost:8081/getSong/' + song_title)
            .then((res) => {
                setData({
                    ...data,
                    song_title: res.data.Result[0].song_title,
                    lyrics: res.data.Result[0].lyrics,
                    link: res.data.Result[0].link,
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put('http://localhost:8081/updateSong/' + song_title, data)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    navigate(-1);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <SearchAppBar />
            <div className="d-flex flex-column align-items-center pt-4">
                <h2>Song</h2>
                <form className="row g-3 w-50" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            name="song_title" // Add the name attribute
                            placeholder="Enter Name"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={data.song_title}
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Link: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            name="link" // Add the name attribute
                            placeholder="Enter Link"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={data.link}
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Date:</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            value={displaytodaysdate}
                            readOnly
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Lyrics: </label>
                        <div className="container">
                            <div className="row">
                                <div className="numbers pd-right">
                                    <textarea
                                        cols="80"
                                        rows="20"
                                        name="lyrics" // Add the name attribute
                                        onChange={handleInputChange} // Add onChange for textarea
                                        value={data.lyrics}
                                    >
                                        {data.lyrics}
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <Button
                            type="submit"
                            variant="contained"
                            className="btn btn-success"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditSongMusician;
