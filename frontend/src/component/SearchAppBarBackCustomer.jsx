import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from "@mui/icons-material/Search";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import axios from 'axios';
const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#F1F1FB',
        },
    },
});

export default function SearchAppBarBackCustomer() {
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvt, setAnchorElAvt] = useState(null);
    const { userId } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const [openPlaylist, setOpenPlaylist] = useState(false);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClickAvt = (event) => {
        setAnchorElAvt(event.currentTarget);
    };

    const handleMenuCloseAvt = () => {
        setAnchorElAvt(null);
    };
    const handleClickPlaylist = () => {
        setOpenPlaylist(!openPlaylist);
    };
    useEffect(() => {
        const userId = sessionStorage.getItem('id_customer');
        axios.get(`${apiUrl}/getProfile/` + userId)
            .then(res => {
                setData(res.data.Result)
                if (res.data.Result.length > 0) {
                    const profileImages = res.data.Result.map(data => `${data.image}`);
                    setImageURL(profileImages);
                }
            })
            .catch(err => console.log(err));
    }, [userId])
    const menuStyles = {
        flexDirection: 'column',
        position: 'absolute',
        with: '250px',
        left: 0,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '30px',
    };

    return (
        <Box sx={{ top: 0, position: "sticky", zIndex: '3' }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky" style={{ color: '#0d6efd' }} enableColorOnDark>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            onClick={handleMenuClick}
                            sx={{
                                mr: 2, color: '#0d6efd'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#0d6efd',
                                textDecoration: 'none',
                            }}
                        >
                            <HeadsetIcon fontSize="large" />
                        </Typography>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ color: '#0d6efd', letterSpacing: '.3rem', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <b>YOUR CHORD</b>
                        </Typography>
                        <ListItemAvatar
                            open={Boolean(anchorElAvt)}
                            onClose={handleMenuCloseAvt}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <Avatar onClick={handleMenuClickAvt}
                                        style={{
                                            cursor: 'pointer'
                                        }}>
                                        {imageURL && (
                                            <img src={`data:image/png;base64,${profile.image}`} className='profile_image' />
                                        )
                                        }
                                    </Avatar>
                                </div>
                            })}
                        </ListItemAvatar>
                        {/* ------------AVT------------ */}
                        <Menu
                            anchorEl={anchorElAvt}
                            open={Boolean(anchorElAvt)}
                            onClose={handleMenuCloseAvt}
                            color="#0d6efd"
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <ListItemButton href={`/profileCustomer/` + profile.userId} style={{ borderRadius: '20px' }}>
                                        <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                    </ListItemButton>
                                    <ListItemButton href="/login" style={{ borderRadius: '20px' }}>
                                        <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                    </ListItemButton>

                                </div>
                            })}
                        </Menu>
                        {/* ------------MENU ICON------------ */}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            color="#0d6efd"
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>

                                    <ListItemButton href={"/songCustomer/" + profile.userId} style={{ borderRadius: '20px' }} >
                                        <ListItemIcon >
                                            <MusicNoteIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                    </ListItemButton>
                                    <List sx={{
                                        paddingTop: '20px',
                                    }}>
                                        <ListItemButton href="/chord" style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <GraphicEqIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Chord</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{
                                        paddingTop: '20px'
                                    }}>
                                        <ListItemButton href="/searchChord" style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <SearchIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Search Chord</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton onClick={handleClickPlaylist} style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <PlaylistPlayIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Your Playlist</span></ListItemText>
                                            {openPlaylist ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={openPlaylist} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%', pl: 2 }}>
                                                <ListItemButton href={"/playlist/" + profile.userId} style={{ borderRadius: '20px' }}>
                                                    <ListItemIcon>
                                                        <QueueMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Playlist</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton href={"/createPlaylist/" + profile.userId} style={{ borderRadius: '20px' }}>
                                                    <ListItemIcon>
                                                        <AddIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">New Playlist</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>
                                    <List sx={{
                                        paddingTop: '20px'
                                    }}>
                                        <ListItemButton href="/feedback" style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <ThumbUpAltIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Feedback</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                </div>
                            })}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}