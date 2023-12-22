import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';

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
        setIsDataChanged(true);
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
            <div className="container payment-container" style={{ width: '1200px' }}>
                <div className="py-4 text-center">
                    <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Edit Song</h2>
                </div>
                <div className="row">
                    <div className="col-md-10 order-md-1 mx-auto">
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-3">
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
                            </div>
                            <div className="row">
                                <div className="mb-3">
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
                            </div>
                            <div className="row">
                                <div className="mb-3">
                                    <label className="form-label">Date:</label>
                                    <br />
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={displaytodaysdate}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <b htmlFor="lyric">Lyric</b>
                                <div className="input-group">
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
                                    <div className="invalid-feedback">
                                        Lyric is required.
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-3" />
                            <div className="d-flex justify-content-between">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditSongMusician;
