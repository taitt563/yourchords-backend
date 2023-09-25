import { Link, Outlet } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
function Dashboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
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
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(
                navigate('/start')
            ).catch(err => console.log(err));
    }
    return (

        <div className="container-fluid"  >
            <div className="row flex-nowrap" >
                <div className=" col-auto col-md-3 col-xl-2 px-sm-2 px-0 tabLeft">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100  ">
                        {data.map((profile, index) => {
                            return <div key={index}>
                                <Link to={`/profile/` + profile.id} className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                    {
                                        <img src={`http://localhost:8081/images/` + profile.image} alt="" className='profile_image' />
                                    }

                                    <span className="fs-100 fw-bolder  font pd-left" >{profile.name}</span>
                                </Link>
                                <span className="fs-100  font pd-left">Email:  <b>{profile.email}</b></span>
                                <br />
                                <span type="text" className='fs-100  font pd-left' aria-readonly={true}>Date current: <b>{displaytodaysdate}</b> </span>
                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    <li className='pd-top'>
                                        <Link to="/manageAccount" className="nav-link px-0 align-middle text-dark">
                                            <i className="fs-4"><ManageAccountsIcon color="primary" /></i> <span className="ms-1 d-none d-sm-inline">Manage Account</span></Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link to="/Song" className="nav-link px-0 align-middle text-dark">
                                            <i className="fs-4"><QueueMusicIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> Manage Song</span></Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link to="/feedback" className="nav-link px-0 align-middle text-dark">
                                            <i className="fs-4"><ThumbUpAltIcon color="primary" /></i> <span className="ms-1 d-none d-sm-inline" >View Feedback</span> </Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link to={`/profile/` + profile.id} className="nav-link px-0 align-middle text-dark">
                                            <i className="fs-4"><ModeIcon color="primary" /></i>  <span className="ms-1 d-none d-sm-inline">Edit profile</span></Link>
                                    </li>
                                    <li className='pd-top' onClick={handleLogout}>
                                        <Link className="nav-link px-0 align-middle text-dark">
                                            <i className="fs-4"><LogoutIcon color="primary" /></i> <span className="ms-1 d-none d-sm-inline">Logout</span></Link>
                                    </li>
                                </ul>
                            </div>
                        })}
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className='p-1 d-flex justify-content-center shadow'>
                        <h2>YOUR CHORD (ADMIN)</h2>
                    </div>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Dashboard