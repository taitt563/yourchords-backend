import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
// import Tesseract from 'tesseract.js'

function ViewSong() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {

        axios.get('http://localhost:8081/getSong/' + id, data)
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
        <div className='d-flex flex-column align-items-center pt-5'>
            {data.map((viewSong, index) => {
                return <div key={index}>
                    <span className="d-flex flex-column align-items-center pt-5 " ><b>{viewSong.name}</b></span>
                    <span className="d-flex  align-items-center pt-5 " >Author: <b>{viewSong.author}</b></span>


                    <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                        {
                            <img src={`http://localhost:8081/images/` + viewSong.image} alt="" className='song_image_view ' />

                        }
                        {/* <div className="top-element-formatting">
                            <p className="second-word-formatting font">{viewSong.lyric}</p>
                        </div> */}
                        <p className="font pd-left-lyric">{viewSong.lyric}</p>
                    </a>

                </div>

            })}


            <div className="col-12 d-flex flex-column align-items-center pt-4">
                <button onClick={handleLogout} type="submit" className="btn btn-primary">Close</button>
            </div>
        </div>
        // <div className="px-2 py-5">

        //     <div>
        //         <h3 className="pd-bottom">List song</h3>
        //     </div>
        //     <Link to="/createSong" className="btn btn-success">ADD</Link>
        //     <div className='mt-4'>
        //         <table className='table'>
        //             <thead>
        //                 <tr>
        //                     <th>STT</th>
        //                     <th>Name song</th>
        //                     <th>Song lyrics</th>
        //                     <th>Time</th>
        //                     <th>Year</th>
        //                     <th>Option</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {data.map((song, index) => {
        //                     return <tr key={index}>
        //                         <td>{song.id}</td>
        //                         <td>{song.name}</td>
        //                         <td>{
        //                             <img src={`http://localhost:8081/images/` + song.image} alt="" className='song_image' />
        //                         }</td>
        //                         <td>{song.time}</td>
        //                         <td>{song.year}</td>
        //                         <td>
        //                             <Link to={`/viewSong/` + song.id} className='btn btn-success btn-sm me-2'>View</Link>
        //                             <Link to={`/editSong/` + song.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
        //                             <button onClick={e => handleDelete(song.id)} className='btn btn-sm btn-danger'>Delete</button>

        //                         </td>
        //                     </tr>
        //                 })}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>

    )
}
export default ViewSong;