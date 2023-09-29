import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBar from "../component/SearchAppBar";

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
        <>
            <SearchAppBar />

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
        </>

    )
}
export default ViewSong;