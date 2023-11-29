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
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Avatar from '@mui/material/Avatar';
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


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = token.split(':')[0];
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
    const handleListItemClick = (path) => {
        document.documentElement.classList.add('animate-dashboard');
        setTimeout(() => {
            window.location.href = path;
        }, 300);
    };
    const menuStyles = {
        flexDirection: 'column',
        position: 'absolute',
        with: '250px',
        left: 0,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '20px',
    };
    return (
        <Box sx={{ top: 0, position: "sticky", zIndex: '3' }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky" color="primary" enableColorOnDark>
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
                        <Menu
                            anchorEl={anchorElAvt}
                            open={Boolean(anchorElAvt)}
                            onClose={handleMenuCloseAvt}
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <ListItemButton style={{ borderRadius: '20px' }}
                                        onClick={() => handleListItemClick(`/profile/${profile.userId}`)}
                                    >
                                        <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                    </ListItemButton>
                                    <ListItemButton style={{ borderRadius: '20px' }}
                                        onClick={() => handleListItemClick('/login')}
                                    >
                                        <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                    </ListItemButton>
                                </div>
                            })}
                        </Menu>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>

                                    <ListItemButton style={{ borderRadius: '20px' }}
                                        onClick={() => handleListItemClick('/manageAccount')}
                                    >
                                        <ListItemIcon>
                                            <ManageAccountsIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Manage Account</span></ListItemText>
                                    </ListItemButton>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            onClick={() => handleListItemClick('/requestAccount')}
                                        >
                                            <ListItemIcon>
                                                <ManageAccountsIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Request Account</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            onClick={() => handleListItemClick('/Song')}
                                        >
                                            <ListItemIcon>
                                                <QueueMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            onClick={() => handleListItemClick('/manageFeedback/' + profile.userId)}
                                        >
                                            <ListItemIcon>
                                                <ThumbUpAltIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Feedback</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            onClick={() => handleListItemClick(`/profile/${profile.userId}`)}
                                        >
                                            <ListItemIcon>
                                                <ModeIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            onClick={() => handleListItemClick('/login')}
                                        >
                                            <ListItemIcon>
                                                <LogoutIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
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