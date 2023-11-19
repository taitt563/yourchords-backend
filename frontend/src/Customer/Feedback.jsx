import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import SearchAppBar from '../component/SearchAppBar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function Feedback() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [newFeedback, setNewFeedback] = useState({
        comment: '',
        rating: 0, // Initialize as a number (0 or any default value)
    });
    const [hover, setHover] = useState(5);
    const [selectedLabel, setSelectedLabel] = useState(null); // Add this state

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    axios.defaults.withCredentials = true;
    let showDate = new Date();
    const { userId } = useParams();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        axios.get(`${apiUrl}/getFeedback/` + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(profileImages);
                    }
                } else {
                    alert('Error');
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleFeedbackSubmission = () => {
        const { comment, rating } = newFeedback;

        // Check if the comment is empty
        if (!comment.trim()) {
            alert('Please provide a comment before submitting.');
            return;
        }

        const feedbackData = {
            userId: userId,
            comment: comment,
            rating: rating,
        };

        axios.post(`${apiUrl}/feedbackCustomer`, feedbackData)
            .then(res => {
                if (res.data.Status === 'Success') {
                    axios
                        .get(`${apiUrl}/getFeedback/` + userId)
                        .then(res => {
                            if (res.data.Status === 'Success') {
                                setData(res.data.Result);
                                setIsModalOpen(false);
                                setNewFeedback({ comment: '', rating: 0 });
                            } else {
                                alert('Error');
                            }
                        })
                        .catch(err => console.log(err));
                } else {
                    alert('Error submitting feedback');
                }
            })
            .catch(err => console.log(err));
    };



    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFormChange = e => {
        const { name, value } = e.target;
        setNewFeedback(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRatingChange = (event, newValue) => {
        setNewFeedback(prevState => ({
            ...prevState,
            rating: newValue,
        }));
        setSelectedLabel(labels[newValue]);

    };
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const getLabelText = (value) => {
        // Use the selected label when available, otherwise use the default
        return selectedLabel !== null ? selectedLabel : `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    };
    return (
        <>
            <SearchAppBar />
            <React.Fragment>
                <div className="d-flex flex-column align-items-center pt-4">
                    <h3 className="profile-header" style={{ color: '#0d6efd' }}><b>Feedback to us</b></h3>

                </div>
                {/* LIST TODAY */}
                <ListItem>
                    <ListItemText primary="Today" />
                </ListItem>
                <List sx={{ mb: 2 }}>
                    <div className="mt-4 pd-left">
                        <table className="table">
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
                                    const date1 = moment(displaytodaysdate).format("YYYY-MM-DD");
                                    const date2 = moment(feedbackUser.date_feedback).format("YYYY-MM-DD");
                                    if (date1 == date2) {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {imageURL &&
                                                        <img className="song_image" src={`data:image/png;base64,${feedbackUser.image}`} />

                                                    }
                                                </td>
                                                <td>{feedbackUser.username}</td>
                                                <td>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                                                {feedbackUser.status == true ? (
                                                    <td style={{ color: 'green' }}>
                                                        <b>Seen</b>
                                                    </td>
                                                ) : (
                                                    <td className="text-warning">
                                                        <b>Not seen</b>
                                                    </td>
                                                )}
                                                <td>
                                                    <Link
                                                        to={`/viewFeedbackCustomer/` + feedbackUser.id}
                                                        className="btn btn-success btn-sm me-2"
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
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
                    <div className="mt-4 pd-left">
                        <table className="table">
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
                                    const date1 = moment(displaytodaysdate).format("YYYY-MM-DD");
                                    const date2 = moment(feedbackUser.date_feedback).format("YYYY-MM-DD");
                                    if (date1 > date2) {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {imageURL &&
                                                        <img className="song_image" src={`data:image/png;base64,${feedbackUser.image}`} />

                                                    }
                                                </td>
                                                <td>{feedbackUser.username}</td>
                                                <td>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                                                {feedbackUser.status == true ? (
                                                    <td style={{ color: 'green' }}>
                                                        <b>Seen</b>
                                                    </td>
                                                ) : (
                                                    <td className="text-warning">
                                                        <b>Not seen</b>
                                                    </td>
                                                )}
                                                <td>
                                                    <Link
                                                        to={`/viewFeedbackCustomer/` + feedbackUser.id}
                                                        className="btn btn-success btn-sm me-2"
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button variant={'contained'} onClick={openModal}>New Feedback</Button>
                        {/* Modal for creating new feedback */}
                        <Modal open={isModalOpen} onClose={closeModal}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <h2 style={{ color: '#0d6efd' }}>New Feedback</h2>
                                <form>
                                    <TextField
                                        name="comment"
                                        label="Comment"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={newFeedback.comment}
                                        onChange={handleFormChange}
                                        required
                                    />
                                    <Rating
                                        name="rating"
                                        value={newFeedback.rating}
                                        onChange={handleRatingChange}
                                        getLabelText={getLabelText}
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                    />
                                    {/* <Rating
                                        name="hover-feedback"
                                        value={data.rating}
                                        precision={0.5}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => setData({ ...data, rating: newValue }) && setValue(newValue)}

                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    /> */}

                                    <Box sx={{ ml: 2 }}>{labels[hover]}</Box>

                                    <br />
                                    <Button
                                        variant="contained"
                                        onClick={handleFeedbackSubmission}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: 2,
                                        }}
                                    >
                                        Submit Feedback
                                    </Button>
                                </form>
                            </Box>
                        </Modal>
                    </div>

                </List>
            </React.Fragment>
        </>
    );
}