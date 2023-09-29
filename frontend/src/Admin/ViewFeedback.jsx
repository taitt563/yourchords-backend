
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAppBar from '../component/SearchAppBar';
import { useParams } from 'react-router-dom';
import moment from 'moment'
function ViewFeedback() {
    const [data, setData] = useState([])

    const { username } = useParams();

    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + showDate.getMonth() + '-' + showDate.getDate();
    useEffect(() => {
        axios.get('http://localhost:8081/viewFeedback/' + username)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);

                }
            })

            .catch(err => console.log(err));
    }, [])


    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>
                <h2>Feedback</h2>
                <p>{displaytodaysdate}</p>
                <form className="row g-3 w-10">
                    {data.map((userFeedback, index) => {
                        return <div key={index}>
                            <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                {
                                    <img src={`http://localhost:8081/images/` + userFeedback.image} alt="" className='profile_image' />
                                }

                                <span className="fs-100 fw-bolder  font pd-left" >{userFeedback.name}</span>
                            </a>
                            <div className="col-12">
                                <label className="form-label">Date: {moment(userFeedback.date).format('YYYY-MM-DD')}</label>
                                <br />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Comment: {userFeedback.comment}</label>
                                <br />
                            </div>
                        </div>
                    })}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default ViewFeedback