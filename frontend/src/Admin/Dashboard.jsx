import { Outlet, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
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
function Dashboard() {
    const [datachord, setDataChord] = useState([]);
    axios.defaults.withCredentials = true;
    const { userId } = useParams();

    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const userId = localStorage.getItem('id');
        axios.get('http://localhost:8081/getProfile/' + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataChord(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [userId])

    return (

        <div className="container-fluid"  >
            <div className="row flex-nowrap" >
                <div className=" col-auto col-md-3 col-xl-2 px-sm-2 px-0 tabLeft">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100  ">
                        {datachord.map((profile, index) => {
                            return <div key={index}>
                                <ListItem >
                                    <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                        <Avatar>
                                            {
                                                <img src={`http://localhost:8081/images/` + profile.image} alt="" className='profile_image' />
                                            }
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText className="font" primary={<b>{profile.name}</b>} secondary={<b>{profile.email}</b>} />
                                </ListItem>
                                <br />
                                <span type="text" className='fs-100  font pd-left '>Date current: <b>{displaytodaysdate}</b></span>
                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">


                                    <li className='pd-top'>
                                        <b>
                                            <Link href="/homeAdmin" underline="hover" className="nav-link px-0 align-middle justify-content-between">
                                                <i className="fs-4"><HomeIcon color="primary" fontSize='large' /></i>
                                                <span className="ms-1 d-none d-sm-inline"> Home</span>
                                            </Link>
                                        </b>
                                    </li>
                                    <li className='pd-top' >

                                        <b>
                                            <Link href="/manageAccount" underline="hover" className="nav-link px-0 align-middle">
                                                <i className="fs-4"><ManageAccountsIcon color="primary" fontSize='large' /></i>
                                                <span className="ms-1 d-none d-sm-inline"> Manage Account </span>
                                            </Link>
                                        </b>
                                    </li>
                                    <li className='pd-top'>
                                        <b>
                                            <Link href="/Song" underline="hover" className="nav-link px-0 align-middle">
                                                <i className="fs-4"><QueueMusicIcon color="primary" fontSize='large' /></i>
                                                <span className="ms-1 d-none d-sm-inline"> Song</span>
                                            </Link>
                                        </b>
                                    </li>

                                    <li className='pd-top'>
                                        <b>
                                            <Link href="/manageFeedback" underline="hover" className="nav-link px-0 align-middle">
                                                <i className="fs-4"><ThumbUpAltIcon color="primary" fontSize='large' /></i>
                                                <span className="ms-1 d-none d-sm-inline"> Manage feedback</span>
                                            </Link>
                                        </b>
                                    </li>
                                    <li className='pd-top'>
                                        <b>
                                            <Link href={`/profile/` + profile.userId} underline="hover" className="nav-link px-0 align-middle">
                                                <i className="fs-4"><ModeIcon color="primary" fontSize='large' /></i>
                                                <span className="ms-1 d-none d-sm-inline"> Edit Profile</span>
                                            </Link>
                                        </b>
                                    </li>
                                    <li className='pd-top'>
                                        <b>
                                            <Link href="/logInStart" underline="hover" className="nav-link px-0 align-middle ">
                                                <i className="fs-4"><LogoutIcon color="primary" fontSize='large' /></i>
                                                <span className="ms-1 d-none d-sm-inline"> Logout</span>
                                            </Link>
                                        </b>
                                    </li>
                                </ul>
                            </div>
                        })}
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard