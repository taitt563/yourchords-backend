import { Outlet, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
function Dashboard() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [datachord, setDataChord] = useState([]);
    const [imageURL, setImageURL] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const userId = sessionStorage.getItem('id_admin');
        axios.get(`${apiUrl}/getProfile/` + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataChord(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(profileImages);
                    }
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [userId]);
    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    const handleListItemClick = (path) => {
        document.documentElement.classList.add('animate-dashboard');
        setTimeout(() => {
            window.location.href = path;
        }, 300);
    };

    return (
        <div className={`container-fluid${collapsed ? ' collapsed' : ''}`}>
            <div className="row flex-nowrap" >
                <div className={`col-auto col-md-3 col-xl-2 px-0 tabLeft${collapsed ? ' collapsed' : ''}`}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{
                        top: 0,
                        position: 'sticky'
                    }}>
                        {datachord.map((profile, index) => {
                            return (
                                <div key={index}>
                                    <button onClick={handleToggleCollapse} className="btn btn-sm" >
                                        {collapsed ?
                                            <ArrowRightIcon color='primary' fontSize='medium'
                                                style={{ position: 'absolute', right: '-20%', top: '10%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />
                                            :
                                            <ArrowLeftIcon color='primary' fontSize='medium'
                                                style={{ position: 'absolute', right: '-4%', top: '10%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />}
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
                                                <span type="text" className='fs-100 font pd-left'>Date current: <b>{displaytodaysdate}</b></span>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/manageAccount')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Manage Account</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/requestAccount')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Request Account</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/Song')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <QueueMusicIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/manageFeedback/' + profile.userId)} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Manage Feedback</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick(`/profile/${profile.userId}`)} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ModeIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/login')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <LogoutIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
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
                                                <span type="text" className='fs-100 font pd-left '>{""}</span>                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/manageAccount')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/requestAccount')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/Song')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <QueueMusicIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/manageFeedback/' + profile.userId)} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick(`/profile/${profile.userId}`)} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <ModeIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/login')} className='buttonDashBoard'
                                                    >
                                                        <ListItemIcon>
                                                            <LogoutIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                            </>
                                        )
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
