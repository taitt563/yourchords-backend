import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBar from "../component/SearchAppBar";

function ViewAccount() {
    const [data, setData] = useState([]);
    const { username } = useParams();

    const navigate = useNavigate();
    useEffect(() => {

        axios.get('http://localhost:8081/getAccount/' + username, data)
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
                navigate('/manageAccount')
            ).catch(err => console.log(err));
    }
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>
                {data.map((viewAccount, index) => {
                    return <div key={index}>
                        <span className="d-flex flex-column align-items-center pt-5 " ><b>ID: {viewAccount.id}</b></span>
                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Email: {viewAccount.email}</b></span>
                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Role: {viewAccount.role}</b></span>
                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Active: {viewAccount.ban}</b></span>

                        <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">


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
export default ViewAccount;