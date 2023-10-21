// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import DeleteIcon from '@mui/icons-material/Delete';
// import moment from 'moment'
// import SearchAppBar from "../component/SearchAppBar";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// function SongMusician() {
//     const [data, setData] = useState([])
//     useEffect(() => {
//         axios.get('http://localhost:8081/getSong')
//             .then(res => {
//                 if (res.data.Status === "Success") {
//                     setData(res.data.Result);
//                 } else {
//                     alert("Error")
//                 }
//             })
//             .catch(err => console.log(err));
//     }, [])
//     const handleDelete = (id) => {
//         axios.delete('http://localhost:8081/delete/' + id)
//             .then(res => {
//                 if (res.data.Status === "Success") {
//                     window.location.reload(true);
//                 }
//             })
//             .catch(err => console.log(err));
//     }
//     return (
//         <>
//             <SearchAppBar />
//             <div className="px-2 py-5">

//                 <div>
//                     <h3 className="d-flex flex-column align-items-center pt-4">List song</h3>
//                 </div>
//                 {/* <Link to="/createSong" className="btn btn-primary">ADD</Link> */}

//                 <div className='mt-4 pd-left' style={{ height: '450px', overflowY: 'scroll' }}>
//                     <table className='table'>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th></th>
//                                 <th>Name song</th>
//                                 <th>Link</th>
//                                 <th><CalendarMonthIcon color="primary" /> Date created</th>
//                                 <th><CalendarMonthIcon color="primary" /> Date updated</th>
//                                 <th>Status</th>
//                                 <th>Option</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((song, index) => {
//                                 let dataChord = song.lyrics;
//                                 dataChord = dataChord.replace(/.+/g, "<section>$&</section>");
//                                 let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, "<strong>$<chord></strong>");
//                                 let hasChords = songChord.includes('<strong>');

//                                 return (
//                                     <tr key={index}>
//                                         <td>{song.id}</td>
//                                         <td>
//                                             {<img src={`http://localhost:8081/images/` + song.thumbnail} alt="" className='song_image' />}
//                                         </td>
//                                         <td>
//                                             {song.song_title.length > 30 ?
//                                                 <b>{song.song_title.substring(0, 20)}...</b> :
//                                                 <b>{song.song_title} </b>
//                                             }
//                                         </td>
//                                         {song.link != null ?
//                                             <td><Link to={song.link}>{song.link.substring(0, 30)}...</Link></td> :
//                                             <td>Updating...</td>
//                                         }
//                                         <td>{moment(song.created_at).format('YYYY/MM/DD - HH:mm:ss')}</td>
//                                         {song.updated_at != null ?
//                                             <td>{moment(song.updated_at).format('YYYY/MM/DD - HH:mm:ss')}</td> :
//                                             <td>Not update</td>
//                                         }
//                                         {hasChords ? (
//                                             <td className="text-warning"><b>Waiting approve</b></td>
//                                         ) : (
//                                             <td style={{ color: 'green' }}>Missing Chord</td>
//                                         )}
//                                         <td>
//                                             <Link to={`/viewSongMusician/` + song.song_title} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
//                                             {song.status === 0 ?
//                                                 <Link onClick={() => handleDelete(song.id)} className='btn btn-sm btn-danger'><DeleteIcon /></Link> :
//                                                 ""
//                                             }
//                                         </td>
//                                     </tr>
//                                 );
//                             })}

//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default SongMusician;


import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import SearchAppBar from "../component/SearchAppBar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function SongMusician() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/getSong')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/' + id)
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
                {/* <Link to="/createSong" className="btn btn-primary">ADD</Link> */}

                <div className='mt-4 pd-left' style={{ height: '450px', overflowY: 'scroll' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th></th>
                                <th>Name song</th>
                                <th>Link</th>
                                <th><CalendarMonthIcon color="primary" /> Date created</th>
                                <th><CalendarMonthIcon color="primary" /> Date updated</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .filter(song => {
                                    let dataChord = song.lyrics;
                                    dataChord = dataChord.replace(/.+/g, "<section>$&</section>");
                                    let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, "<strong>$<chord></strong>");
                                    return !songChord.includes('<strong>');
                                })
                                .map((song, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{song.id}</td>
                                            <td>
                                                {<img src={`http://localhost:8081/images/` + song.thumbnail} alt="" className='song_image' />}
                                            </td>
                                            <td>
                                                {song.song_title.length > 30 ?
                                                    <b>{song.song_title.substring(0, 20)}...</b> :
                                                    <b>{song.song_title} </b>
                                                }
                                            </td>
                                            {song.link != null ?
                                                <td><Link to={song.link}>{song.link.substring(0, 30)}...</Link></td> :
                                                <td>Updating...</td>
                                            }
                                            <td>{moment(song.created_at).format('YYYY/MM/DD - HH:mm:ss')}</td>
                                            {song.updated_at != null ?
                                                <td>{moment(song.updated_at).format('YYYY/MM/DD - HH:mm:ss')}</td> :
                                                <td>Not update</td>
                                            }
                                            <td className="text-warning"><b>Missing Chord</b></td>
                                            <td>
                                                <Link to={`/viewSongMusician/` + song.song_title} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                                {song.status === 0 ?
                                                    <Link onClick={() => handleDelete(song.id)} className='btn btn-sm btn-danger'><DeleteIcon /></Link> :
                                                    ""
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default SongMusician;