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
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SearchAppBar from '../component/SearchAppBar';
function Dashboard() {
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
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

        <div className="container-fluid"  >
            <div className="row flex-nowrap" >
                <div className=" col-auto col-md-3 col-xl-2 px-sm-2 px-0 tabLeft">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100  ">
                        {data.map((profile, index) => {
                            return <div key={index}>
                                <ListItem >
                                    <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                        <Avatar>
                                            {
                                                <img src={`http://localhost:8081/images/` + profile.image} alt="" className='profile_image' />
                                            }
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText className="font" primary={<b>{profile.name}</b>} secondary={"Email: " + profile.email} />
                                </ListItem>
                                <br />
                                <span type="text" className='fs-100  font pd-left'>Date current: <b>{displaytodaysdate}</b></span>
                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    <li className='pd-top'>
                                        <Link href="/homeAdmin" underline="hover" className="nav-link px-0 align-middle">
                                            <i className="fs-4"><HomeIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> Home</span></Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link href="/manageAccount" underline="hover" className="nav-link px-0 align-middle">
                                            <i className="fs-4"><ManageAccountsIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> Manage Account</span></Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link href="/Song" underline="hover" className="nav-link px-0 align-middle">
                                            <i className="fs-4"><QueueMusicIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> Manage Song</span></Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link href="/manageFeedback" underline="hover" className="nav-link px-0 align-middle">
                                            <i className="fs-4"><ThumbUpAltIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> Manage feedback</span></Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link href={`/profile/` + profile.id} underline="hover" className="nav-link px-0 align-middle">
                                            <i className="fs-4"><ModeIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> Edit Profile</span></Link>
                                    </li>
                                    <li className='pd-top'>
                                        <Link href="/logInStart" underline="hover" className="nav-link px-0 align-middle ">
                                            <i className="fs-4"><LogoutIcon color="primary" /></i><span className="ms-1 d-none d-sm-inline"> Logout</span></Link>
                                    </li>
                                </ul>
                            </div>
                        })}
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