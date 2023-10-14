
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAppBar from '../component/SearchAppBar';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function ViewFeedback() {
    const [data, setData] = useState([])

    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/viewFeedback/' + username)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);

                }
            })

            .catch(err => console.log(err));
    }, [])
    // const handleClose = (event) => {
    //     event.preventDefault();
    //     navigate("/manageFeedback")
    // }
    const handleSeenfeedback = (username) => {
        axios.put('http://localhost:8081/viewSeenFeedback/' + username)
            .then(
                navigate('/manageFeedback')
            ).catch(err => console.log(err));
    }
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>
                <h3 className="d-flex justify-content-center">FEEDBACK</h3>

                {data.map((userFeedback, index) => {
                    return <div key={index}>
                        <div className='d-flex flex-column align-items-center pt-4'>
                            <div className="container">
                                <div className="px-2 py-5">
                                    <div className="row">
                                        <div className="card">
                                            <div className="row">
                                                <div className="pd-left">
                                                    <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                                        {
                                                            <img src={`http://localhost:8081/images/` + userFeedback.image} alt="" className='profile_image' />
                                                        }
                                                        <span className="fs-100 fw-bolder  font pd-left" >Name: {userFeedback.username}</span>
                                                        <span className="fs-100 fw-bolder  font pd-left" >Email: {userFeedback.email}</span>

                                                        <p className='font'>Date: <b>{moment(userFeedback.date).format('YYYY-MM-DD')}</b></p>

                                                    </a>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div className="numbers pd-right">
                                                        <ThumbUpAltIcon className='pd-left' fontSize="large" color='success' /><p><strong>{userFeedback.comment}</strong></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <hr />
                                                <div className="pd-bottom">
                                                    <i className="pd-left"><CheckCircleIcon color='success' /></i>
                                                    Seen
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button onClick={() => handleSeenfeedback(userFeedback.username)} type="submit" className="btn btn-primary">Close</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </>
    )
}
export default ViewFeedback