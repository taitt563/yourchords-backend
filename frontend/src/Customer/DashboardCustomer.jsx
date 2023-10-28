import { Outlet, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
function DashboardCustomer() {
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const userId = localStorage.getItem('id_customer');
        axios.get('http://localhost:8081/getProfile/' + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [userId])
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap" >
                <div className=" col-auto col-md-3 col-xl-2 px-0 tabLeft">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100" style={{
                        top: 0,
                        zIndex: 0,
                        position: 'sticky'
                    }}>
                        {data.map((profile, index) => {
                            return <div key={index}>
                                <ListItem sx={{

                                }} >
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
                                <span type="text" className='fs-100 font pd-left '>Date current: <b>{displaytodaysdate}</b></span>
                                <List sx={{
                                    width: '45%', paddingTop: '30px', paddingRight: '10px'
                                }}>
                                    <ListItemButton href={"/songCustomer/" + profile.userId}>
                                        <ListItemIcon>
                                            <QueueMusicIcon color="primary" fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                    </ListItemButton>
                                </List>
                                <List sx={{
                                    width: '45%', paddingTop: '30px', paddingRight: '10px'

                                }}>
                                    <ListItemButton href={`/playlist/` + profile.userId} >
                                        <ListItemIcon>
                                            <PlaylistAddIcon color="primary" fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Playlist</span></ListItemText>
                                    </ListItemButton>
                                </List>
                                <List sx={{
                                    width: '45%', paddingTop: '30px', paddingRight: '10px'
                                }}>
                                    <ListItemButton href="/feedback">
                                        <ListItemIcon>
                                            <ThumbUpAltIcon color="primary" fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Feedback</span></ListItemText>
                                    </ListItemButton>
                                </List>
                                <List sx={{
                                    width: '45%', paddingTop: '30px', paddingRight: '10px',
                                }}>
                                    <ListItemButton href={`/profileCustomer/` + profile.userId}>
                                        <ListItemIcon>
                                            <ModeIcon color="primary" fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                    </ListItemButton>
                                </List>

                                <List sx={{
                                    width: '45%', paddingTop: '30px', paddingRight: '10px'
                                }}>
                                    <ListItemButton href="/login">
                                        <ListItemIcon>
                                            <LogoutIcon color="primary" fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                    </ListItemButton>
                                </List>

                            </div>
                        })}
                    </div>
                </div>
                <div className="col p-0 m-0" style={{
                    zIndex: 2,
                }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardCustomer