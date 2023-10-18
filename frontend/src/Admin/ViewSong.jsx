import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBar from "../component/SearchAppBar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';

import moment from 'moment';
function ViewSong() {
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
                navigate('/Song')
            ).catch(err => console.log(err));
    }


    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>

                {data.map((viewSong, index) => {
                    let dataChord = viewSong.lyrics
                    dataChord = dataChord.replace(/.+/g, "<section>$&</section>")
                    let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, "<strong>$<chord></strong>");

                    return <div key={index}>
                        <h3 className="d-flex justify-content-center"><b>{viewSong.song_title}</b></h3>

                        <p className="fs-100  font pd-left pd-top" >ID: <b>{viewSong.id}</b></p>
                        <p className="fs-100  font pd-left" >Date created: <b>{moment(viewSong.created_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                        {viewSong.updated_at != null ?
                            <p className="fs-100  font pd-left" >Date updated: <b>{moment(viewSong.updated_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                            : <p className="fs-100  font pd-left" >Date updated: <b>Not update</b></p>
                        }
                        {viewSong.status === 0 &&
                            <p className="fs-100  font pd-left" >Status: <b>Awaiting approval</b></p>
                        }
                        <p className="fs-100  font pd-left" >Artist:  <b>{viewSong.author}</b></p>
                        {viewSong.link != null ?
                            <p className="fs-100  font pd-left" >Link:  <b><Link to={viewSong.link}>{viewSong.link}</Link></b></p>
                            : <p className="fs-100  font pd-left" >Link:  <b>Update...</b></p>

                        }
                        <div className='d-flex flex-column align-items-center pt-4'>
                            <div className="container">
                                <div className="px-2 py-5">
                                    <div className="row">
                                        <div className="card">
                                            <div className="row">
                                                <div className="pd-left">
                                                    <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                                        {
                                                            <img src={`http://localhost:8081/images/` + viewSong.thumnail} alt="" className='song_image_view' />
                                                        }
                                                        <div className="numbers pd-right">

                                                            {/* <p id="chord" className="font">{songChord}</p> */}
                                                            <div className="font"

                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                            />
                                                            <Button variant="contained" className='btn btn-success'><ModeIcon /> EDIT
                                                            </Button>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-xs-7">


                                                </div>
                                            </div>
                                            <div className="footer">

                                                <hr />
                                                <div className="pd-bottom flex-column">

                                                    <i className="pd-left"><CheckCircleIcon style={{ color: 'green' }} /><span style={{ color: 'green' }}>Verified</span></i>

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
                    <Button variant="contained" onClick={handleLogout} className='btn btn-success'>CLOSE
                    </Button>
                </div>
            </div>
        </>

    )
}
export default ViewSong;