import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import SearchAppBar from '../component/SearchAppBar';

function Playlist() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { userId } = useParams();



    useEffect(() => {
        axios.get('http://localhost:8081/getPlaylist/' + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData([...res.data.Result]);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleCreate = () => {
        navigate('/createPlaylist/' + userId);
    };

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-4'>
                <h3 className="d-flex justify-content-center">PLAYLIST</h3>
            </div>
            <div className="d-flex flex-wrap justify-content-start">

                {data.map((playlist, index) => (
                    <div key={index} className="m-5 playlist-container ">
                        <div className="container rounded bg-white" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="d-flex flex-column align-items-center text-center ">



                                <div className="rounded-image-container">
                                    <img
                                        className="rounded-square-image"
                                        src={`http://localhost:8081/images/${playlist.image}`}
                                    />
                                    <div className="image-overlay">
                                        <p className="overlay-text">View Playlist</p>
                                    </div>
                                </div>

                                <b className="playlist-name">{playlist.collection_name}</b>
                            </div>
                        </div>

                    </div>

                ))}

            </div>
            <div className="m-5 playlist-container ">
                <div className="container rounded bg-white" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="d-flex flex-column align-items-center text-center ">

                        <div className='playlist-container-default'>
                            <AddIcon className="playlist-name" style={{ fontSize: 40 }} onClick={handleCreate} />
                            <br />
                            <b className="playlist-name" onClick={handleCreate}>Add New Playlist</b>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Playlist;
