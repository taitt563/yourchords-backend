import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import SearchAppBar from '../component/SearchAppBar';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';

export default function BottomAppBar() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
    const { username } = useParams();
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        axios.get('http://localhost:8081/getFeedback')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);

                } else {
                    alert("Error")
                }
            })

            .catch(err => console.log(err));
    }, [])
    const handleViewFeedback = (event) => {
        event.preventDefault();
        axios.delete('http://localhost:8081/viewFeedback/' + username)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate("/viewFeedback/" + username)
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <SearchAppBar />
            <React.Fragment>
                <CssBaseline />
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Inbox
                </Typography>
                {/* LIST TODAY */}
                <List sx={{ mb: 2 }}>
                    <ListItem>
                        <ListItemText primary="Today" />
                        <ListItemText primary="Date" />
                    </ListItem>
                    {data.map((feedbackUser, index) => {
                        const date1 = (moment(displaytodaysdate).format("YYYY-MM-DD"));
                        const date2 = (moment(feedbackUser.date).format("YYYY-MM-DD"));
                        return <div key={index}>

                            {date1 == date2 &&
                                <Link href={`/viewFeedback/` + feedbackUser.username} underline="hover" className="nav-link px-0 align-middle">
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {
                                                    <img src={`http://localhost:8081/images/` + feedbackUser.image} alt="" className='profile_image' />
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={feedbackUser.username} secondary={feedbackUser.email} />
                                        <ListItemText primary={moment(feedbackUser.date).format("YYYY-MM-DD")} />
                                    </ListItem>
                                </Link>
                            }
                        </div>
                    })}
                </List>
                {/* LIST RECENTLY */}
                <List sx={{ mb: 2 }}>
                    <ListItem>
                        <ListItemText primary="Recently" />
                        <ListItemText primary="Date" />
                    </ListItem>
                    {data.map((feedbackUser, index) => {
                        const date1 = (moment(displaytodaysdate).format("YYYY-MM-DD"));
                        const date2 = (moment(feedbackUser.date).format("YYYY-MM-DD"));

                        return <div key={index}>

                            {date1 > date2 &&
                                <Link href={`/viewFeedback/` + feedbackUser.username} underline="hover" className="nav-link px-0 align-middle">
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {
                                                    <img src={`http://localhost:8081/images/` + feedbackUser.image} className='profile_image' />
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={feedbackUser.username} secondary={feedbackUser.comment} />
                                        <ListItemText primary={moment(feedbackUser.date).format("YYYY-MM-DD")} />
                                    </ListItem>
                                </Link>
                            }

                        </div>

                    }
                    )}
                </List>

            </React.Fragment >
        </>
    );
}