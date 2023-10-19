import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import SearchAppBar from '../component/SearchAppBar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";

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
        <>
            <SearchAppBar />
            <React.Fragment>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center">FEEDBACK</h3>
                </div>
                {/* LIST TODAY */}
                <ListItem>
                    <ListItemText primary="Today" />
                </ListItem>
                <List sx={{ mb: 2 }}>

                    <div className='mt-4 pd-left' style={{ height: '250px', overflowY: 'scroll' }}>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Username</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((feedbackUser, index) => {
                                    const date1 = (moment(displaytodaysdate).format("YYYY-MM-DD"));
                                    const date2 = (moment(feedbackUser.date_feedback).format("YYYY-MM-DD"));
                                    if (date1 == date2) {
                                        return <tr key={index}>
                                            <td>
                                                {
                                                    <img src={`http://localhost:8081/images/` + feedbackUser.image} alt="" className='song_image' />
                                                }
                                            </td>
                                            <td>{feedbackUser.username}</td>

                                            <td>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                                            {feedbackUser.status == true ?
                                                <td style={{ color: 'green' }}><b>Seen</b></td>
                                                :
                                                <td className="text-warning"><b>Not seen</b></td>
                                            }
                                            <td>
                                                <Link to={`/viewFeedback/` + feedbackUser.username} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                            </td>

                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </List>
                {/* LIST RECENTLY */}
                <ListItem>
                    <ListItemText primary="Recently" />
                </ListItem>
                <List sx={{ mb: 2 }}>

                    <div className='mt-4 pd-left' style={{ height: '400px', overflowY: 'scroll' }}>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Username</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((feedbackUser, index) => {
                                    const date1 = (moment(displaytodaysdate).format("YYYY-MM-DD"));
                                    const date2 = (moment(feedbackUser.date_feedback).format("YYYY-MM-DD"));
                                    if (date1 > date2) {
                                        return <tr key={index}>
                                            <td>
                                                {
                                                    <img src={`http://localhost:8081/images/` + feedbackUser.image} alt="" className='song_image' />
                                                }
                                            </td>
                                            <td>{feedbackUser.username}</td>

                                            <td>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                                            {feedbackUser.status == true ?
                                                <td style={{ color: 'green' }}><b>Seen</b></td>
                                                :
                                                <td className="text-warning"><b>Not seen</b></td>
                                            }
                                            <td>
                                                <Link to={`/viewFeedback/` + feedbackUser.username} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                            </td>

                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>

                </List>
            </React.Fragment>
        </>
    );
}