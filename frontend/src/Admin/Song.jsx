import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
function Song() {
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
        <div className="px-2 py-5">

            <div>
                <h3 className="pd-bottom">List song</h3>
            </div>
            <Link to="/createSong" className="btn btn-success">ADD</Link>
            <div className='mt-4'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name song</th>
                            <th>Song lyrics</th>
                            <th>Time</th>
                            <th>Year</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((song, index) => {
                            return <tr key={index}>
                                <td>{song.id}</td>
                                <td>{song.name}</td>
                                <td>{
                                    <img src={`http://localhost:8081/images/` + song.image} alt="" className='song_image' />
                                }</td>
                                <td>{song.time}</td>
                                <td>{song.year}</td>
                                <td>
                                    <Link to={`/viewSong/` + song.id} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                    {/* <Link to={`/editSong/` + song.id} className='btn btn-primary btn-sm me-2'>Edit</Link> */}
                                    <button onClick={e => handleDelete(song.id)} className='btn btn-sm btn-danger'><DeleteIcon /></button>

                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Song;