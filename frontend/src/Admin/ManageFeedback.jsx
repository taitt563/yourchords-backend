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

export default function BottomAppBar() {

    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
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
    return (
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

                            <ListItem to={`/viewSong/` + feedbackUser.id}>
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
                            <ListItem button>
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
                        }
                    </div>

                }
                )}
            </List>

        </React.Fragment>
    );
}