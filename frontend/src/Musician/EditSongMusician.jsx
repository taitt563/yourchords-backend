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
    const [isDataChanged, setIsDataChanged] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { id } = useParams();
    let time = new Date();
    let displaytodaysdate =
        time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    useEffect(() => {
        axios
            .get(`${apiUrl}/getSong/` + id)
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
        setIsDataChanged(true); // Cập nhật trạng thái sự thay đổi
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isDataChanged) {
            axios
                .put(`${apiUrl}/updateSong/` + id, data)
                .then((res) => {
                    if (res.data.Status === 'Success') {
                        navigate(-1);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert("Update without changes");
        }
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
                            name="song_title"
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
                            name="link"
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
                                        name="lyrics"
                                        onChange={handleInputChange}
                                        value={data.lyrics}
                                        style={{ width: '100%' }}
                                    >
                                        {data.lyrics}
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
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
