import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import moment from 'moment'
import SearchAppBar from "../component/SearchAppBar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function VerifySong() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/getSongChordManager')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                    console.log(res.data.Result)
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    const handleVerify = (id) => {
        axios.put('http://localhost:8081/verifySong/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <SearchAppBar />
            <div className="px-2 py-5">

                <div>
                    <h3 className="d-flex flex-column align-items-center pt-4">List song</h3>
                </div>
                <div className='mt-4' style={{ height: '1000px', overflowY: 'scroll' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name song</th>
                                <th>Link</th>
                                <th><CalendarMonthIcon /> Date create</th>
                                <th><CalendarMonthIcon /> Date updated</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((song, index) => {
                                return <tr key={index}>
                                    <td>{
                                        <img src={`http://localhost:8081/images/` + song.thumnail} alt="" className='song_image' />
                                    }</td>
                                    <td>{song.song_title}</td>
                                    {song.link != null ?
                                        <td><Link to={song.link}>{song.link}</Link></td>
                                        : <td className="text-warning">Updating...</td>

                                    }
                                    <td>{moment(song.created_at).format('YYYY/MM/DD - HH:mm:ss')}</td>
                                    {song.updated_at != null ?
                                        <td>{moment(song.updated_at).format('YYYY/MM/DD - HH:mm:ss')}</td>
                                        : <td>Not update</td>
                                    }
                                    {song.status === 0 &&
                                        <td className="text-warning"><b>Waiting approve</b></td>
                                    }
                                    <td>
                                        <Link to={`/viewSongChordManager/` + song.song_title} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                        {/* <Link to={`/editSong/` + song.id} className='btn btn-primary btn-sm me-2'>Edit</Link> */}
                                        <button onClick={() => handleVerify(song.id)} className='btn btn-sm btn-success'>Approve</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                {/* <Link to="/createSong" className="btn btn-primary">ADD</Link> */}

            </div>
        </>
    )
}
export default VerifySong;