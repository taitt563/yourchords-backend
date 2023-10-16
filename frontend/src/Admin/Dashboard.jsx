import { Outlet, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Dashboard() {
    const [datachord, setDataChord] = useState([]);
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const userId = localStorage.getItem('id_admin');
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
                                    <ListItemText className="font" primary={profile.name.length > 10 ?
                                        <b>{profile.name.substring(0, 10)}...</b>
                                        :
                                        <b>{profile.name} </b>
                                    }
                                        secondary={profile.email.length > 17 ?
                                            <b>{profile.email.substring(0, 17)}...</b>
                                            :
                                            <b>{profile.email} </b>
                                        } />
                                </ListItem>
                                <br />
                                <span type="text" className='fs-100  font pd-left '>Date current: <b>{displaytodaysdate}</b>

                                </span>
                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href="/homeAdmin">
                                            <ListItemIcon>
                                                <DashboardIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Dashboard</span></ListItemText>
                                            <KeyboardArrowRightIcon color="primary" fontSize='medium' />
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href="/manageAccount">
                                            <ListItemIcon>
                                                <ManageAccountsIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Account</span></ListItemText>
                                            <KeyboardArrowRightIcon color="primary" fontSize='medium' />
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href="/Song">
                                            <ListItemIcon>
                                                <QueueMusicIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                            <KeyboardArrowRightIcon color="primary" fontSize='medium' />
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href="/manageFeedback">
                                            <ListItemIcon>
                                                <ThumbUpAltIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage feedback</span></ListItemText>
                                            <KeyboardArrowRightIcon color="primary" fontSize='medium' />
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href={`/profile/` + profile.userId}>
                                            <ListItemIcon>
                                                <ModeIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                            <KeyboardArrowRightIcon color="primary" fontSize='medium' />
                                        </ListItemButton>
                                    </List>
                                    <div className='logout'>
                                        <List sx={{ width: '45%', paddingTop: '30px' }}>
                                            <ListItemButton href="/logInStart">
                                                <ListItemIcon>
                                                    <LogoutIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                    </div>
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