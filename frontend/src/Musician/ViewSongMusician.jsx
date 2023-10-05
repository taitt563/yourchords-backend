import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBar from "../component/SearchAppBar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';
import ModeIcon from '@mui/icons-material/Mode';
// import Fab from '@mui/material/Fab';
// import FavoriteIcon from '@mui/icons-material/Favorite';
function ViewSongMusician() {
    const [data, setData] = useState([]);
    const { song_title } = useParams();
    const navigate = useNavigate();
    useEffect(() => {

        axios.get('http://localhost:8081/getSong/' + song_title, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);


                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(
                navigate('/songMusician')
            ).catch(err => console.log(err));
    }
    return (
        <>
            <SearchAppBar />

            <div className='d-flex flex-column align-items-center pt-5'>

                {data.map((viewSong, index) => {
                    return <div key={index}>
                        {/* <Fab aria-label="like" color='error'>
                            <FavoriteIcon />
                        </Fab> */}
                        <p className="fs-100  font pd-left" >STT: <b>{viewSong.id}</b></p>
                        <p className="fs-100  font pd-left" >Name: <b>{viewSong.song_title}</b></p>
                        <p className="fs-100  font pd-left" >Author:  <b>{viewSong.author}</b></p>
                        <p className='font fs-100 font pd-left'>Date: <b>{moment(viewSong.created_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                        <div className='d-flex flex-column align-items-center pt-4'>
                            <div className="container">
                                <div className="px-2 py-5">
                                    <div className="row">
                                        <div className="card">
                                            <div className="row">
                                                <div className="pd-left">
                                                    <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                                        {
                                                            <img src={`http://localhost:8081/images/` + viewSong.image} alt="" className='song_image_view' />
                                                        }
                                                        <div className="numbers pd-right">

                                                            <span className="  pd-left font" >Lyric: </span>

                                                            <p className="font"><strong>{viewSong.lyrics}</strong></p>
                                                            <i className="pd-left font"><ModeIcon /><span>Edit</span></i>

                                                        </div>


                                                    </a>

                                                </div>
                                                <div className="col-xs-7">


                                                </div>
                                            </div>
                                            <div className="footer">

                                                <hr />
                                                <div className="pd-bottom flex-column">

                                                    <i className="pd-left"><CheckCircleIcon color='success' /><span>Verified</span></i>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}




                <div className="col-12 d-flex flex-column align-items-center pt-4">
                    <button onClick={handleLogout} type="submit" className="btn btn-primary">Close</button>
                </div>
            </div>
        </>

    )
}
export default ViewSongMusician;