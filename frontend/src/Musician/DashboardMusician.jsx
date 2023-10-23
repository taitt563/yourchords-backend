import { Outlet, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ListItemText from '@mui/material/ListItemText';

// import ModeIcon from '@mui/icons-material/Mode';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
// import AddIcon from '@mui/icons-material/Add';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
function DashboardMusician() {
    // const [data, setData] = useState([]);
    const [openSong, setOpenSong] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);


    axios.defaults.withCredentials = true;
    // const { userId } = useParams();
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    // useEffect(() => {
    //     const userId = localStorage.getItem('id_musician');

    //     axios.get('http://localhost:8081/getProfile/' + userId)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 setData(res.data.Result);

    //             } else {
    //                 alert("Error")
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }, [userId])
    const handleClickManageSong = () => {
        setOpenSong(!openSong);
    };
    const handleClickOrder = () => {
        setOpenOrder(!openOrder);
    };
    return (

        <div className="container-fluid"  >
            <div className="row flex-nowrap" >
                <div className=" col-auto col-md-3 col-xl-2 px-0 tabLeft">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100" style={{
                        top: 0,
                        zIndex: 2,
                        position: 'sticky'
                    }}>
                        {/* {data.map((profile, index) => {
                            return <div key={index}>
                                <ListItem >
                                    <ListItemAvatar className="d-flex align-items-center pb-2 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
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
                                 */}
                        <br />
                        <span type="text" className='fs-100  font pd-left'>Date current: <b>{displaytodaysdate}</b></span>

                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            {/* <List sx={{ width: '45%', paddingTop: '30px', paddingRight: '10px' }}>
                                        <ListItemButton href="/homeMusician">
                                            <ListItemIcon>
                                                <DashboardIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Dashboard</span></ListItemText>
                                        </ListItemButton>
                                    </List> */}
                            <List sx={{ width: '45%', paddingTop: '30px', paddingRight: '10px' }}>
                                <ListItemButton onClick={handleClickManageSong}>
                                    <ListItemIcon>
                                        <QueueMusicIcon color="primary" fontSize='medium' />
                                    </ListItemIcon>
                                    <ListItemText><span className="fontDashboard">Manage Song</span></ListItemText>
                                    {openSong ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                </ListItemButton>
                                <Collapse in={openSong} timeout="auto" unmountOnExit>
                                    <List sx={{ width: '100%', pl: 3 }}>
                                        <ListItemButton href="/songMusician">
                                            <ListItemIcon>
                                                <LibraryMusicIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">List Song</span></ListItemText>
                                        </ListItemButton>
                                        {/* <ListItemButton href="/createSong">
                                                    <ListItemIcon>
                                                        <AddIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Add New Song</span></ListItemText>
                                                </ListItemButton> */}
                                    </List>
                                </Collapse>
                            </List>
                            <List sx={{ width: '45%', paddingTop: '30px', paddingRight: '10px' }}>
                                <ListItemButton href="/chordMusician">
                                    <ListItemIcon>
                                        <GraphicEqIcon color="primary" fontSize='medium' />
                                    </ListItemIcon>
                                    <ListItemText><span className="fontDashboard">Manage Chord</span></ListItemText>
                                </ListItemButton>
                            </List>
                            <List sx={{ width: '45%', paddingTop: '30px', paddingRight: '10px' }}>
                                <ListItemButton href="/manageBeat">
                                    <ListItemIcon>
                                        <EqualizerIcon color="primary" fontSize='medium' />
                                    </ListItemIcon>
                                    <ListItemText><span className="fontDashboard">Manage Beat</span></ListItemText>
                                </ListItemButton>
                            </List>
                            <List sx={{ width: '45%', paddingTop: '30px', paddingRight: '10px' }}>
                                <ListItemButton onClick={handleClickOrder}>
                                    <ListItemIcon>
                                        <QueueMusicIcon color="primary" fontSize='medium' />
                                    </ListItemIcon>
                                    <ListItemText><span className="fontDashboard">Manage Oder</span></ListItemText>
                                    {openOrder ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                </ListItemButton>
                                <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                    <List sx={{ width: '100%', pl: 3 }}>
                                        <ListItemButton href="/orderMusician">
                                            <ListItemIcon>
                                                <PlaylistAddCheckCircleIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Order</span></ListItemText>
                                        </ListItemButton>
                                        <ListItemButton href="/transactionHistory">
                                            <ListItemIcon>
                                                <ListAltIcon color="primary" fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Transaction History</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </List>
                            {/* <List sx={{ width: '45%', paddingTop: '30px', paddingRight: '10px' }}>
                                <ListItemButton href={`/profileMusician/` + profile.userId}>
                                    <ListItemIcon>
                                        <ModeIcon color="primary" fontSize='medium' />
                                    </ListItemIcon>
                                    <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                </ListItemButton>
                            </List> */}
                            {/* <List sx={{ width: '45%', paddingTop: '30px', paddingRight: '10px' }}>
                                <ListItemButton href="/loginMusician">
                                    <ListItemIcon>
                                        <LogoutIcon color="primary" fontSize='medium' />
                                    </ListItemIcon>
                                    <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                </ListItemButton>
                            </List> */}
                        </ul>
                        {/* </div>
                        })} */}
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <Outlet style={{ height: '500px', overflowY: 'scroll' }} />
                </div>
            </div>
        </div>
    )
}

export default DashboardMusician