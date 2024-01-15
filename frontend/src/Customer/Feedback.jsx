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
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export default function Feedback() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newFeedback, setNewFeedback] = useState({
        comment: '',
        rating: 5,
    });
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setStoredTabValue(newValue);
    };

    const getStoredTabValue = () => {
        return localStorage.getItem('selectedTabFeedback') || '1';
    };
    const setStoredTabValue = (newValue) => {
        localStorage.setItem('selectedTabFeedback', newValue);
    };


    const navigate = useNavigate();
    const [hover, setHover] = useState(5);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    axios.defaults.withCredentials = true;
    let showDate = new Date();
    const { userId } = useParams();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const storedTabValue = getStoredTabValue();
        setValue(storedTabValue);

        const fetchData = async () => {
            setLoading(true);
            try {
                if (value === '1') {
                    // Fetch all feedback
                    const response = await axios.get(`${apiUrl}/getFeedback`);
                    if (response.data.Status === 'Success') {
                        setLoading(false);
                        setData(response.data.Result);
                        if (response.data.Result.length > 0) {
                            const profileImages = response.data.Result.map(data => `${data.image}`);
                            setImageURL(profileImages);
                        }
                    } else {
                        alert('Error fetching all feedback');
                    }
                } else if (value === '2') {
                    // Fetch user-specific feedback
                    const response = await axios.get(`${apiUrl}/getFeedback/` + userId);
                    if (response.data.Status === 'Success') {
                        setLoading(false);
                        setData(response.data.Result);
                        if (response.data.Result.length > 0) {
                            const profileImages = response.data.Result.map(data => `${data.image}`);
                            setImageURL(profileImages);
                        }
                    } else {
                        alert('Error fetching user-specific feedback');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [value]);

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
        return selectedLabel !== null ? selectedLabel : `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    };
    const renderTableRows = (filterDate) => {
        return data.map((feedbackUser, index) => {
            const date1 = moment(displaytodaysdate).format("YYYY-MM-DD");
            const date2 = moment(feedbackUser.date_feedback).format("YYYY-MM-DD");

            if (date1 === date2 && filterDate === 'today') {
                return (
                    <tr key={index} onClick={() => value === '2' ? navigate(`/viewFeedbackCustomer/` + feedbackUser.id) : navigate(`/viewFeedbackCustomerAll/` + feedbackUser.id)} style={{ cursor: 'pointer' }}>
                        <td>

                            {imageURL && <img className="song_image" src={`data:image/png;base64,${feedbackUser.image}`} />}

                        </td>
                        <td>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                        {feedbackUser.status === 1 ?
                            <td style={{ color: 'green' }}><CheckCircleIcon color='success' /></td>
                            :
                            <td className="text-warning"><b>Not reply</b></td>
                        }
                    </tr>
                );
            }

            if (date1 > date2 && filterDate === 'recently') {
                return (
                    <tr key={index} onClick={() => value === '2' ? navigate(`/viewFeedbackCustomer/` + feedbackUser.id) : navigate(`/viewFeedbackCustomerAll/` + feedbackUser.id)} style={{ cursor: 'pointer' }} >

                        <td>
                            {imageURL && <img className="song_image" src={`data:image/png;base64,${feedbackUser.image}`} />}
                        </td>
                        <td>{moment(feedbackUser.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</td>
                        {feedbackUser.status === 1 ?
                            <td style={{ color: 'green' }}><CheckCircleIcon color='success' /></td>
                            :
                            <td className="text-warning"><b>Not reply</b></td>
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
                <div className="d-flex flex-column align-items-center pt-4">
                    <h3 className="profile-header" style={{ color: '#0d6efd' }}><b>Feedback to us</b></h3>

                </div>
                {loading ? (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading...</p>
                    </div>
                )
                    :
                    <>
                        <TabContext value={value}>
                            <Box sx={{
                                borderBottom: 1,
                                borderColor: 'divider'
                            }}>
                                <TabList onChange={handleChange} centered>
                                    <Tab label="All" value="1" />
                                    <Tab label="My feedback" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {/* LIST TODAY */}
                                <div style={{ borderRadius: '20px', border: '1px solid #ccc', margin: '10px' }}>
                                    <ListItem>
                                        <ListItemText primary="Today" style={{ color: '#0d6efd' }} />
                                    </ListItem>
                                    <List sx={{ mb: 2 }} >
                                        <div className="mt-4 pd-left">
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
                                        <div className="mt-4 pd-left">
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

                            </TabPanel>


                            <TabPanel value="2">
                                {/* LIST TODAY */}
                                <div style={{ borderRadius: '20px', border: '1px solid #ccc', margin: '10px' }}>
                                    <ListItem>
                                        <ListItemText primary="Today" style={{ color: '#0d6efd' }} />
                                    </ListItem>
                                    <List sx={{ mb: 2 }} >
                                        <div className="mt-4 pd-left">
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
                                        <div className="mt-4 pd-left">
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

                                    </List>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Button variant={'contained'} onClick={openModal}>Send Feedback</Button>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </>
                }
            </React.Fragment>
        </>
    );
}