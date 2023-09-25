
import axios from 'axios';
import { useState, useEffect } from 'react';

function ViewFeedback() {
    const [data, setData] = useState([])
    const [values, setValues] = useState({
        userFeedback: '',
    })
    // const navigate = useNavigate()

    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + showDate.getMonth() + '-' + showDate.getDate();
    useEffect(() => {
        axios.get('http://localhost:8081/getProfile')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);

                } else {
                    alert("Error")
                }
            })

            .catch(err => console.log(err));
    }, [])


    return (
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
                    </div>
                })}
                <div className="col-12">
                    <label className="form-label">Comment: {displaytodaysdate}</label>
                    <br />
                    <input type="text" className="form-control"
                        onChange={e => setValues({ ...data, date: e.target.value })} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default ViewFeedback