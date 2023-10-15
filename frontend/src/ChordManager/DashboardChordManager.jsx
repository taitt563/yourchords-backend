import { Outlet, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import HomeIcon from '@mui/icons-material/Home';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ModeIcon from '@mui/icons-material/Mode';

function DashboardChordManager() {
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    const [open, setOpen] = useState(false);

    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const userId = localStorage.getItem('id_chordManager');
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
    const handleClick = () => {
        setOpen(!open);
    };

    return (

        <div className="container-fluid"  >
            <div className="row flex-nowrap" >
                <div className=" col-auto col-lg-2 px-sm-2 px-1 tabLeft">
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
                                <span type="text" className='fs-100  font pd-left'>Date current: <b>{displaytodaysdate}</b></span>

                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start pd-top pd-right" id="menu">
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href="/homeChordManager">
                                            <ListItemIcon>
                                                <HomeIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Home</span></ListItemText>
                                            <KeyboardArrowRightIcon color="primary" fontSize='medium' />
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton onClick={handleClick}>
                                            <ListItemIcon>
                                                <QueueMusicIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                            {open ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%', pl: 3 }}>
                                                <ListItemButton href="/songChordManager">
                                                    <ListItemIcon>
                                                        <LibraryMusicIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">List Song</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton href="/verifySong">
                                                    <ListItemIcon>
                                                        <VerifiedUserIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Verify Song</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href={`/profileChordManager/` + profile.userId}>
                                            <ListItemIcon>
                                                <ModeIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                            <KeyboardArrowRightIcon color="primary" fontSize='medium' />
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ width: '45%', paddingTop: '30px' }}>
                                        <ListItemButton href="/logInStart">
                                            <ListItemIcon>
                                                <LogoutIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                        </ListItemButton>
                                    </List>


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

export default DashboardChordManager