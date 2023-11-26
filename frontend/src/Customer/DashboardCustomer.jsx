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
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from "@mui/icons-material/Search";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HandshakeIcon from '@mui/icons-material/Handshake';

function DashboardCustomer() {
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    const [openPlaylist, setOpenPlaylist] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [collapsed, setCollapsed] = useState(
        sessionStorage.getItem('dashboardCollapsed') === 'true' || false
    );
    const handleClickPlaylist = () => {
        setOpenPlaylist(!openPlaylist);
    };
    const handleToggleCollapse = () => {
        const newCollapsedState = !collapsed;
        setCollapsed(newCollapsedState);
        sessionStorage.setItem('dashboardCollapsed', String(newCollapsedState));
    };
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const userId = sessionStorage.getItem('id_customer');
        axios.get(`${apiUrl}/getProfile/` + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(profileImages);
                    }
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [userId])
    return (
        <div className={`container-fluid${collapsed ? ' collapsed' : ''}`}>
            <div className="row flex-nowrap" >
                <div className={`col-auto col-md-3 col-xl-2 px-0 tabLeft${collapsed ? ' collapsed' : ''}`}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{
                        top: 0,
                        position: 'sticky'
                    }}>

                        {data.map((profile, index) => {
                            return <div key={index}>
                                <button className="btn btn-sm" >
                                    {collapsed ?
                                        <ArrowRightIcon onClick={handleToggleCollapse} color='primary' fontSize='medium'
                                            style={{ position: 'absolute', right: '-20%', top: '16%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />
                                        :
                                        <ArrowLeftIcon onClick={handleToggleCollapse} color='primary' fontSize='medium'
                                            style={{ position: 'absolute', right: '-6%', top: '16%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />}
                                </button>
                                {!collapsed ?
                                    <>
                                        <ListItem>
                                            <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                                <Avatar>
                                                    {imageURL &&
                                                        (
                                                            <img src={`data:image/png;base64,${profile.image}`} className='profile_image' />
                                                        )
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
                                        <span type="text" className='fs-100 font pd-left '>Date current: <b>{displaytodaysdate}</b></span>
                                        <List sx={{
                                            width: '40%'
                                        }}>
                                            <ListItemButton href={"/songCustomer/" + profile.userId} style={{ borderRadius: '20px' }} >
                                                <ListItemIcon >
                                                    <MusicNoteIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '10px'
                                        }}>
                                            <ListItemButton href="/chord" style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <GraphicEqIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Chord</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '10px'
                                        }}>
                                            <ListItemButton href="/searchChord" style={{ borderRadius: '20px' }}>
                                                <ListItemIcon>
                                                    <SearchIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Search Chord</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{ width: '40%', paddingTop: '10px' }}>
                                            <ListItemButton onClick={handleClickPlaylist} style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <PlaylistPlayIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Your Playlist</span></ListItemText>
                                                {openPlaylist ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                            </ListItemButton>
                                            <Collapse in={openPlaylist} timeout="auto" unmountOnExit>
                                                <List sx={{ width: '100%', pl: 2 }}>
                                                    <ListItemButton href={"/playlist/" + profile.userId} style={{ borderRadius: '20px' }}>
                                                        <ListItemIcon>
                                                            <QueueMusicIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Playlist</span></ListItemText>
                                                    </ListItemButton>
                                                    <ListItemButton href={"/createPlaylist/" + profile.userId} style={{ borderRadius: '20px' }} >
                                                        <ListItemIcon>
                                                            <AddIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">New Playlist</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        </List>
                                        <List sx={{ width: '40%', paddingTop: '10px' }}>
                                            <ListItemButton href={`/order/` + profile.userId} style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <HandshakeIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Order Beat</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '10px'
                                        }}>
                                            <ListItemButton href={"/feedback/" + profile.userId} style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Feedback</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '10px',
                                        }}>
                                            <ListItemButton href={`/profileCustomer/` + profile.userId} style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <ModeIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                            </ListItemButton>
                                        </List>

                                        <List sx={{
                                            width: '40%', paddingTop: '10px'
                                        }}>
                                            <ListItemButton href="/login" style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <LogoutIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Sign Out</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                    </>
                                    :
                                    (
                                        <>

                                            <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 pt-4 text-white text-decoration-none pd-left">
                                                <Avatar>
                                                    {imageURL &&
                                                        (
                                                            <img src={`data:image/png;base64,${profile.image}`} className='profile_image' />
                                                        )
                                                    }
                                                </Avatar>
                                            </ListItemAvatar>

                                            <br />
                                            <span type="text" className='fs-100 font pd-left '>{""}</span>

                                            <List sx={{
                                                width: '60%'
                                            }}>
                                                <ListItemButton href={"/songCustomer/" + profile.userId} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon >
                                                        <MusicNoteIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton href="/chord" style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <GraphicEqIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton href="/searchChord" style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <SearchIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickPlaylist} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <PlaylistPlayIcon color="primary" fontSize='medium' />
                                                        {openPlaylist ? <ExpandLess color="primary" fontSize='small' /> : <ExpandMore color="primary" fontSize='small' />}

                                                    </ListItemIcon>
                                                </ListItemButton>
                                                <Collapse in={openPlaylist} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton href={"/playlist/" + profile.userId} style={{ borderRadius: '50px' }}>
                                                            <ListItemIcon>
                                                                <QueueMusicIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <ListItemButton href={"/createPlaylist/" + profile.userId} style={{ borderRadius: '50px' }}>
                                                            <ListItemIcon>
                                                                <AddIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>
                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                <ListItemButton href={`/order/` + profile.userId} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <HandshakeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton href={"/feedback/" + profile.userId} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px',
                                            }}>
                                                <ListItemButton href={`/profileCustomer/` + profile.userId} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <ModeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>

                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton href="/login" style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <LogoutIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                        </>
                                    )
                                }

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