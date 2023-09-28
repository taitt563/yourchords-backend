import { Outlet } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from '@mui/material/Link';
import SearchAppBar from '../component/SearchAppBar';
import DashboardProfile from '../component/DashboardProfile';
function Dashboard() {
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;


    useEffect(() => {
        axios.get('http://localhost:8081/getProfile', data)
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

        <div className="container-fluid"  >
            <div className="row flex-nowrap" >
                <div className=" col-auto col-md-3 col-xl-2 px-sm-2 px-0 tabLeft">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100  ">
                        <DashboardProfile />
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className='pd-top'>
                                <Link href="/homeAdmin" underline="hover" className="nav-link px-0 align-middle">
                                    <i className="fs-4"><HomeIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> <b>HOME</b></span></Link>
                            </li>
                            <li className='pd-top'>
                                <Link href="/manageAccount" underline="hover" className="nav-link px-0 align-middle">
                                    <i className="fs-4"><ManageAccountsIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> <b>MANAGE ACCOUNT</b></span></Link>
                            </li>
                            <li className='pd-top'>
                                <Link href="/Song" underline="hover" className="nav-link px-0 align-middle">
                                    <i className="fs-4"><QueueMusicIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> <b>MANAGE SONG</b></span></Link>
                            </li>
                            <li className='pd-top'>
                                <Link href="/manageFeedback" underline="hover" className="nav-link px-0 align-middle">
                                    <i className="fs-4"><ThumbUpAltIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> <b>MANAGE FEEDBACK</b></span></Link>
                            </li>
                            <li className='pd-top'>
                                <Link href={"/profile"} underline="hover" className="nav-link px-0 align-middle">
                                    <i className="fs-4"><ModeIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> <b>EDIT PROFILE</b></span></Link>
                            </li>
                            <li className='pd-top'>
                                <Link href="/logInStart" underline="hover" className="nav-link px-0 align-middle ">
                                    <i className="fs-4"><LogoutIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline" > <b>LOGOUT</b></span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <SearchAppBar />
                    <div className='pd-top'>
                        <Outlet />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard