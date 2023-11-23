import { Outlet, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ModeIcon from '@mui/icons-material/Mode';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function DashboardChordManager() {
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    const [open, setOpen] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const userId = sessionStorage.getItem('id_chordManager');
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
    const handleClick = () => {
        setOpen(!open);
    };
    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };
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
                                    (
                                        <>
                                            <ListItem >
                                                <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none" >
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
                                            <span type="text" className='fs-100  font pd-left'>Date current: <b>{displaytodaysdate}</b></span>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClick} style={{ borderRadius: '20px' }} >
                                                    <ListItemIcon>
                                                        <MusicNoteIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                                    {open ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                                </ListItemButton>
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 3 }}>
                                                        <ListItemButton href="/songChordManager" style={{ borderRadius: '20px' }}>
                                                            <ListItemIcon>
                                                                <LibraryMusicIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">List Song</span></ListItemText>
                                                        </ListItemButton>
                                                        <ListItemButton href="/verifySong" style={{ borderRadius: '20px' }} >
                                                            <ListItemIcon>
                                                                <VerifiedUserIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">Verify Song</span></ListItemText>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton href={`/profileChordManager/` + profile.userId} style={{ borderRadius: '20px' }} >
                                                    <ListItemIcon>
                                                        <ModeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton href="/login" style={{ borderRadius: '20px' }} >
                                                    <ListItemIcon>
                                                        <LogoutIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Sign Out</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </>
                                    )
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
                                            <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClick} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <QueueMusicIcon color="primary" fontSize='medium' />
                                                        {open ? <ExpandLess color="primary" fontSize='small' /> : <ExpandMore color="primary" fontSize='small' />}

                                                    </ListItemIcon>
                                                </ListItemButton>
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton href="/songChordManager" style={{ borderRadius: '50px' }}>
                                                            <ListItemIcon>
                                                                <LibraryMusicIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <ListItemButton href="/verifySong" style={{ borderRadius: '50px' }}>
                                                            <ListItemIcon>
                                                                <VerifiedUserIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>
                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                <ListItemButton href={`/profileChordManager/` + profile.userId} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <ModeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
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
                <div className="col p-0 m-0">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardChordManager