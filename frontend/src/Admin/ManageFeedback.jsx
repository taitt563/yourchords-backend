import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import SearchAppBar from '../component/SearchAppBar';
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
export default function BottomAppBar() {
    const [data, setData] = useState([]);
    const [imageURL, setImageURL] = useState(null);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    axios.defaults.withCredentials = true;
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        axios.get(`${apiUrl}/getFeedback`)
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
    }, [])
    const renderTableRows = (filterDate) => {
        return data.map((feedbackUser, index) => {
            const date1 = moment(displaytodaysdate).format("YYYY-MM-DD");
            const date2 = moment(feedbackUser.date_feedback).format("YYYY-MM-DD");

            if (date1 === date2 && filterDate === 'today') {
                return (

                    <tr key={index} onClick={() => navigate(`/viewFeedback/` + feedbackUser.id)} style={{ cursor: 'pointer' }}>
                        <td>
                            <ListItem >
                                <ListItemAvatar className="d-flex align-items-center pb-2 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none" >
                                    <Avatar>
                                        {imageURL && <img className="song_image" src={`data:image/png;base64,${feedbackUser.image}`} />}

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText className="font" primary={
                                    <b>{feedbackUser.username} </b>
                                }
                                    secondary={feedbackUser.email.length > 17 ?
                                        <b>{feedbackUser.email.substring(0, 17)}...</b>
                                        :
                                        <b>{feedbackUser.email} </b>
                                    } />
                            </ListItem>

                        </td>
                        <td style={{ verticalAlign: 'middle' }}>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                        {feedbackUser.status === 1 ?
                            <td style={{ color: 'green' }}><CheckCircleIcon color='success' /></td>
                            :
                            <td className="text-warning" style={{ verticalAlign: 'middle' }}><b>Not reply</b></td>
                        }
                    </tr>
                );
            }

            if (date1 > date2 && filterDate === 'recently') {
                return (
                    <tr key={index} onClick={() => navigate(`/viewFeedback/` + feedbackUser.id)} style={{ cursor: 'pointer' }}>
                        <td>
                            <ListItem >
                                <ListItemAvatar className="d-flex align-items-center pb-2 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none" >
                                    <Avatar>
                                        {imageURL && <img className="song_image" src={`data:image/png;base64,${feedbackUser.image}`} />}

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText className="font" primary={
                                    <b>{feedbackUser.username} </b>
                                }
                                    secondary={feedbackUser.email.length > 17 ?
                                        <b>{feedbackUser.email.substring(0, 17)}...</b>
                                        :
                                        <b>{feedbackUser.email} </b>
                                    } />
                            </ListItem>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                        {feedbackUser.status === 1 ?
                            <td style={{ color: 'green' }}><CheckCircleIcon color='success' /></td>
                            :
                            <td className="text-warning" style={{ verticalAlign: 'middle' }}><b>Not reply</b></td>
                        }
                    </tr>
                );
            }

            return null;
        });
    };
    return (
        <>
            <SearchAppBar />
            <React.Fragment>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Manage Feedback</h3>
                </div>

                {/* LIST TODAY */}
                <div style={{ borderRadius: '20px', border: '1px solid #ccc', margin: '10px' }}>

                    <ListItem>
                        <ListItemText primary="Today" style={{ color: '#0d6efd' }} />
                    </ListItem>
                    <List sx={{ mb: 2 }}>
                        <div className='mt-4 pd-left'>
                            {!renderTableRows('today').some(row => row !== null) ?
                                (

                                    <div className="text-center"><b>No comment available</b></div>
                                )
                                :
                                <table className='custom-table table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTableRows('today')}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </List>
                    {/* LIST RECENTLY */}
                    <ListItem>
                        <ListItemText primary="Recently" style={{ color: '#0d6efd' }} />
                    </ListItem>
                    <List sx={{ mb: 2 }}>
                        <div className='mt-4 pd-left'>
                            {!renderTableRows('recently').some(row => row !== null) ?
                                (

                                    <div className="text-center"><b>No comment available</b></div>
                                )
                                :
                                <table className='custom-table table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTableRows('recently')}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </List>
                </div>
            </React.Fragment>
        </>
    );
}